import { createEthereumProvider } from '@dcl/sdk/ethereum-provider'
import { useFetch } from 'daohq-shared/scripts/useFetch'
import { votingData } from '../states/states'
import { getPlayer } from '@dcl/sdk/src/players'
import { keccak256 } from 'js-sha3'
import { toggleVotingResultModal } from '../ui/modules/votingMenu'
import { getVotingData } from './getVotingData'

interface IDataType {
  name: string
  type: string
}

interface IDomain {
  name: string
  version: string
}

interface IDataToSign {
  from: string | null
  space: string | undefined
  timestamp: number
  proposal: string | undefined
  choice: number | null
  reason: string
  app: string | undefined
  metadata: string
}

interface IEip712TypedData {
  types: {
    EIP712Domain: IDataType[]
    Vote: IDataType[]
  }
  domain: IDomain
  primaryType: 'Vote'
  message: IDataToSign
}

const getUserAddress = (): string | null => {
  let userData = getPlayer()
  const FROM_HEXADECIMAL = 16

  const isCharacter = (c: string) => {
    const charCode = c.charCodeAt(0)
    return charCode >= 97 && charCode < 123
  }

  function checkSumEthereumAddress(address: string) {
    const is0x: boolean = address.startsWith('0x')
    address = address.toLowerCase()

    if (is0x) address = address.slice(2)

    const addressHash = keccak256(address)
    const addressChars = address.split('')
    for (let i = 0; i < addressChars.length; i++) {
      const addressChar = addressChars[i]

      if (!isCharacter(addressChar)) continue

      const hashChar = addressHash.charAt(i)
      const hashCharToNumber = parseInt(hashChar, FROM_HEXADECIMAL)
      const isHashCharValueGte8: boolean = hashCharToNumber >= 8
      if (isHashCharValueGte8) addressChars[i] = addressChar.toUpperCase()
    }
    const convertedData = addressChars.join('')
    return is0x ? `0x${convertedData}` : convertedData
  }
  if (userData) {
    return checkSumEthereumAddress(userData.userId)
  } else {
    return null
  }
}

export const sendVote = async (): Promise<void> => {
  const userAddress = getUserAddress()
  const dataType: IDataType[] = [
    { name: 'from', type: 'address' },
    { name: 'space', type: 'string' },
    { name: 'timestamp', type: 'uint64' },
    { name: 'proposal', type: 'bytes32' },
    { name: 'choice', type: 'uint32' },
    { name: 'reason', type: 'string' },
    { name: 'app', type: 'string' },
    { name: 'metadata', type: 'string' }
  ]

  const dataToSign: IDataToSign = {
    from: userAddress,
    space: votingData.selectedProposal?.snapshot_space,
    timestamp: Math.floor(Date.now() / 1000),
    proposal: votingData.selectedProposal?.snapshot_id,
    choice: votingData.voteValue,
    reason: '',
    app: votingData.selectedProposal?.snapshot_proposal.app,
    metadata: '{"survey":[]}'
  }

  const domainData: IDomain = {
    name: 'snapshot',
    version: '0.1.4'
  }

  const provider = createEthereumProvider()

  let eip712TypedData: IEip712TypedData = {
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' }
      ],
      ['Vote']: dataType
    },
    domain: domainData,
    primaryType: 'Vote',
    message: dataToSign
  }

  provider.sendAsync(
    {
      method: 'eth_signTypedData_v4',
      params: [userAddress, JSON.stringify(eip712TypedData)],
      jsonrpc: '2.0',
      id: 999999999
    },
    async (err, res) => {
      if (res && typeof res === 'object' && 'result' in res) {
        const headers = {
          'Content-Type': 'application/json'
        }
        const payload = {
          address: userAddress,
          data: {
            domain: domainData,
            types: {
              Vote: dataType
            },
            message: dataToSign
          },
          sig: res.result
        }
        const sendedVote = await useFetch({
          url: 'https://seq.snapshot.org/',
          method: 'POST',
          body: JSON.stringify(payload),
          headers
        })
        console.log('sendedVote :>> ', sendedVote)
        toggleVotingResultModal({ isSuccess: true })
        getVotingData('shortList')
      }
      if (err) {
        toggleVotingResultModal({ isSuccess: false })
        console.log('Voting error!', err)
      }
    }
  )
}
