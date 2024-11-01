import { AREA_SYSTEM, AreaSystem } from 'daohq-shared/Components/AreaTrigger'
import { allSavedEntity, SOUND_MANAGER, mannequins as allMannequins } from '../states/states'
import { AREA_TRIGGER_ID, areaTriggersModels } from './constants/areaConfig'
import { screenContentManager, screensInstances } from 'daohq-shared/globals'
import { hideMannequin, MarketplaceMannequin, showMannequin } from './setupMarketplace'
import { timers } from '@dcl-sdk/utils'

export function setupAreaSystem() {
  AreaSystem.create()
  setupAreaEvents()
  setupAreaLayers()
}

function setupAreaLayers() {
  for (let [name, entity] of allSavedEntity) {
    const found = areaTriggersModels.find((m) => m.models.includes(name as string))
    if (found) AreaSystem.registerEntity(entity, found.area)
  }

  const screensWithTrigger = screensInstances.screens.filter((screenItem) => screenItem.screen.videoTrigger)
  if (screensWithTrigger.length) {
    screensWithTrigger.forEach((screenItem) => {
      if (screenItem.screen.videoTrigger?.entity) {
        AreaSystem.registerEntity(screenItem.screen.videoTrigger.entity, `trigger_${screenItem.screen.name}`)
      }
    })
  }
}

function setupAreaEvents() {
  const soundAreas = [
    AREA_TRIGGER_ID.SHOWROOM,
    AREA_TRIGGER_ID.SPACEBASE,
    AREA_TRIGGER_ID.TECHLAB,
    AREA_TRIGGER_ID.GOVERNANCE,
    AREA_TRIGGER_ID.TOWN_HALL,
    AREA_TRIGGER_ID.HELP_CENTER,
    AREA_TRIGGER_ID.WAR_ROOM,
    AREA_TRIGGER_ID.CREATOR_HALL,
    AREA_TRIGGER_ID.COFFEE_SPACE,
    AREA_TRIGGER_ID.ATOM_SPACE,
    AREA_TRIGGER_ID.GEAR_SPACE,
    AREA_TRIGGER_ID.STAR_SPACE,
    AREA_TRIGGER_ID.DELEGATES,
    AREA_TRIGGER_ID.VOTERS,
    AREA_TRIGGER_ID.PROPOSALS,
    AREA_TRIGGER_ID.PARTICIPATION,
    AREA_TRIGGER_ID.TREASURY,
    AREA_TRIGGER_ID.MUSEUM,
    AREA_TRIGGER_ID.OUTSIDE
  ]
  for (const i of soundAreas) {
    if (i == 'NONE') continue
    AREA_SYSTEM.registerEnterEvent(i, (area) => {
      SOUND_MANAGER.setTheme(area)
      screenContentManager.updateSceneContentState(
        { ...screenContentManager.contentState, userInLocation: area },
        'no switch'
      )
    })
    AREA_SYSTEM.registerExitEvent(i, (area) => {
      SOUND_MANAGER.setTheme(undefined)
    })
  }

  const mannequinAreas = [
    AREA_TRIGGER_ID.MARKETPLACE_AREA_1,
    AREA_TRIGGER_ID.MARKETPLACE_AREA_2,
    AREA_TRIGGER_ID.MARKETPLACE_AREA_3,
    AREA_TRIGGER_ID.CREATOR_HALL
  ]

  for (const area_ of mannequinAreas) {
    AREA_SYSTEM.registerEnterEvent(area_, (area) => {
      for (const j of allMannequins.mannequinItems) {
        if (MarketplaceMannequin.get(j.avatar).areaId == area) {
          showMannequin(j)
        }
      }
    })

    AREA_SYSTEM.registerExitEvent(area_, (area) => {
      for (const j of allMannequins.mannequinItems) {
        if (MarketplaceMannequin.get(j.avatar).areaId == area) {
          hideMannequin(j)
        }
      }
    })
  }

  registerTriggersEvents()
}

function registerTriggersEvents() {
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
      if (screenItem.screen.videoTrigger?.entity) {
        if (!screenItem.screen.videoTrigger.area) {
          AREA_SYSTEM.registerEnterEvent(`trigger_${screenItem.screen.name}`, onEnter)
          AREA_SYSTEM.registerExitEvent(`trigger_${screenItem.screen.name}`, onExit)
        }
      }
      if (screenItem.screen.videoTrigger?.area) {
        AREA_SYSTEM.registerEnterEvent(screenItem.screen.videoTrigger.area, onEnter)
        AREA_SYSTEM.registerExitEvent(screenItem.screen.videoTrigger.area, onExit)
      }
    })
  }
}
