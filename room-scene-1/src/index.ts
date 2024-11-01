import { setupScene } from './scene/setupScene'
import { setupUi } from 'daohq-shared/room/ui/ui'
import { getTeleportToScreenData } from 'daohq-shared/scripts/getTeleportToScreenData'
import { initialConfigParams } from './debug'


export async function main() {
  await initialConfigParams()
  await setupScene()
  await getTeleportToScreenData()
  setupUi()
}
