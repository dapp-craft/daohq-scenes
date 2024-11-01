import * as utils from '@dcl-sdk/utils'
import {
  ColliderLayer,
  Entity,
  GltfContainer,
  InputAction,
  MeshCollider,
  Transform,
  engine,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { coinState, selectedEntityState } from './questState'
import { pickUpCoin } from './backend'
import { updateXPCounter } from './backendHandler'
import { createEntity, readQuestLocator } from './questHandler'
import { SOUND_MANAGER } from '../../states/states'

const afterTrigger = async (entity: Entity) => {
  engine.removeEntity(entity)
  SOUND_MANAGER.playSound('pickUpCoin')
  const response = await pickUpCoin(coinState.coinMap.get(entity))
  if (!response.success) return
  await updateXPCounter()
  console.log('COIN!')
}

export const coinsSpawn = async () => {
  if (!coinState.activate) return
  let availableCoindData: Array<any> = []
  let coinsData = await readQuestLocator('locators/obj_area00_coins.gltf')
  coinState.availableCoins.forEach((id) => availableCoindData.push(coinsData[id - 1]))
  selectedEntityState.coins = await createEntity(availableCoindData, 'obj_coin')
  for (let i = 0; i <= coinState.availableCoins.length; i++)
    coinState.coinMap.set(selectedEntityState.coins[i], coinState.availableCoins[i])
  selectedEntityState.coins.forEach(async (entity) => {
    GltfContainer.getMutable(entity).invisibleMeshesCollisionMask = ColliderLayer.CL_NONE
    MeshCollider.getMutable(entity).collisionMask = ColliderLayer.CL_POINTER
    coinTrigger(entity)
  })
}

export const coinTrigger = (entity: Entity) => {
  const { scale } = Transform.get(entity)
  pointerEventsSystem.onPointerDown(
    {
      entity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'COLLECT'
      }
    },
    () => {
      afterTrigger(entity)
    }
  )
  utils.triggers.addTrigger(entity, utils.NO_LAYERS, utils.LAYER_1, [{ type: 'box', scale }], () =>
    afterTrigger(entity)
  )
}
