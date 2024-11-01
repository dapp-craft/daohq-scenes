import { MeshCollider, Transform, engine, Entity } from '@dcl/sdk/ecs'
import { extraLocatorsFiles, configsToMerge } from './constants/index'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { BASE_URL } from '../../deployConfig'
import {
  screenContentManager,
  screensInstances,
  setBaseUrl,
  setSceneLocationsSchema,
  wsHandler
} from 'daohq-shared/globals'
import {
  fillLocationScheme,
  extractLocators,
  setDefaultOffset,
  readGltfLocators,
  InteractionSystem
} from 'daohq-shared/scripts'
import { setupEventPosters } from 'daohq-shared/setupFnc/setupEventPosters'
import { setupScreens } from 'daohq-shared/setupFnc/setupScreens'
import { setupModels } from 'daohq-shared/setupFnc/setupModels'
import { fetchStreamsSystem } from 'daohq-shared/Components/Screen/Screen'
import { WS_EVENTS } from 'daohq-shared/room/wsEvents'
import { entityNames, entityStartIndex, animation } from './constants/interactionConfig'
import { ILocationSchema } from 'daohq-shared/types'
import { areaTriggersModels } from './constants/areaConfig'
import { config } from '../../debugConfig'
import { AREA_SYSTEM, AreaSystem } from 'daohq-shared/Components/AreaTrigger'
import { timers } from '@dcl-sdk/utils'

const offsetCenter = Vector3.create(16, 16, 24)

export async function setupScene(): Promise<void> {
  setDefaultOffset(offsetCenter)
  const plane = engine.addEntity()
  Transform.create(plane, {
    position: offsetCenter,
    scale: Vector3.create(32, 32, 1),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0)
  })
  MeshCollider.setPlane(plane)

  Object.keys(WS_EVENTS).forEach((event) => wsHandler.addEvent(event, WS_EVENTS[event]))

  setBaseUrl(BASE_URL)

  const { models, screens, posters } = extractLocators(
    await Promise.all(extraLocatorsFiles.map((f) => readGltfLocators(`locators/${f}`))),
    configsToMerge
  )

  const sceneLocationsSchema: ILocationSchema = {}
  fillLocationScheme(screens, sceneLocationsSchema)
  setSceneLocationsSchema(sceneLocationsSchema)

  setupEventPosters(posters, [])
  const modelEntities: Map<string, Entity> = new Map()
  await setupModels(models, modelEntities, 50, ({ name, error }) =>
    error ? console.error(`Loading '${name}' failed: ${error}`) : null
  )
  await setupScreens(screens, config.triggersVisibility)
  new InteractionSystem({ allSavedEntity: modelEntities, entityNames, entityStartIndex, animation })
  AreaSystem.create()
  setupAreaEvents()
  setupAreaLayers(modelEntities)
  engine.addSystem(fetchStreamsSystem)
}

function setupAreaLayers(entities: Map<string, Entity>) {
  for (let [name, entity] of entities) {
    const found = areaTriggersModels.find((m) => m.models.includes(name as string))
    if (found) AreaSystem.registerEntity(entity, found.area)
  }
}

function setupAreaEvents() {
  const screensWithTrigger = screensInstances.screens.filter((screenItem) => screenItem.screen.videoTrigger)
  if (screensWithTrigger.length) {
    screensWithTrigger.forEach((screenItem) => {
      let timerId: number | null = null
      function onEnter() {
        timerId = timers.setTimeout(() => {
          timerId = null
          screenItem.screen.isUserInTriggerZone = true
          screenContentManager.updateSceneContentState(
            { ...screenContentManager.contentState, screenFromTrigger: screenItem.screen },
            'on'
          )
        }, 200)
      }
      async function onExit() {
        if (timerId) {
          timers.clearTimeout(timerId)
        } else {
          screenItem.screen.isUserInTriggerZone = false
          await screenContentManager.updateSceneContentState(
            { ...screenContentManager.contentState, screenFromTrigger: screenItem.screen },
            'off'
          )
          if (
            screenContentManager.contentState.screensQueue.length &&
            !screenContentManager.contentState.screenInFocus
          ) {
            screenContentManager.contentState.screensQueue.forEach((screen) =>
              screenContentManager.clearScreensQueue(screen)
            )
          }
        }
      }
      if (screenItem.screen.videoTrigger?.area) {
        AREA_SYSTEM.registerEnterEvent(screenItem.screen.videoTrigger.area, onEnter)
        AREA_SYSTEM.registerExitEvent(screenItem.screen.videoTrigger.area, onExit)
      }
    })
  }
}
