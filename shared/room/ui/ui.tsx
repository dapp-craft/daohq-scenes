import { ReactEcsRenderer, UiComponent } from '@dcl/sdk/react-ecs'
import { adminPanelTeleport } from '../../uiComponents/adminPanelTeleport'
import { teleportToRealmConfirm } from '../../uiComponents/teleportToRealmConfirm'

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent: UiComponent = () => [adminPanelTeleport(), teleportToRealmConfirm()]
