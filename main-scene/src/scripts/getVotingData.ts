import { useFetch } from 'daohq-shared/scripts/useFetch'
import { getPlayer } from '@dcl/sdk/src/players'
import { IProposal, isVisible, proposalFilterParams, shortListFilterParams } from '../states/states'
import { votingData } from '../states/states'

interface IQueryParams {
  type: string
  subtype?: string
  status: string
  timeFrame: string
  limit: string
  offset: string
}

const getShortListQueryString = (): string => {
  const { limit, status, offset } = shortListFilterParams
  return `?limit=${limit}&offset=${offset}&status=${status}`
}

const getProposalsPageQueryString = (): string => {
  const {
    limit: filterLimit,
    status: filterStatus,
    type: filterType,
    offset: filterOffset,
    timeFrame: filterTimeFrame
  } = proposalFilterParams

  const queryParams: IQueryParams = {
    limit: `?limit=${filterLimit}`,
    offset: `&offset=${filterOffset}`,
    type: `&type=${filterType}`,
    subtype: undefined,
    status: `&status=${filterStatus}`,
    timeFrame: `&timeFrame=${filterTimeFrame}`
  }

  if (
    filterType === 'Accelerator' ||
    filterType === 'Core+Unit' ||
    filterType === 'Documentation' ||
    filterType === 'In-World+Content' ||
    filterType === 'Platform' ||
    filterType === 'Social+Media+Content' ||
    filterType === 'Sponsorship' ||
    filterType === 'legacy'
  ) {
    queryParams.subtype = `&subtype=${filterType}`
    queryParams.type = `&type=grant`
  }

  const { limit, offset, type, status, timeFrame, subtype } = queryParams

  let queryString: string = `${limit}${offset}`
  if (filterType) queryString = queryString.concat(type)
  if (subtype) queryString = queryString.concat(subtype)
  if (filterStatus) queryString = queryString.concat(status)
  if (filterTimeFrame) queryString = queryString.concat(timeFrame)
  return queryString
}

export const getVotingData = async (votingType: 'board' | 'shortList'): Promise<void> => {
  if (votingType === 'board' && votingData.isBoardPageLoaded) {
    votingData.isBoardPageLoaded = false
    votingData.proposals = null
  } else if (votingType === 'board' && !votingData.isBoardPageLoaded) {
    isVisible.paginationMsgInBoard = true
    return
  }

  const queryString =
    votingType === 'board' ? getProposalsPageQueryString() : votingType === 'shortList' ? getShortListQueryString() : ''

  const proposals = await useFetch({
    url: `https://governance.decentraland.org/api/proposals${queryString}`,
    method: 'GET'
  })
  let tempProposalsShortList: IProposal[] = []
  if (proposals.resultReq && typeof proposals.resultReq === 'object' && 'data' in proposals.resultReq) {
    if (Array.isArray(proposals.resultReq.data)) {
      if (votingType === 'board') {
        votingData.proposals = proposals.resultReq.data
      } else if (votingType === 'shortList') {
        tempProposalsShortList = proposals.resultReq.data
      }
    }
    if ('total' in proposals.resultReq && typeof proposals.resultReq.total === 'number') {
      if (votingType === 'board') {
        votingData.totalProposals = proposals.resultReq.total
      } else if (votingType === 'shortList') {
        votingData.totalShortListProposals = proposals.resultReq.total
      }
    }
  } else {
    const errorMessage = "Can't get proposals to voting or proposals are in wrong format."
    console.log(errorMessage)
    throw new Error(errorMessage)
  }

  if (votingType === 'shortList' && !tempProposalsShortList.length) votingData.proposalsShortList = []
  if (votingType === 'board' && !votingData.proposals) votingData.proposals = []

  if (votingType === 'board') {
    if (votingData.proposals && votingData.proposals.length) {
      await addToProposalComplimentaryInfo(votingData.proposals, votingType)
      votingData.isBoardPageLoaded = true
    } else {
      votingData.isBoardPageLoaded = true
    }
  }
  if (votingType === 'shortList' && tempProposalsShortList.length) {
    const filteredProposals = await addToProposalComplimentaryInfo(tempProposalsShortList, votingType)
    votingData.proposalsShortList = filteredProposals
  }
}

const addToProposalComplimentaryInfo = async (
  proposalsArr: IProposal[],
  votingType: 'board' | 'shortList'
): Promise<IProposal[]> => {
  let userAddress = getPlayer()?.userId
  const proposalsPromises = proposalsArr.map(async (propItem) => {
    const userProfile = await useFetch({
      url: `https://peer.decentraland.org/lambdas/profile/${propItem.user}`,
      method: 'GET'
    })
    if (userProfile.resultReq && typeof userProfile.resultReq === 'object' && 'avatars' in userProfile.resultReq) {
      if (Array.isArray(userProfile.resultReq.avatars)) {
        if (userProfile.resultReq.avatars.length) {
          propItem.userData = userProfile.resultReq.avatars[0]
        } else {
          propItem.userData = null
        }
      }
    } else {
      const errorMessage = "Can't get username for proposals or userProfile data are in wrong format."
      console.log(errorMessage)
      throw new Error(errorMessage)
    }
    const votes = await useFetch({
      url: `https://governance.decentraland.org/api/proposals/${propItem.id}/votes`,
      method: 'GET'
    })
    if (
      votes.resultReq &&
      typeof votes.resultReq === 'object' &&
      'data' in votes.resultReq &&
      typeof votes.resultReq.data === 'object'
    ) {
      propItem.votes = votes.resultReq.data
    } else {
      const errorMessage = "Can't get votes for proposals or votes data are in wrong format."
      console.log(errorMessage)
      throw new Error(errorMessage)
    }

    const comments = await useFetch({
      url: `https://governance.decentraland.org/api/proposals/${propItem.id}/comments`,
      method: 'GET'
    })
    if (
      comments.resultReq &&
      typeof comments.resultReq === 'object' &&
      'data' in comments.resultReq &&
      comments.resultReq.data &&
      typeof comments.resultReq.data === 'object' &&
      'totalComments' in comments.resultReq.data
    ) {
      propItem.comments = comments.resultReq.data as {
        comments: object[]
        totalComments: number
      }
    } else {
      const errorMessage = "Can't get comments for proposals or comments data are in wrong format."
      console.log(errorMessage)
      throw new Error(errorMessage)
    }
  })
  await Promise.all(proposalsPromises)
  if (userAddress && votingType === 'shortList') {
    proposalsArr.forEach((proposalItem) => {
      for (let key in proposalItem.votes) {
        if (key === userAddress) {
          const index = proposalsArr.indexOf(proposalItem)
          proposalsArr.splice(index, 1)
          if (votingData.totalShortListProposals) votingData.totalShortListProposals -= 1
        }
      }
    })
  }
  return proposalsArr
}

export const votingDataInit = async () => {
  await getVotingData('shortList')
  await getVotingData('board')
}
