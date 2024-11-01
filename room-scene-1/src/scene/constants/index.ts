import { IExtraLocatorData } from 'daohq-shared/types'
import { screenConfigs } from './screenConfigs'
import { postersConfigs } from './postersConfigs'
/**
 * List of all the extra locators files to be read
 */
export const extraLocatorsFiles: string[] = [
  //room06 (coffee space)
  //room06 (interior objects)
  'obj_room06_locators.gltf',
  'obj_room06_bin.gltf',
  'obj_room06_board.gltf',
  'obj_room06_book.gltf',
  'obj_room06_btable.gltf',
  'obj_room06_can.gltf',
  'obj_room06_curtains.gltf',
  'obj_room06_floor.gltf',
  'obj_room06_fridge.gltf',
  'obj_room06_kitchen.gltf',
  'obj_room06_ltableb.gltf',
  'obj_room06_pc.gltf',
  'obj_room06_pill.gltf',
  'obj_room06_plant.gltf',
  'obj_room06_projector.gltf',
  'obj_room06_shelf.gltf',
  'obj_room06_speaker.gltf',
  'obj_room06_stool.gltf',
  'obj_room06_rtable.gltf',
  'obj_room06_vase.gltf',
  'obj_room06_wall.gltf',
  'obj_room06_sign.gltf',

  //room06 (interactive objects)
  'obj_room06_chair.gltf',
  'obj_room06_puffer.gltf',
  'obj_room06_seat.gltf',

  //room06 (screens)
  'obj_room06_screen.gltf',
  'screens_obj_room06.gltf',

  //room06 (events)
  'obj_room06_events.gltf'
]

/**
 * List of hardcoded extra locators configurations
 */
export const configsToMerge: IExtraLocatorData[][] = [screenConfigs, postersConfigs]
