import * as utils from '@dcl-sdk/utils'
import * as npc from 'dcl-npc-toolkit'
import {
  ColliderLayer,
  engine,
  Entity,
  GltfContainer,
  InputAction,
  pointerEventsSystem,
  Transform,
  VisibilityComponent
} from '@dcl/sdk/ecs'
import {
  getLastQuest,
  getReset,
  getRewards,
  getUserProgress,
  postCompleteDailyQuest,
  postCompleteQuest
} from './backend'
import {
  dailyQuestDialogMap,
  questNamePointer,
  questDayList,
  rewardList,
  NPC_MODEL,
  entityList,
  soundsPath
} from './questConfig'
import {
  setSystemDialog,
  getRandomDailyQuests,
  setQuestPointer,
  triggerQuestItemAnimation,
  registrateItemAnimation,
  questMark,
  setDayliPointer,
  createEntity,
  attachSound,
  readQuestLocator,
  getRandomNumber
} from './questHandler'
import {
  dialogState,
  questDayMap,
  coinState,
  selectedEntityState,
  backEndState,
  questReward,
  questModels
} from './questState'
import { allSavedEntity, SOUND_MANAGER } from '../../states/states'
import { myNPC } from './npc'
import { Vector3 } from '@dcl/sdk/math'
import { systemDialog } from './systemDialog'
import { getUserData } from '~system/UserIdentity'

const reconnectTimeout = 10000

export const setUserData = async () => {
  backEndState.userData = await getLastQuest()
  console.log('\nQuest backend RESPONSE\n', backEndState.userData)
  if (!backEndState.userData.success) {
    console.error('No data from backend')
    questMark()
    setSystemDialog(3)
    return utils.timers.setTimeout(async () => {
      await setUserData()
      return
    }, reconnectTimeout)
  }
  coinState.availableCoins = backEndState.userData.data.today_coins
  await updateXPCounter()
  await restoreUserEntityState()
  return
}

export const restoreUserEntityState = async () => {
  const response = backEndState.userData
  restoreEntityState(backEndState.userData.data.last_quest)
  if (!backEndState.userData.success) return
  dialogState.questUiHudVisible = true
  dialogState.uiText = { text: 'Talk to Cosmo' }
  if (response.data.last_quest == null) {
    dialogState.dialog = questDayMap.get(1)
    dialogState.pointer = 0
    return
  }
  if (response.data.day == 0) {
    dialogState.dialog = questDayMap.get(response.data.day)
    getRandomDailyQuests()
    const daily = dialogState.todaysDaily[response.data.today_daily_quests!]
    console.log('daily counter:', daily)
    if (!daily) {
      questMark()
      return setSystemDialog(1)
    }
    await setEntityDailyState(daily)
    return setQuestPointer(dailyQuestDialogMap.get(daily))
  }
  let actualQuest: any
  const questArray = Array.from(questNamePointer, ([name, obj]) => ({ name, ...obj }))
  questArray.forEach((quest, key) => {
    if (quest.name == response.data.last_quest!.quest) return (actualQuest = questArray[key + 1])
  })
  if (!actualQuest || actualQuest.day != response.data.day) {
    questMark()
    setSystemDialog(2)
    return
  }
  dialogState.dialog = questDayMap.get(response.data.day!)
  setQuestPointer(questDayList.get(response.data.day!)!.get(actualQuest.pointer))
  resetFromBackend()
}

export const awaitSavingQuest = async (
  dialog: Array<any>,
  correctPointer: any,
  systemPointer: any,
  questName: string,
  daily: boolean = false,
  clickAftersave: boolean = true
) => {
  setSystemDialog(systemPointer)
  const save = async () => {
    const response = daily ? await postCompleteDailyQuest() : await postCompleteQuest(questName)
    if (response.success) {
      console.log('Quest is saved')
      await updateXPCounter()
      SOUND_MANAGER.playSound('compliteQuest')
      if (daily) return setDayliPointer()
      dialogState.dialog = dialog
      dialogState.pointer = correctPointer
      return
    } else {
      console.error(`Quest is NOT saved ${response.status}!`)
      response.status != 400 &&
        utils.timers.setTimeout(async () => {
          return await save()
        }, reconnectTimeout)
    }
  }
  console.log('Saving quest...')
  await save()
  if (clickAftersave) GltfContainer.getMutable(myNPC).src = NPC_MODEL
}

