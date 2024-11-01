import * as npc from 'dcl-npc-toolkit'
import {
  Animator,
  AudioSource,
  ColliderLayer,
  Entity,
  GltfContainer,
  MeshCollider,
  Transform,
  VisibilityComponent,
  engine
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { dialogState, entityState, questEntitySaveState, questModels, selectedEntityState } from './questState'
import { formatSeparator, getTransfFromLocNode, readGltfLocators } from 'daohq-shared/scripts'
import { allSavedEntity } from '../../states/states'
import { dailyQuestDialogMap, entityList, NPC_DIALOG_RADIUS, NPC_MODEL, questPerDay, soundsPath } from './questConfig'
import { SoundManager } from 'daohq-shared/Components/SoundManager'
import { animationController, myNPC } from './npc'
import { getPlayer } from '@dcl/sdk/src/players'
import { systemDialog } from './systemDialog'

export let questInputVisible = false
let questMarkEntity: Entity
let questionMark: any
let exclamationMark: any
let parented = false
let takenItems: Entity

export const initialQuestData = async () => {
  selectedEntityState.spidersObj = filterEntityByName('obj_spider')
  selectedEntityState.teleport = filterEntityByName('obj_teleport01')
  selectedEntityState.lavaLamp = filterEntityByName('obj_lamp01', 1)
  selectedEntityState.platform = filterEntityByName('obj_platform', 3)
  selectedEntityState.android = filterEntityByName('npc_android')
  selectedEntityState.lanterns = filterEntityByName('obj_lantern')
  selectedEntityState.fish = filterEntityByName('npc_fish')
  selectedEntityState.fishMap = filterEntityAndNameByName('npc_fish')
  selectedEntityState.match = filterEntityByName('obj_torch')
  selectedEntityState.feed = filterEntityByName('obj_feed')
  selectedEntityState.fireflies = filterEntityByName('npc_firefly01')
  selectedEntityState.vacuum = filterEntityByName('obj_vacuum')
  selectedEntityState.spray = filterEntityByName('obj_spray')

  selectedEntityState.rwave = filterEntityByName('obj_rwave')

  selectedEntityState.jug = entityList.jugList.map((name) => allSavedEntity.get(name))
  selectedEntityState.water = entityList.waterList.map((name) => allSavedEntity.get(name))

  console.log(`
        Quest items loaded:
        ---------------------
        SpidersObj: ${selectedEntityState.spidersObj.length}
        Teleport:   ${selectedEntityState.teleport.length}
        Lava Lamp:  ${selectedEntityState.lavaLamp.length}
        Platform:   ${selectedEntityState.platform.length}
        Android:    ${selectedEntityState.android.length}
        Lanterns:   ${selectedEntityState.lanterns.length}
        Fish:       ${selectedEntityState.fish.length}
        Fish Map:   ${selectedEntityState.fishMap.size}
        Match:      ${selectedEntityState.match.length}
        Feed:       ${selectedEntityState.feed.length}
        Fireflies:  ${selectedEntityState.fireflies.length}
        vacuum:     ${selectedEntityState.vacuum.length}
        spray:      ${selectedEntityState.spray.length}
        rwave:      ${selectedEntityState.rwave.length}
        ---------------------
        `)

  questModels.set('workingTeleport', await formatSeparator('obj_teleport01'))
  questModels.set('brokenlTeleportModel', await formatSeparator('obj_teleport02'))
  questModels.set('disableTeleportModel', await formatSeparator('obj_teleport03'))
  questModels.set('bigTree', await formatSeparator('obj_pine01'))
  questModels.set('smallTree', await formatSeparator('obj_pine02'))
  questModels.set('dryBigTree', await formatSeparator('obj_pine03'))
  questModels.set('drySmallTree', await formatSeparator('obj_pine04'))
  questModels.set('normalLamp', await formatSeparator('obj_lamp01'))
  questModels.set('brokenLamp', await formatSeparator('obj_lamp03'))
  questModels.set('normalFirefly', await formatSeparator('npc_firefly01'))
  questModels.set('brokenFirefly', await formatSeparator('npc_firefly02'))

  dialogState.teleportActive = false
  selectedEntityState.teleport.forEach(
    (entity) => (GltfContainer.getMutable(entity).src = questModels.get('brokenlTeleportModel'))
  )

  selectedEntityState.questEntityTrees = entityList.treeList.map((name) => allSavedEntity.get(name))
  selectedEntityState.treeData = selectedEntityState.questEntityTrees.map((e: any) => Transform.get(e))
  selectedEntityState.questEntityTrees.map((ent: any) => (Transform.getMutable(ent).scale = Vector3.create(0, 0, 0)))

  const seeds = await readQuestLocator('locators/obj_area01_seeds.gltf')
  selectedEntityState.seeds = await createEntity(seeds, 'obj_seeds', false)

  const crystals = await readQuestLocator('locators/obj_area03_crystals.gltf')
  selectedEntityState.crystals = await createEntity(crystals, 'obj_crystals', false)
}

export const loadQuestEntityFromLocators = async (locators: any, variable: any, text: string): Promise<void> => {
  let res = new Map()
  locators.forEach((data: any) => {
    let index = Number(data.name.match(/\d(?=\.)/))
    let transform = getTransfFromLocNode(data)
    if (!res.has(index)) res.set(index, [])
    res.get(index)!.push(transform)
  })

  const promises = Array.from(res.entries()).map(async ([key, prepareData]) => {
    if (!variable.has(key)) variable.set(key, [])
    const entities = await createEntity(prepareData, `${text}0${key}`, false)
    variable.get(key).push(...entities)
  })
  await Promise.all(promises)
}

export const filterEntityByName = (name: string, startIndex: number = 0) => {
  let res: Array<Entity> = []
  let i = 0
  while (true) {
    i++
    let id = i >= 10 ? `${startIndex}${i}` : `${startIndex}0${i}`
    if (i >= 100) id = `${i}`
    const entity = allSavedEntity.get(name + '.' + id)
    if (entity !== undefined) res.push(entity)
    else return res
  }
}

export const filterEntityAndNameByName = (name: string, startIndex: number = 0) => {
  let res = new Map()
  let i = 0
  while (true) {
    i++
    const id = i >= 10 ? `${startIndex}${i}` : `${startIndex}0${i}`
    const entity = allSavedEntity.get(name + '.' + id)
    if (entity !== undefined) {
      res.set(entity, name + '.' + id)
    } else return res
  }
}

export const createEntity = async (position: any, modelName: string, collider: boolean = true) => {
  const modelPath = await formatSeparator(modelName)
  let entitys: Array<Entity> = []
  position.forEach((coordinates: any) => {
    const entity = engine.addEntity()
    GltfContainer.create(entity, { src: modelPath })
    Transform.create(entity, {
      position: coordinates.position,
      rotation: coordinates.rotation != undefined ? coordinates.rotation : Quaternion.Zero(),
      scale: coordinates.scale != undefined ? coordinates.scale : Vector3.create(1, 1, 1)
    })
    collider && MeshCollider.setBox(entity)
    entitys.push(entity)
  })
  return entitys
}

export const createQuestMarkEntity = async () => {
  exclamationMark = await formatSeparator('obj_mark02')
  questionMark = await formatSeparator('obj_mark01')
  questMarkEntity = engine.addEntity()
  GltfContainer.create(questMarkEntity, {
    src: exclamationMark
  })
  Transform.create(questMarkEntity, {
    position: Vector3.create(0, 2.5, 0),
    scale: Vector3.create(1, 1, 1),
    parent: myNPC
  })
  questMark(false)
}

export const questMark = (questAvailable?: boolean) => {
  if (questAvailable == undefined) return (Transform.getMutable(questMarkEntity).scale = Vector3.create(0, 0, 0))
  Transform.getMutable(questMarkEntity).scale = Vector3.create(1, 1, 1)
  if (!questAvailable) return (GltfContainer.getMutable(questMarkEntity).src = exclamationMark)
  else return (GltfContainer.getMutable(questMarkEntity).src = questionMark)
}

export const followLocators = async (path: string) => {
  let locators = await readQuestLocator(path)
  return locators.map((locator) => locator.position)
}

export const npcFollow = (
  points: Array<any>,
  duration: number,
  startNextDialog: boolean,
  questMarkSignAfterWalk?: boolean
) => {
  console.log(npc.getData(myNPC))
  GltfContainer.getMutable(myNPC).src = ''
  animationController.player_talk = false
  animationController.player_walk = true
  questMark()
  console.log('npcFollow: Start of the path')
  npc.followPath(myNPC, {
    path: points,
    startingPoint: 0,
    totalDuration: duration,
    onFinishCallback: async () => {
      console.log('npcFollow: End of the path')
      animationController.player_walk = false
      npc.getData(myNPC).state = 'talking'
      questMarkSignAfterWalk != undefined && (await questMark(questMarkSignAfterWalk))
      if (startNextDialog) {
        // open dialog when player in radius
        let playerPosition = Vector3.create(
          Transform.get(engine.PlayerEntity).position.x,
          Transform.get(myNPC).position.y,
          Transform.get(engine.PlayerEntity).position.z
        )
        Transform.getMutable(myNPC).rotation = Quaternion.lookRotation(
          Vector3.subtract(playerPosition, Transform.get(myNPC).position)
        )
        engine.addSystem(
          () => {
            if (
              Vector3.distance(Transform.get(engine.PlayerEntity).position, Transform.get(myNPC).position) <=
              NPC_DIALOG_RADIUS
            ) {
              GltfContainer.getMutable(myNPC).src = ''
              animationController.player_talk = true
              npc.openDialogWindow(myNPC, dialogState.dialog, dialogState.pointer)
              engine.removeSystem('NPC_RADIUS_SYSTEM')
              let playerPosition = Vector3.create(
                Transform.get(engine.PlayerEntity).position.x,
                Transform.get(myNPC).position.y,
                Transform.get(engine.PlayerEntity).position.z
              )
              Transform.getMutable(myNPC).rotation = Quaternion.lookRotation(
                Vector3.subtract(playerPosition, Transform.get(myNPC).position)
              )
            }
          },
          1,
          'NPC_RADIUS_SYSTEM'
        )
      } else {
        Transform.getMutable(myNPC).rotation = Quaternion.lookRotation(
          Vector3.subtract(Vector3.create(80, 1, 80), Transform.get(myNPC).position)
        )
        GltfContainer.getMutable(myNPC).src = NPC_MODEL
      }
    }
  })
}

export const getRandomDailyQuests = () => {
  let allQuests: Array<number> = []
  dailyQuestDialogMap.forEach((q, k) => allQuests.push(k))
  const date = new Date()
  const today = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  )
  function seedRandom(seed: any) {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }
  const numbers = getPlayer()?.userId.match(/\d+/g)
  let userRandom = numbers ? (Number(numbers[1]) ? Number(numbers[1]) : 0) : 0
  const generateSeed = (day: any) => {
    return day.getUTCFullYear() * (10000 * userRandom) + (day.getUTCMonth() + 1) * 100 + day.getUTCDate()
  }

  const pushQuests = () => {
    let availableQuestsArray: Set<number> = new Set()
    for (let i = 0; i < questPerDay; i++) {
      const index = Math.floor(rng * availableQuests.length)
      availableQuestsArray.add(availableQuests.splice(index, 1)[0])
      rng = seedRandom(rng)
    }
    return [...availableQuestsArray]
  }

  let rng = seedRandom(generateSeed(today))
  let availableQuests = allQuests
  dialogState.todaysDaily = pushQuests()
  console.log(dialogState.todaysDaily)
  setQuestPointer(dailyQuestDialogMap.get(dialogState.todaysDaily[dialogState.currentDaily]))
}

