import { IExtraLocatorData } from 'daohq-shared/types'
import { MenuManager, HorizontalMenu } from 'daohq-shared/Components/PlazaBoard'
import { MENU_TYPE } from 'daohq-shared/types'
import { Quaternion, Vector3 } from '@dcl/sdk/math'

export async function setupPlazaMenu(configs: IExtraLocatorData[]) {
  const menuManager = new MenuManager()

  configs.forEach((config, i) => {
    let menu = new HorizontalMenu(
      config.transform?.position as Vector3,
      config.transform?.rotation as Quaternion,
      menuManager,
      i
    )
    switch (config.extras?.type) {
      case MENU_TYPE.CROWD:
        menu.updateCrowdsMenu(10)
        break
      case MENU_TYPE.EVENT:
        menu.updateEventsMenu(10)
        break
      case MENU_TYPE.BEST:
        menu.updateBestMenu(10)
        break
      default:
        break
    }

    menuManager.addMenu(menu)
  })
}
