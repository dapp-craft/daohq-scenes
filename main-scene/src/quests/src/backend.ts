import { signedFetch } from '~system/SignedFetch'
import { BASE_QUEST_URL } from '../../../deployConfig'
import { backEndConfig } from './questConfig'

interface QuestResp {
  success: boolean
  data: any
  status?: any
}

const fetchRequest = async (url: string, method: 'PATCH' | 'POST' | 'DELETE' | 'GET' | 'PUT') => {
  if (!backEndConfig.active) return { success: false, data: 'Backend is off' }
  try {
    const response = await signedFetch({
      url,
      init: {
        method,
        headers: {}
      }
    })
    const responseBody = JSON.parse(response.body)
    // console.log(responseBody)
    if (response.status == 200) return { success: true, data: responseBody, status: response.status }
    else return { success: false, data: responseBody, status: response.status }
  } catch (error) {
    return { success: false, data: error }
  }
}

export const getLastQuest = async (): Promise<QuestResp> => {
  if (!backEndConfig.active) return { success: false, data: 'Backend is off' }
  return await fetchRequest(`${BASE_QUEST_URL}/user/status`, 'GET')
}

export const postCompleteQuest = async (questId: any): Promise<QuestResp> => {
  if (!backEndConfig.active) return { success: false, data: 'Backend is off' }
  return await fetchRequest(`${BASE_QUEST_URL}/complete?quest_id=${questId}`, 'POST')
}

export const postCompleteDailyQuest = async (): Promise<QuestResp> => {
  if (!backEndConfig.active) return { success: false, data: 'Backend is off' }
  return await fetchRequest(`${BASE_QUEST_URL}/complete/daily`, 'POST')
}

export const deleteQuestProgress = async (): Promise<QuestResp> => {
  if (!backEndConfig.active) return { success: false, data: 'Backend is off' }
  return await fetchRequest(`${BASE_QUEST_URL}/progress`, 'DELETE')
}

export const deleteDailyQuestProgress = async (): Promise<QuestResp> => {
  if (!backEndConfig.active) return { success: false, data: 'Backend is off' }
  return await fetchRequest(`${BASE_QUEST_URL}/progress/daily`, 'DELETE')
}

export const pickUpCoin = async (coinId: number) => {
  if (!backEndConfig.active) return { success: false, data: 'Backend is off' }
  return await fetchRequest(`${BASE_QUEST_URL}/pickup/coin/${coinId}`, 'POST')
}

export const getUserProgress = async () => {
  if (!backEndConfig.active) return { success: false, data: 'Backend is off' }
  return await fetchRequest(`${BASE_QUEST_URL}/points`, 'GET')
}

export const deleteCoinsProgress = async () => {
  if (!backEndConfig.active) return { success: false, data: 'Backend is off' }
  return await fetchRequest(`${BASE_QUEST_URL}/progress/coins`, 'DELETE')
}

export const getReset = async () => {
  if (!backEndConfig.active) return { success: false, data: 'Backend is off' }
  return await fetchRequest(`${BASE_QUEST_URL}/until-midnight`, 'GET')
}

export const pickUpReward = async (rewardId: number): Promise<QuestResp> => {
  if (!backEndConfig.active) return { success: false, data: 'Backend is off' }
  return await fetchRequest(`${BASE_QUEST_URL}/pickup/reward/${rewardId}`, 'POST')
}

export const getRewards = async (): Promise<QuestResp> => {
  if (!backEndConfig.active) return { success: false, data: 'Backend is off' }
  return await fetchRequest(`${BASE_QUEST_URL}/rewards`, 'GET')
}

export const deleteRewards = async (): Promise<QuestResp> => {
  if (!backEndConfig.active) return { success: false, data: 'Backend is off' }
  return await fetchRequest(`${BASE_QUEST_URL}/rewards`, 'DELETE')
}

export const resetCoins = async (): Promise<QuestResp> => {
  if (!backEndConfig.active) return { success: false, data: 'Backend is off' }
  return await fetchRequest(`${BASE_QUEST_URL}/update/coins`, 'PUT')
}