export const getRandomNumber = (maxNumber: number) => {
  const userId = getPlayer()?.userId.match(/\d+/g)
  const date = new Date().toISOString().split('T')[0]
  const inputString = `${userId}-${date}`
  let hash = 0
  for (let i = 0; i < inputString.length; i++) {
    hash = inputString.charCodeAt(i) + ((hash << 5) - hash)
  }
  const randomNumber = (Math.abs(hash) % maxNumber) + 1
  return randomNumber
}

export const setDayliPointer = () => {
  dialogState.currentDaily++
  dialogState.currentDaily <= dialogState.todaysDaily.length &&
    setQuestPointer(dailyQuestDialogMap.get(dialogState.todaysDaily[dialogState.currentDaily]))
  if (dialogState.currentDaily > dialogState.todaysDaily.length) {
    setSystemDialog(1)
  }
}

export const restoreInitialSpawnedItem = () => {
  const array = Array.from(questEntitySaveState.entries())
  array.forEach((item) => {
    const currentItemTransform = Transform.getMutable(item[0])
    currentItemTransform.position = item[1].position
    currentItemTransform.rotation = item[1].rotation
    currentItemTransform.scale = item[1].scale
  })
}

export const takeItem = (
  item: Entity,
  additionData?: { disableMash?: boolean; saveEntity?: boolean; itemPosition?: any }
) => {
  if (parented) {
    if (!additionData?.saveEntity) return engine.removeEntity(item)
  }
  parented = true
  takenItems = item
  Transform.getMutable(item).parent = engine.PlayerEntity
  Transform.getMutable(item).position = additionData?.itemPosition ? additionData?.itemPosition : { x: 0, y: 0.8, z: 1 }
  Transform.getMutable(item).rotation.w = 10
  GltfContainer.getMutable(item)!.invisibleMeshesCollisionMask = ColliderLayer.CL_NONE
  MeshCollider.deleteFrom(item)
}

