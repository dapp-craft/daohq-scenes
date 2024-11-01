import {
  setDefaultOffset,
  fillLocationScheme,
  extractLocators,
  readGltfLocators,
  InteractionSystem
} from 'daohq-shared/scripts'
import { SCENE_OFFSET } from './constants'
import { VisibilityComponent, engine } from '@dcl/sdk/ecs'
import { setupScreens } from 'daohq-shared/setupFnc/setupScreens'
import { setupModels } from 'daohq-shared/setupFnc/setupModels'
import { setupEventPosters } from 'daohq-shared/setupFnc/setupEventPosters'
import {
  addButtonsToControlPanels,
  setupDynamicMarket,
  setupStaticMarket,
  sortMannequinConfigs
} from './setupMarketplace'
import { extraLocatorsFiles, modelsToHide, configsToMerge } from './constants/index'
import { allEventPosters, allSavedEntity, loadingProgress } from '../states/states'
import { setupDiscord } from './setupDiscord'
import { setupEstateBoards } from './setupEstate'
import { setupBookingNPCs, setupHelpCenterNPC } from './setupNPCs'
import { wsHandler, setToggleProposalBoard, setBaseUrl, sceneLocationsSchema } from 'daohq-shared/globals'
import { WS_EVENTS } from '../wsEvents'
import { toggleProposalBoard } from '../ui/modules/votingMenu'
import { BASE_URL } from '../../deployConfig'
import { config } from '../../debugConfig'
import { setupMetrics } from './setupMetrics'
import { entityNames, entityStartIndex, animation } from './constants/interactionConfig'
import { musicStateSystem } from '../scripts/musicStateSystem'
import { setupPlazaMenu } from './setupPlazaMenu'
import { setupAreaSystem } from './setupAreaSystem'
import { setupArcade } from './setupArcade'
import { setupThemes } from './setupThemes'
import { setupSounds } from './setupSounds'

function profile<A extends unknown[], R>(func: (...args: A) => R, ...args: A) {
  async function wrapper() {
    let start = Date.now()
    return { value: await func(...args), time: Date.now() - start }
  }
  Object.defineProperty(wrapper, 'name', { value: func.name })
  return wrapper
}

async function hideModels() {
  modelsToHide.forEach((name) => {
    const entity = allSavedEntity.get(name)
    if (entity) {
      VisibilityComponent.create(entity, { visible: false })
    }
  })
}

export async function setupScene(): Promise<void> {
  // Add events to the WebSocketHandler
  Object.keys(WS_EVENTS).forEach((event) => wsHandler.addEvent(event, WS_EVENTS[event]))

  setBaseUrl(BASE_URL)
  setToggleProposalBoard(toggleProposalBoard)

  setDefaultOffset(SCENE_OFFSET)

  const { mannequins, models, screens, discord, estates, posters, metrics, plazaMenus } = extractLocators(
    await Promise.all(extraLocatorsFiles.map((f) => readGltfLocators(`locators/${f}`))),
    configsToMerge
  )

  const { staticMannequins, dynamicMannequins } = sortMannequinConfigs(mannequins)

  fillLocationScheme(screens, sceneLocationsSchema)

  models.sort((d1, d2) => {
    switch (true) {
      case /room|ground|fence|floor|road|river|pavilion|borders|globe|fountain|tower|station|rocket|hourglass/.test(
        d1.name
      ):
        return -1
      case /room|ground|fence|floor|road|river|pavilion|borders|globe|fountain|tower|station|rocket|hourglass/.test(
        d2.name
      ):
        return 1
      case /npc|superhero|shuttle/.test(d1.name):
        return 1
      case /npc|superhero|shuttle/.test(d2.name):
        return -1
      default:
        return d1.name.localeCompare(d2.name)
    }
  })
  await Promise.allSettled(
    [
      profile(setupModels, models, allSavedEntity, config.modelLoaderThreads, (data) => {
        loadingProgress[data.thread] = data.current / data.total
        if (!data.okay) console.error(`Error loading model ${data.name}: ${data.error}`)
      }),
      profile(setupEventPosters, posters, allEventPosters),
      profile(setupEstateBoards, estates),
      profile(setupDynamicMarket, dynamicMannequins),
      profile(setupStaticMarket, staticMannequins),
      profile(setupScreens, screens, config.triggersVisibility),
      profile(setupDiscord, discord),
      profile(setupMetrics, metrics),
      profile(setupThemes),
      profile(setupPlazaMenu, plazaMenus)
    ].map(
      async (func) =>
        await func()
          ?.then((ret) => console.log(`Done ${func.name} (${ret.time} ms): ${ret.value}`))
          ?.catch((err) => console.error(`Error ${func.name}: ${err}`))
    )
  )
  new InteractionSystem({ allSavedEntity, entityNames, entityStartIndex, animation })
  models
    .filter((data) => data.name.startsWith('obj_filters') && data.transform)
    .map((data) => addButtonsToControlPanels(data.transform!))

  setupSounds()
  setupAreaSystem()
  setupHelpCenterNPC()
  setupBookingNPCs()
  setupArcade()
  hideModels()
  engine.addSystem(musicStateSystem)
}