export const resetFromBackend = async () => {
  let response = await getReset()
  if (!response.success) return
  if (response.data == 0)
    return utils.timers.setTimeout(async () => {
      return await setUserData()
    }, 1000)
  let data = response.data * 1000
  console.log('left: ', data, 'ms')
  utils.timers.setTimeout(async () => {
    return await resetFromBackend()
  }, data)
}

export const updateXPCounter = async () => {
  const response = await getUserProgress()
  if (!response.success) return
  typeof response.data == 'number' ? (coinState.uiCouter = response.data) : (coinState.uiCouter = 0)
}

const restoreEntityState = (quest: any) => {
  selectedEntityState.lanterns.forEach((entity) => {
    registrateItemAnimation(entity, ['stand', 'idle1'], true)
    triggerQuestItemAnimation(entity, 'idle1', true)
  })

  selectedEntityState.fish.forEach((entity) => {
    registrateItemAnimation(entity, ['stand', 'idle1', 'idle2'], true)
    triggerQuestItemAnimation(entity, 'stand', true)
  })

  selectedEntityState.fireflies.forEach((entity) => {
    registrateItemAnimation(entity, ['stand', 'idle1'], true)
    triggerQuestItemAnimation(entity, 'stand', true)
  })

  registrateItemAnimation(selectedEntityState.android[0], ['idle1', 'stand', 'talk'], true)
  triggerQuestItemAnimation(selectedEntityState.android[0], 'idle1')

  let number = quest != null ? questNamePointer.get(quest.quest)?.order || 0 : 0
  if (number >= 2) {
    selectedEntityState.questEntityTrees.forEach(
      (entity) => (Transform.getMutable(entity).scale = Vector3.create(0.86, 0.8622, 0.86))
    )
    selectedEntityState.seeds.forEach((entity) => engine.removeEntity(entity))
  }
  if (number >= 3) {
    dialogState.teleportActive = true
    dialogState.isItFirstTeleport = false
    selectedEntityState.teleport.forEach(
      (entity) => (GltfContainer.getMutable(entity).src = questModels.get('workingTeleport'))
    )
    dialogState.isTeleportFromStory = false
  } else dialogState.isItFirstTeleport = true
  if (number >= 4) {
    triggerQuestItemAnimation(selectedEntityState.android[0], 'stand')
    selectedEntityState.crystals.forEach((entity) => engine.removeEntity(entity))
  }
  if (number >= 5) {
    selectedEntityState.lanterns.forEach((entity) =>
      utils.timers.setTimeout(() => {
        triggerQuestItemAnimation(entity, 'stand', true)
      }, Math.random() * 5000)
    )
    selectedEntityState.match.forEach((e) => engine.removeEntity(e))
  }
}