export const deleteTakenitems = () => {
  engine.removeEntity(takenItems)
  parented = false
}

export const setQuestPointer = async (correctPointer: number | undefined) => {
  if (typeof correctPointer != 'number') return console.error('Not a valid pointer')
  console.log('Dialog pointer is set to', correctPointer)
  dialogState.pointer = correctPointer
}

export const setSystemDialog = (pointer: number) => {
  dialogState.dialog = systemDialog
  dialogState.pointer = pointer
}

export const registrateItemAnimation = (entity: Entity, animations: Array<string>, loop: boolean = false) => {
  let states: any = []
  animations.forEach((name) => {
    states.push({
      clip: name,
      playing: true,
      loop: loop
    })
  })
  Animator.create(entity, {
    states: states
  })
}

export const triggerQuestItemAnimation = (entity: Entity, animationName: string, loop: boolean = false) => {
  Animator.playSingleAnimation(entity, animationName)
  Animator.getClip(entity, animationName)
}

export const readQuestLocator = async (fileName: string) => {
  return (await Promise.resolve(readGltfLocators(fileName))).map((obj) => getTransfFromLocNode(obj))
}

export const initialSounds = () => {
  SoundManager.setConstantSounds({
    compliteQuest: soundsPath.compliteQuest,
    pickUpSeed: soundsPath.pickUpSeed,
    growTree: soundsPath.growTree,
    updateTask: soundsPath.updateTask,
    teleportTurnOnAttempt: soundsPath.teleportTurnOnAttempt,
    teleportTurnOn: soundsPath.teleportTurnOn,
    collectCrystal: soundsPath.collectCrystal,
    collectStick: soundsPath.collectStick,
    fireLight: soundsPath.fireLight,
    lavalampOnAttempt: soundsPath.lavalampOnAttempt,
    lavalampOn: soundsPath.lavalampOn,
    pickUpFeed: soundsPath.pickUpFeed,
    useFeed: soundsPath.useFeed,
    spiderPlatform: soundsPath.spiderPlatform,
    pickUpSpider: soundsPath.pickUpSpider,
    firefliesTurnOnAttempt: soundsPath.firefliesTurnOnAttempt,
    firefliesTurnOn: soundsPath.firefliesTurnOn,
    waterTree: soundsPath.waterTree,
    fillJug: soundsPath.fillJug,
    pickUpJug: soundsPath.pickUpJug,
    eraseGraffiti: soundsPath.eraseGraffiti,
    collectTrash: soundsPath.collectTrash,
    voiceNPC: soundsPath.voiceNPC,
    pickUpCoin: soundsPath.pickUpCoin
  })
}

