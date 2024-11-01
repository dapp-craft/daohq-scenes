import { config } from '../../../debugConfig'
import { createQuestMarkEntity, initialQuestData, initialSounds, setSystemDialog } from './questHandler'
import { coinsSpawn } from './coins'
import { setupRewards, setUserData, updateRewardModel } from './backendHandler'
import { createQuestNpc } from './npc'
import { resetCoins } from './backend'
import { getUserData } from '~system/UserIdentity'

export async function questSystem() {
  if (!config.quests) return
  console.log('Quest system: Loading...')
  createQuestNpc()
  setSystemDialog(0)
  await initialQuestData()
  initialSounds()
  await createQuestMarkEntity()
  const userWeb3Data = await getUserData({})
  if (!userWeb3Data.data?.publicKey || userWeb3Data.data?.publicKey == null) {
    setSystemDialog(14)
    updateRewardModel()
    return console.log('Quest system: LOADED FOR GUEST')
  }
  await resetCoins()
  await setUserData()
  await setupRewards()
  await coinsSpawn()
  console.log('Quest system: LOADED')
}
