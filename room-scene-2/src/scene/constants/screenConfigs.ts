import { IExtraLocatorData, SCREEN_FORMATS } from "daohq-shared/types";
import { AREA_TRIGGER_ID } from "./areaConfig";

export const screenConfigs: IExtraLocatorData[] = [
  //room07 (atom space)
  {
    name: 'screen_atom_space_room1102.001',
    transform: { scale: { x: 7, y: 4.25, z: 1 } },
    extras: {
      concaveRadius: 14,
      concaveSectionsQuantity: 6,
      for_booking: true,
      supports_streaming: true,
      description: 'Screen Atom Space',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        area: AREA_TRIGGER_ID.ATOM_SPACE_ROOM
      }
    }
  }
]