export const setEntityDailyState = async (quest: number) => {
  if (quest == 1) {
    entityList.treeList.forEach((name) => {
      const entity = allSavedEntity.get(name)
      if (!entity) return
      const dotIndex = name.indexOf('.')
      if (Number(dotIndex - 1) == 1) GltfContainer.getMutable(entity).src = questModels.get('dryBigTree')
      else GltfContainer.getMutable(entity).src = questModels.get('drySmallTree')
    })
    selectedEntityState.questEntityTrees.forEach((entity) => {
      pointerEventsSystem.onPointerDown(
        {
          entity,
          opts: {
            button: InputAction.IA_POINTER,
            hoverText: 'Click'
          }
        },
        () => {
          npc.openDialogWindow(myNPC, systemDialog, 11)
        }
      )
    })
  }
  if (quest == 2) {
    selectedEntityState.fish.forEach((entity) => {
      triggerQuestItemAnimation(entity, 'idle1', true)
    })
  }
  if (quest == 3) {
    if (selectedEntityState.spiders.length != 0) return
    const spiders = await readQuestLocator('locators/npc_spider_locators.gltf')
    selectedEntityState.spiders = await createEntity(spiders, 'npc_spider', false)
    attachSound(selectedEntityState.spiders, soundsPath.soundSpider, 0.01)
    selectedEntityState.spidersObj.map((ent: any) => (Transform.getMutable(ent).scale = Vector3.create(0, 0, 0)))
  }
  if (quest == 4) {
    dialogState.questRanadom = getRandomNumber(3)
    selectedEntityState.stickers.forEach((array, key) => {
      if (dialogState.questRanadom != key) return
      array.forEach((entity: Entity) => (VisibilityComponent.getMutable(entity).visible = true))
    })
  }
  if (quest == 6) {
    selectedEntityState.fireflies.forEach((entity) => {
      GltfContainer.getMutable(entity).src = questModels.get('brokenFirefly')
      triggerQuestItemAnimation(entity, 'idle1', true)
    })
  }
  if (quest == 7) {
    dialogState.questRanadom = getRandomNumber(4)
    selectedEntityState.graffiti.forEach((array, key) => {
      if (dialogState.questRanadom != key) return
      array.forEach((entity: Entity) => (VisibilityComponent.getMutable(entity).visible = true))
    })
  }
  if (quest == 8) {
    dialogState.teleportActive = false
    dialogState.isTeleportFromStory = false
    dialogState.isItFirstTeleport = false
    selectedEntityState.teleport.forEach(
      (entity) => (GltfContainer.getMutable(entity).src = questModels.get('disableTeleportModel'))
    )
  }
  if (quest == 9) {
    selectedEntityState.lavaLamp.forEach(
      (entity) => (GltfContainer.getMutable(entity).src = questModels.get('brokenLamp'))
    )
  }
}

export const updateRewardModel = async (update = false) => {
  if (update) {
    const response = await getRewards()
    questReward.userRewards = response.data
  }
  rewardList.forEach((data, key) => {
    const entity = allSavedEntity.get(data.modelName)
    if (questReward.userRewards.length == 0) questReward.userRewards = [0]
    else if (questReward.userRewards[questReward.userRewards.length - 1] >= rewardList.size - 1) {
      questReward.userRewards = [rewardList.size - 1]
    }
    if (key != questReward.userRewards[questReward.userRewards.length - 1] + 1) {
      GltfContainer.getMutable(entity!).invisibleMeshesCollisionMask = ColliderLayer.CL_NONE
      if (!VisibilityComponent.has(entity!)) VisibilityComponent.create(entity!, { visible: false })
      else {
        VisibilityComponent.getMutable(entity!).visible = false
      }
    } else {
      GltfContainer.getMutable(entity!).invisibleMeshesCollisionMask = ColliderLayer.CL_PHYSICS
      GltfContainer.getMutable(entity!).invisibleMeshesCollisionMask = ColliderLayer.CL_POINTER
      if (VisibilityComponent.has(entity!)) VisibilityComponent.getMutable(entity!).visible = true
    }
  })
}

export const setupRewards = async () => {
  const response = await getRewards()
  questReward.userRewards = response.data
  await updateRewardModel()
  rewardList.forEach(async (data, key) => {
    const entity = allSavedEntity.get(data.modelName)
    if (!entity || !response.success) return
    pointerEventsSystem.onPointerDown(
      {
        entity: entity,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'CLAIM'
        }
      },
      () => {
        claimWindowRadius(entity)
        questReward.rewardReady = false
        questReward.rewardUi = !questReward.rewardUi
        questReward.rewardNumber = key
        questReward.claimUIStatus = false
        if (coinState.uiCouter >= data.price && !questReward.userRewards.find((reward: number) => reward == key))
          questReward.rewardReady = true
      }
    )
  })
}

export const claimWindowRadius = (entity: Entity) => {
  engine.removeSystem('claimRadius')
  engine.addSystem(
    () => {
      if (Vector3.distance(Transform.get(engine.PlayerEntity).position, Transform.get(entity).position) >= 15) {
        if (!questReward.rewardPending) questReward.rewardUi = false
        engine.removeSystem('claimRadius')
        return
      }
    },
    1,
    'claimRadius'
  )
}