export const attachSound = (entityArray: Array<Entity>, audioClipUrl: string, volume: number = 1) => {
  entityArray.forEach((entity) => {
    if (AudioSource.has(entity)) AudioSource.deleteFrom(entity)
    AudioSource.create(entity, {
      audioClipUrl,
      loop: true,
      playing: true,
      volume
    })
  })
}

export const callbackAI = () => {
  if (dialogState.interactedAI) return
  dialogState.pointer = 3
  dialogState.interactedAI = true
  questMark(true)
  dialogState.uiText = { text: 'Return and talk to Cosmo' }
}

export const callbackTeleport = () => {
  if (!dialogState.isItFirstTeleport) return
  dialogState.isItFirstTeleport = false
  npc.openDialogWindow(myNPC, systemDialog, 13)
}

export const resetQuestLine = async () => {
  dialogState.pointer = 0
  dialogState.todaysDaily = []
  const modelPath = await formatSeparator('obj_pine01')
  dialogState.questUiHudVisible = false
  deleteTakenitems()
  Object.entries(entityState)
    .filter(([key]) => key !== 'takenItems')
    .forEach(([key, value]) => {
      console.log(key)
      value.forEach((entity) => engine.removeEntity(entity))
    })
  selectedEntityState.questEntityTrees.map((tree, key) => {
    Transform.getMutable(tree).scale = selectedEntityState.treeData[key].scale
    Transform.getMutable(tree).rotation = selectedEntityState.treeData[key].rotation
    GltfContainer.getMutable(tree).src = modelPath
  })
  selectedEntityState.spidersObj.map((spider, key) => {
    Transform.getMutable(spider).scale = Vector3.create(1, 1, 1)
  })
  restoreInitialSpawnedItem()
  dialogState.myQuest = undefined
  questMark(false)
}
