import { ReactEcsRenderer, UiComponent } from '@dcl/sdk/react-ecs'
import { npcFilterMenu, wearableDescriptionMenu } from './ui/modules/marketplaceMenu'
import { adminPanelTeleport } from 'daohq-shared/uiComponents/adminPanelTeleport'
import { proposalInformation, proposalsBoard } from './ui/modules/votingMenu'
import { PBUiCanvasInformation, UiCanvasInformation } from '@dcl/sdk/ecs'
import { isVisible } from './states/states'
import { questRewardUi } from './ui/modules/questRewardUi'
import { debugUi } from './debug/debugUi'
import { NpcUtilsUi } from 'dcl-npc-toolkit'
import { loadingUI } from './debug/loadingUI'
import { teleportMap } from './ui/modules/teleportMap'
import { proposalsAndEventsPanel } from './ui/modules/proposalsAndEventsPanel'
import { controlsAndQuestsPanel } from './ui/modules/controlsAndQuestsPanel'
import { teleportToRealmConfirm } from 'daohq-shared/uiComponents/teleportToRealmConfirm'
import { setupEventDetailsUIScaling, uiEventDettails } from 'daohq-shared/Components/PlazaBoard'

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
  // const canvasInfo = UiCanvasInformation.getOrNull(engine.RootEntity) as PBUiCanvasInformation
  // const scale = canvasInfo.height / 1080
  // console.log('UI SCALE: ', scale)
  // setupEventDetailsUIScaling(scale, scale, scale)
}

const uiComponent: UiComponent = () => [
  proposalsAndEventsPanel(),
  controlsAndQuestsPanel(),
  teleportMap(),
  proposalsBoard(),
  proposalInformation(),
  adminPanelTeleport(),
  npcFilterMenu(),
  wearableDescriptionMenu(),
  questRewardUi(),
  NpcUtilsUi(),
  teleportToRealmConfirm(),
  debugUi(),
  loadingUI()
  // uiEventDettails()
]
