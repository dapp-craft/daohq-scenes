import { IExtraLocatorData, MENU_TYPE } from 'daohq-shared/types'

export const plazaMenuConfigs: IExtraLocatorData[] = [
  {
    name: 'plazaMenu_eventPoster.001', //best rated
    extras: {
      type: MENU_TYPE.BEST
    }
  },
  {
    name: 'plazaMenu_eventPoster.002', //event explorer
    extras: {
      type: MENU_TYPE.EVENT
    }
  },
  {
    name: 'plazaMenu_eventPoster.003', //crowd
    extras: {
      type: MENU_TYPE.CROWD
    }
  }
]
