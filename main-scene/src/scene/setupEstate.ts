import { IExtraLocatorData, IResource } from 'daohq-shared/types'
import { NFTSeverClient } from 'daohq-shared/marketplaceClient'
import { NFTSortBy } from '@dcl/schemas'
import { EstateBoard } from 'daohq-shared/Components/EstateBoard'
import { TransformType } from '@dcl/sdk/ecs'

let nftSeverClient: NFTSeverClient

const DATA: any[] = [
  {
    nft: {
      id: '0x959e104e1a4db6317fa58f8295f586e1a978c297-5717',
      tokenId: '5717',
      contractAddress: '0x959e104e1a4db6317fa58f8295f586e1a978c297',
      activeOrderId: '0x0a42157e40860ef377b8fa3dd240449efed64b013d808ef4a7f81b264f00b1bc',
      openRentalId: null,
      owner: '0xfa9aa3005f132ce8f91b3e1f84c01d84c375ce01',
      name: 'Pepe Dragon 🐉',
      image: 'https://api.decentraland.org/v1/estates/5717/map.png',
      url: '/contracts/0x959e104e1a4db6317fa58f8295f586e1a978c297/tokens/5717',
      data: {
        estate: {
          description: null,
          size: 60,
          parcels: [
            {
              x: 74,
              y: -127
            },
            {
              x: 74,
              y: -126
            },
            {
              x: 74,
              y: -125
            },
            {
              x: 74,
              y: -124
            },
            {
              x: 74,
              y: -123
            },
            {
              x: 75,
              y: -127
            },
            {
              x: 75,
              y: -126
            },
            {
              x: 75,
              y: -125
            },
            {
              x: 75,
              y: -124
            },
            {
              x: 75,
              y: -123
            },
            {
              x: 76,
              y: -127
            },
            {
              x: 76,
              y: -126
            },
            {
              x: 76,
              y: -125
            },
            {
              x: 76,
              y: -124
            },
            {
              x: 76,
              y: -123
            },
            {
              x: 77,
              y: -127
            },
            {
              x: 77,
              y: -126
            },
            {
              x: 77,
              y: -125
            },
            {
              x: 77,
              y: -124
            },
            {
              x: 77,
              y: -123
            },
            {
              x: 78,
              y: -127
            },
            {
              x: 78,
              y: -126
            },
            {
              x: 78,
              y: -125
            },
            {
              x: 78,
              y: -124
            },
            {
              x: 78,
              y: -123
            },
            {
              x: 79,
              y: -127
            },
            {
              x: 79,
              y: -126
            },
            {
              x: 79,
              y: -125
            },
            {
              x: 79,
              y: -124
            },
            {
              x: 79,
              y: -123
            },
            {
              x: 80,
              y: -127
            },
            {
              x: 80,
              y: -126
            },
            {
              x: 80,
              y: -125
            },
            {
              x: 80,
              y: -124
            },
            {
              x: 80,
              y: -123
            },
            {
              x: 81,
              y: -127
            },
            {
              x: 81,
              y: -126
            },
            {
              x: 81,
              y: -125
            },
            {
              x: 81,
              y: -124
            },
            {
              x: 81,
              y: -123
            },
            {
              x: 82,
              y: -127
            },
            {
              x: 82,
              y: -126
            },
            {
              x: 82,
              y: -125
            },
            {
              x: 82,
              y: -124
            },
            {
              x: 82,
              y: -123
            },
            {
              x: 83,
              y: -127
            },
            {
              x: 83,
              y: -126
            },
            {
              x: 83,
              y: -125
            },
            {
              x: 83,
              y: -124
            },
            {
              x: 83,
              y: -123
            },
            {
              x: 84,
              y: -127
            },
            {
              x: 84,
              y: -126
            },
            {
              x: 84,
              y: -125
            },
            {
              x: 84,
              y: -124
            },
            {
              x: 84,
              y: -123
            },
            {
              x: 85,
              y: -127
            },
            {
              x: 85,
              y: -126
            },
            {
              x: 85,
              y: -125
            },
            {
              x: 85,
              y: -124
            },
            {
              x: 85,
              y: -123
            }
          ]
        }
      },
      issuedId: null,
      itemId: null,
      category: 'estate',
      network: 'ETHEREUM',
      chainId: 1,
      createdAt: 1719897623000,
      updatedAt: 1719909551000,
      soldAt: 0
    },
    order: {
      id: '0x0a42157e40860ef377b8fa3dd240449efed64b013d808ef4a7f81b264f00b1bc',
      marketplaceAddress: '0x8e5660b4ab70168b5a6feea0e0315cb49c8cd539',
      contractAddress: '0x959e104e1a4db6317fa58f8295f586e1a978c297',
      tokenId: '5717',
      owner: '0xfa9aa3005f132ce8f91b3e1f84c01d84c375ce01',
      buyer: null,
      price: '1888000000000000000000000',
      status: 'open',
      network: 'ETHEREUM',
      chainId: 1,
      expiresAt: 1785517200,
      createdAt: 1719909551000,
      updatedAt: 1719909551000,
      issuedId: ''
    },
    rental: null
  }
]

export async function setupEstateBoards(configs: IExtraLocatorData[]) {
  setupNFTClient()
  let maxSlot = 0

  configs.forEach((config) => {
    return (maxSlot = Math.max(maxSlot, config.extras!.index as number))
  })

  const estates = await nftSeverClient.fetchNFTs({
    first: maxSlot + 1,
    sortBy: NFTSortBy.NEWEST,
    isLand: true,
    isOnSale: true
  })

  configs.forEach((config) => {
    // console.log("ESTATE", config.transform as TransformType, estates[config.extras!.slot as number])
    new EstateBoard(
      'models/obj_estates.gltf',
      config.transform as TransformType,
      estates[config.extras!.index as number]
    )
  })
}

function setupNFTClient() {
  nftSeverClient = new NFTSeverClient()
}
