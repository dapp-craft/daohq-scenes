import { Transform } from '@dcl/sdk/ecs'
import { getTransfFromLocNode, readGltfLocators } from 'daohq-shared/scripts'
import { allSavedEntity, ITeleportsDataItem, teleportsData } from '../states/states'
import { SceneTransform } from 'daohq-shared/types'
import { SCENE_OFFSET } from './constants'
import { triggers, NO_LAYERS, LAYER_1 } from '@dcl-sdk/utils'
import { Vector3 } from '@dcl/sdk/math'
import { movePlayerTo } from '~system/RestrictedActions'
import { dialogState, fixedTeleportList } from '../quests/src/questState'
import { callbackTeleport } from '../quests/src/questHandler'

const updateTeleportItemData = (locationId: string, capsuleEntityName: string, roomEntityName: string) => {
  const capsuleEntity = allSavedEntity.get(capsuleEntityName)
  const roomEntity = allSavedEntity.get(roomEntityName)
  if (capsuleEntity) {
    const transform = Transform.getOrNull(capsuleEntity)
    if (locationId in teleportsData && transform) {
      teleportsData[locationId as keyof typeof teleportsData].coords.capsule = transform.position
      teleportsData[locationId as keyof typeof teleportsData].capsuleEntity = capsuleEntity
    }
  }
  if (roomEntity) {
    const transform = Transform.getOrNull(roomEntity)
    if (locationId in teleportsData && transform) {
      teleportsData[locationId as keyof typeof teleportsData].coords.lookAt = transform.position
    }
  }
}

export const setupTeleports = async () => {
  for (let locationId in teleportsData) {
    switch (locationId) {
      case 'townHall':
        updateTeleportItemData('townHall', 'obj_teleport01.001', 'obj_room.001')
        break
      case 'helpCenter':
        updateTeleportItemData('helpCenter', 'obj_teleport01.002', 'obj_room.002')
        break
      case 'atomSpace':
        updateTeleportItemData('atomSpace', 'obj_teleport01.007', 'obj_room.007')
        break
      case 'worlds':
        updateTeleportItemData('worlds', 'obj_teleport01.010', 'obj_room.010')
        break
      case 'starSpace':
        updateTeleportItemData('starSpace', 'obj_teleport01.009', 'obj_room.009')
        break
      case 'creatorHall':
        updateTeleportItemData('creatorHall', 'obj_teleport01.004', 'obj_room.004')
        break
      case 'museum':
        updateTeleportItemData('museum', 'obj_teleport01.005', 'obj_room.005')
        break
      case 'coffeeSpace':
        updateTeleportItemData('coffeeSpace', 'obj_teleport01.006', 'obj_room.006')
        break
      case 'warRoom':
        updateTeleportItemData('warRoom', 'obj_teleport01.003', 'obj_room.003')
        break
      case 'gearSpace':
        updateTeleportItemData('gearSpace', 'obj_teleport01.008', 'obj_room.008')
        break
      case 'spawnPoint':
        teleportsData.spawnPoint.coords.roomPoint = SCENE_OFFSET
        teleportsData.spawnPoint.coords.lookAt = { ...SCENE_OFFSET, y: 1.5, z: SCENE_OFFSET.z - 2.25 }
        break
      default:
        break
    }
  }
  const teleportNodes = await readGltfLocators('locators/obj_rooms_teleport_locators.gltf')
  if (teleportNodes) {
    teleportNodes.forEach((node) => {
      const transform: SceneTransform = getTransfFromLocNode(node)
      if (transform.position) {
        switch (node.name) {
          case 'obj_room_teleport.001':
            teleportsData.townHall.coords.roomPoint = transform.position
            setupTeleportTrigger(teleportsData.townHall)
            break
          case 'obj_room_teleport.002':
            teleportsData.helpCenter.coords.roomPoint = transform.position
            setupTeleportTrigger(teleportsData.helpCenter)
            break
          case 'obj_room_teleport.007':
            teleportsData.atomSpace.coords.roomPoint = transform.position
            setupTeleportTrigger(teleportsData.atomSpace)
            break
          case 'obj_room_teleport.010':
            teleportsData.worlds.coords.roomPoint = transform.position
            setupTeleportTrigger(teleportsData.worlds)
            break
          case 'obj_room_teleport.009':
            teleportsData.starSpace.coords.roomPoint = transform.position
            setupTeleportTrigger(teleportsData.starSpace)
            break
          case 'obj_room_teleport.004':
            teleportsData.creatorHall.coords.roomPoint = transform.position
            setupTeleportTrigger(teleportsData.creatorHall)
            break
          case 'obj_room_teleport.005':
            teleportsData.museum.coords.roomPoint = transform.position
            setupTeleportTrigger(teleportsData.museum)
            break
          case 'obj_room_teleport.006':
            teleportsData.coffeeSpace.coords.roomPoint = transform.position
            setupTeleportTrigger(teleportsData.coffeeSpace)
            break
          case 'obj_room_teleport.003':
            teleportsData.warRoom.coords.roomPoint = transform.position
            setupTeleportTrigger(teleportsData.warRoom)
            break
          case 'obj_room_teleport.008':
            teleportsData.gearSpace.coords.roomPoint = transform.position
            setupTeleportTrigger(teleportsData.gearSpace)
            break
          default:
            break
        }
      }
    })
  }
}

const setupTeleportTrigger = (teleportData: ITeleportsDataItem) => {
  if (teleportData.coords.capsule && teleportData.capsuleEntity) {
    const scale: Vector3 = { x: 1.5, y: 4, z: 1.5 }

    triggers.addTrigger(
      teleportData.capsuleEntity,
      NO_LAYERS,
      LAYER_1,
      [{ type: 'box', scale }],

      function () {
        callbackTeleport()
        let correctPortal = fixedTeleportList.find((item) => {
          return JSON.stringify(Transform.get(item).position) === JSON.stringify(teleportData.coords.capsule)
        })
        if (!correctPortal && dialogState.isTeleportFromStory) return
        if (teleportData.coords.roomPoint && teleportData.coords.lookAt) {
          movePlayerTo({
            newRelativePosition:
              correctPortal || dialogState.teleportActive
                ? teleportData.coords.roomPoint
                : Vector3.create(
                    teleportData.coords.roomPoint.x,
                    teleportData.coords.roomPoint.y + 10,
                    teleportData.coords.roomPoint.z
                  ),
            cameraTarget: teleportData.coords.lookAt
          })
        }
      }
    )
  }
}
