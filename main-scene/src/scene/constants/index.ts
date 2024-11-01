import { Vector3 } from '@dcl/sdk/math'
import { IExtraLocatorData } from 'daohq-shared/types'
import { mannequinConfigs } from './mannequinConfigs'
import { plazaMenuConfigs } from './plazaMenuConfigs'
import { postersConfigs } from './postersConfigs'
import { metricsScreenConfigs } from './metricsScreenConfigs'
import { discordScreenConfigs } from './discordScreenConfigs'
import { screenConfigs } from './screenConfigs'

export const SCENE_OFFSET: Vector3 = { x: 80, y: 0, z: 80 }

export const HELP_LINKS = {
  FAQ: 'https://docs.decentraland.org/player/general/faq/',
  DAO: 'https://decentraland.org/governance',
  Proposals: 'https://docs.decentraland.org/player/general/dao/overview/what-can-you-do-with-the-dao/',
  Grants: 'https://decentraland.org/dao/grants'
}

export const modelsToHide: string[] = ['obj_avatars01.001', 'obj_avatars02.001', 'obj_avatars03.001']

export const extraLocatorsFiles: string[] = [
  //area00 (outside)
  //area00 (envrionment objects)
  'obj_area00_borders.gltf',
  'obj_area00_grass.gltf',
  'obj_area00_pavilion.gltf',
  'obj_area00_road.gltf',
  'obj_area00_sign.gltf',
  'obj_area00_globe.gltf',
  'obj_area00_fountain.gltf',
  'obj_area00_floor.gltf',
  'obj_area00_station.gltf',
  'obj_area00_rocket.gltf',
  'obj_area00_plant.gltf',
  'obj_area00_shuttle.gltf',
  'obj_area00_hourglass.gltf',
  'obj_area00_rwave.gltf',
  'obj_area00_stars.gltf',

  //area00 (interactive objects)
  // 'obj_area00_coins.gltf',
  'obj_area00_arcades.gltf',
  'obj_area00_sofa.gltf',
  // 'obj_area00_graffiti.gltf',
  // 'obj_area00_stickers.gltf',

  //area00 (screens)
  'obj_area00_discord.gltf',
  'screens_discord_area00.gltf',

  //area01 (showroom)
  //area01 (envrionment objects)
  'obj_area01_arc.gltf',
  'obj_area01_bin.gltf',
  'obj_area01_borders.gltf',
  'obj_area01_bush.gltf',
  'obj_area01_fence.gltf',
  'obj_area01_light.gltf',
  'obj_area01_lines.gltf',
  'obj_area01_sign.gltf',
  'obj_area01_tower.gltf',
  'obj_area01_transmitter.gltf',
  'obj_area01_ground.gltf',

  //area01 (interactive objects)
  'obj_area01_bench.gltf',
  'obj_area01_puffer.gltf',
  'obj_area01_lamp.gltf',
  'obj_area01_pine.gltf',
  'obj_area01_vase.gltf',
  'obj_area01_waterfall.gltf',
  'obj_area01_earth.gltf',
  // 'obj_area01_seeds.gltf',
  'obj_area01_firefly.gltf',
  'obj_area01_spray.gltf',

  //area01 (screens)
  'obj_area01_banner.gltf',
  'obj_area01_screen.gltf',
  'obj_area01_billboard.gltf',
  'banners_obj_area01.gltf',
  'screens_obj_area01.gltf',

  //area01 (avatars, control panel)
  'obj_area01_podium.gltf',
  'obj_area01_filters.gltf',
  'obj_area01_avatars.gltf',

  //area02 (space base)
  //area02 (envrionment objects)
  'obj_area02_bin.gltf',
  'obj_area02_borders.gltf',
  'obj_area02_decoration.gltf',
  'obj_area02_fence.gltf',
  'obj_area02_ground.gltf',
  'obj_area02_light.gltf',
  'obj_area02_lines.gltf',
  'obj_area02_plant.gltf',
  'obj_area02_sign.gltf',
  'obj_area02_stone.gltf',
  'obj_area02_tower.gltf',
  'obj_area02_transmitter.gltf',
  'obj_area02_planting.gltf',

  //area02 (interactive objects)
  'obj_area02_bench.gltf',
  'obj_area02_lamp.gltf',
  'obj_area02_teleport.gltf',

  //area02 (screens)
  'obj_area02_banner.gltf',
  'obj_area02_billboard.gltf',
  'obj_area02_screen.gltf',
  'banners_obj_area02.gltf',
  'screens_obj_area02.gltf',

  //area02 (npc)
  // 'npc_spider_locators.gltf',

  //area03 (tech lab)
  //area03 (environment objects)
  'obj_area03_arc.gltf',
  'obj_area03_borders.gltf',
  'obj_area03_decoration.gltf',
  'obj_area03_fence.gltf',
  'obj_area03_ground.gltf',
  'obj_area03_lab01.gltf',
  'obj_area03_lab02.gltf',
  'obj_area03_lab04.gltf',
  'obj_area03_lab05.gltf',
  'obj_area03_lab06.gltf',
  'obj_area03_lab07.gltf',
  'obj_area03_lab08.gltf',
  'obj_area03_lab09.gltf',
  'obj_area03_light.gltf',
  'obj_area03_plant.gltf',
  'obj_area03_platform.gltf',
  'obj_area03_satellite.gltf',
  'obj_area03_sign.gltf',
  'obj_area03_tower.gltf',

  //area03 (interactive objects)
  'obj_area03_sofa.gltf',
  'obj_area03_spider.gltf',
  // 'obj_area03_crystals.gltf',
  'obj_area03_vacuum.gltf',

  //area03 (screens)
  'obj_area03_banner.gltf',
  'obj_area03_billboard.gltf',
  'obj_area03_screen.gltf',
  'banners_obj_area03.gltf',
  'screens_obj_area03.gltf',

  //area03 (npc)
  'npc_android_locators.gltf',

  //area04 (governance)
  //area04 (environment objects)
  'obj_area04_borders.gltf',
  'obj_area04_bridge.gltf',
  'obj_area04_bush.gltf',
  'obj_area04_fence.gltf',
  'obj_area04_ground.gltf',
  'obj_area04_light.gltf',
  'obj_area04_river.gltf',
  'obj_area04_sign.gltf',
  'obj_area04_stones.gltf',
  'obj_area04_tiles.gltf',
  'obj_area04_toro.gltf',
  'obj_area04_tower.gltf',

  //area04 (interactive objects)
  'obj_area04_bench.gltf',
  'obj_area04_lantern.gltf',
  'obj_area04_willow.gltf',
  'obj_area04_torch.gltf',
  'obj_area04_feed.gltf',

  //area04 (screens)
  'obj_area04_banner.gltf',
  'obj_area04_billboard.gltf',
  'obj_area04_screen.gltf',
  'banners_obj_area04.gltf',
  'screens_obj_area04.gltf',
  'obj_area04_governance.gltf',
  'screens_governance_area04.gltf',

  //area04 (npc)
  'npc_fish_locators.gltf',

  //area05 (rewards)
  //area05 (environment objects)
  'obj_area05_ground.gltf',
  'obj_area05_atom.gltf',
  'obj_area05_claw.gltf',
  'obj_area05_fence.gltf',
  'obj_area05_floor.gltf',
  'obj_area05_ground.gltf',
  'obj_area05_lab.gltf',
  'obj_area05_satellite.gltf',
  'obj_area05_sign.gltf',
  'obj_area05_stairs.gltf',

  //area05 (interactive objects)
  'obj_area05_superhero.gltf',

  //rooms
  'obj_rooms_locators.gltf',

  //room01 (town hall)
  //room01 (interior objects)
  'obj_room01_stairs.gltf',
  'obj_room01_speaker.gltf',
  'obj_room01_plant.gltf',
  'obj_room01_lamp.gltf',
  'obj_room01_bin.gltf',
  'obj_room01_sign.gltf',
  'obj_room01_books.gltf',
  'obj_room01_ltable.gltf',
  'obj_room01_pill.gltf',
  'obj_room01_projector.gltf',
  'obj_room01_board.gltf',
  'obj_room01_curtains.gltf',
  'obj_room01_wall.gltf',

  //room01 (interactive objects)
  'obj_room01_sofa.gltf',
  'obj_room01_puffer.gltf',

  //room01 (screens)
  'obj_room01_screen.gltf',
  'screens_obj_room01.gltf',

  //room01 (npc)
  'obj_room01_librarian.gltf',

  //room02 (help center)
  //room02 (interior objects)
  'obj_room02_bin.gltf',
  'obj_room02_board.gltf',
  'obj_room02_books.gltf',
  'obj_room02_bookshelf.gltf',
  'obj_room02_chair.gltf',
  'obj_room02_lamp.gltf',
  'obj_room02_chandelier.gltf',
  'obj_room02_microscope.gltf',
  'obj_room02_pill.gltf',
  'obj_room02_plant.gltf',
  'obj_room02_sign.gltf',
  'obj_room02_table.gltf',

  //room02 (interactive objects)
  'obj_room02_sofa.gltf',

  //room02 (screens)
  'obj_room02_screen.gltf',
  'screens_obj_room02.gltf',

  //room02 (npc)
  'npc_assistant_locators.gltf',
  'obj_room02_assistant.gltf',
  'npc_librarian_locators.gltf',
  'obj_room02_librarian.gltf',

  //room03 (war room)
  //room03 (interior objects)
  'obj_room03_war.gltf',
  'obj_room03_bin.gltf',
  'obj_room03_board.gltf',
  'obj_room03_lamp.gltf',
  'obj_room03_pc.gltf',
  'obj_room03_sign.gltf',
  'obj_room03_stand.gltf',
  'obj_room03_tv.gltf',
  'obj_room03_war.gltf',
  'obj_room03_plant.gltf',
  'obj_room03_speaker.gltf',

  //room03 (interactive objects)
  'obj_room03_sofa.gltf',
  'obj_room03_puffer.gltf',

  //room03 (screens)
  'obj_room03_screen.gltf',
  'screens_obj_room03.gltf',
  'obj_room03_governance.gltf',
  'screens_governance_room03.gltf',

  //room03 (npc)
  'obj_room03_librarian.gltf',

  //room04 (creator hall)
  //room04 (interior objects)
  'obj_room04_bin.gltf',
  'obj_room04_board.gltf',
  'obj_room04_fence.gltf',
  'obj_room04_lamp.gltf',
  'obj_room04_lstairs.gltf',
  'obj_room04_plant.gltf',
  'obj_room04_sign.gltf',
  'obj_room04_stand.gltf',

  //room04 (interactive objects)
  'obj_room04_sofa.gltf',

  //room04 (screens)
  'obj_room04_screen.gltf',
  'screens_obj_room04.gltf',

  //room04 (estates)
  'obj_room04_estates.gltf',

  //room04 (avatars)
  'obj_room04_podium.gltf',

  //room04 (npc)
  'obj_room04_librarian.gltf',

  //room05 (museum)
  //room05 (interior objects)
  'obj_room05_bin.gltf',
  'obj_room05_book.gltf',
  'obj_room05_curtains.gltf',
  'obj_room05_date.gltf',
  'obj_room05_discord.gltf',
  'obj_room05_floppy.gltf',
  'obj_room05_lamp.gltf',
  'obj_room05_ltable.gltf',
  'obj_room05_mstairs.gltf',
  'obj_room05_pc.gltf',
  'obj_room05_pencil.gltf',
  'obj_room05_pill.gltf',
  'obj_room05_plant.gltf',
  'obj_room05_projector.gltf',
  'obj_room05_sign.gltf',
  'obj_room05_timeline.gltf',
  'obj_room05_wall.gltf',

  //room05 (interactive objects)
  'obj_room05_sofa.gltf',
  'obj_room05_seat.gltf',
  'obj_room05_puffer.gltf',

  //room05 (screens)
  'obj_room05_screen.gltf',
  'screens_obj_room05.gltf',
  'frames_obj_room05.gltf',

  //room05 (npc)
  'obj_room05_librarian.gltf',

  //room06 (coffee space)
  //room06 (interior objects)
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
  'obj_room06_events.gltf',

  //room06 (npc)
  'obj_room06_librarian.gltf',

  //room07 (atom space)
  //room07 (interior objects)
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
  'obj_room07_events.gltf',

  //room07 (npc)
  'obj_room07_librarian.gltf',

  //room07 (npc)
  'obj_room07_librarian.gltf',

  //room08 (gear space)
  //room08 (interior objects)
  'obj_room08_bin.gltf',
  'obj_room08_board.gltf',
  'obj_room08_box.gltf',
  'obj_room08_btable.gltf',
  'obj_room08_can.gltf',
  'obj_room08_chandelier.gltf',
  'obj_room08_chemical.gltf',
  'obj_room08_claw.gltf',
  'obj_room08_container.gltf',
  'obj_room08_cooler.gltf',
  'obj_room08_floppy.gltf',
  'obj_room08_lamp.gltf',
  'obj_room08_pc.gltf',
  'obj_room08_pencil.gltf',
  'obj_room08_pill.gltf',
  'obj_room08_plant.gltf',
  'obj_room08_sign.gltf',
  'obj_room08_stack.gltf',
  'obj_room08_wrench.gltf',

  //room08 (interactive objects)
  'obj_room08_seat.gltf',
  'obj_room08_sofa.gltf',

  //room08 (screens)
  'obj_room08_screen.gltf',
  'screens_obj_room08.gltf',

  //room08 (events)
  'obj_room08_events.gltf',

  //room08 (npc)
  'obj_room08_librarian.gltf',

  //room09 (star space)
  //room09 (interior objects)
  'obj_room09_board.gltf',
  'obj_room09_clock.gltf',
  'obj_room09_globe.gltf',
  'obj_room09_hand.gltf',
  'obj_room09_plant.gltf',
  'obj_room09_sign.gltf',
  'obj_room09_stargazer.gltf',
  'obj_room09_workbench.gltf',

  //room09 (interactive objects)
  'obj_room09_seat.gltf',

  //room09 (screens)
  'obj_room09_screen.gltf',
  'screens_obj_room09.gltf',

  //room09 (events)
  'obj_room09_events.gltf',

  //room09 (npc)
  'obj_room09_librarian.gltf',

  //room10 (worlds)
  'worlds_screen_locators.gltf'
]

export const configsToMerge: IExtraLocatorData[][] = [
  screenConfigs,
  discordScreenConfigs,
  metricsScreenConfigs,
  postersConfigs,
  plazaMenuConfigs,
  mannequinConfigs
]
