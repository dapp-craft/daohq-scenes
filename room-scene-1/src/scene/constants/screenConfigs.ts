import { IExtraLocatorData, SCREEN_FORMATS } from "daohq-shared/types";
import { AREA_TRIGGER_ID } from "./areaConfig";

export const screenConfigs: IExtraLocatorData[] = [
  //room06 (coffee space)
  {
    name: 'screen_coffee_space_room1002.001',
    transform: { scale: { x: 5.88, y: 3.62, z: 1 } },
    extras: {
      concaveRadius: 11,
      concaveSectionsQuantity: 6,
      for_booking: true,
      supports_streaming: true,
      description: 'Screen Coffee Space',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        area: AREA_TRIGGER_ID.COFFEE_SPACE_ROOM
      }
    }
  }
]