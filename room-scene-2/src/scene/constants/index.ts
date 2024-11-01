import { IExtraLocatorData } from 'daohq-shared/types'
import { screenConfigs } from './screenConfigs'
import { postersConfigs } from './postersConfigs'
/**
 * List of all the extra locators files to be read
 */
export const extraLocatorsFiles: string[] = [
  //room07 (atom space)
  //room07 (interior objects)
  'obj_room07_locators.gltf',
  'obj_room07_sign.gltf',
  'obj_room07_atom.gltf',
  'obj_room07_bin.gltf',
  'obj_room07_book.gltf',
  'obj_room07_bot.gltf',
  'obj_room07_box.gltf',
  'obj_room07_btable.gltf',
  'obj_room07_can.gltf',
  'obj_room07_chemical.gltf',
  'obj_room07_claw.gltf',
  'obj_room07_container.gltf',
  'obj_room07_cooler.gltf',
  'obj_room07_floppy.gltf',
  'obj_room07_fridge.gltf',
  'obj_room07_lab.gltf',
  'obj_room07_lamp.gltf',
  'obj_room07_vtable.gltf',
  'obj_room07_pc.gltf',
  'obj_room07_pencil.gltf',
  'obj_room07_pill.gltf',
  'obj_room07_plant.gltf',
  'obj_room07_qtable.gltf',
  'obj_room07_stack.gltf',
  'obj_room07_wrench.gltf',

  //room07 (interactive objects)
  'obj_room07_seat.gltf',
  'obj_room07_sofa.gltf',

  //room07 (screens)
  'obj_room07_screen.gltf',
  'screens_obj_room07.gltf',

  //room07 (events)
  'obj_room07_events.gltf'
]

/**
 * List of hardcoded extra locators configurations
 */
export const configsToMerge: IExtraLocatorData[][] = [screenConfigs, postersConfigs]
