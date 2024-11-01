export const entityList = {
  treeList: [
    'obj_pine01.112',
    'obj_pine01.113',
    'obj_pine02.109',
    'obj_pine02.115',
    'obj_pine02.117',
    'obj_pine02.121',
    'obj_pine01.104',
    'obj_pine01.106',
    'obj_pine01.107',
    'obj_pine02.103',
    'obj_pine02.108',
    'obj_pine02.120'
  ],
  jugList: ['obj_vase.101', 'obj_vase.102', 'obj_vase.103'],
  waterList: ['obj_waterfall.101', 'obj_waterfall.102', 'obj_waterfall.103', 'obj_fountain.001'],
  androidList: 1,
  lampList: 5,
  platformList: 9,
  labList: 9,
  objSpiderList: 9,
  npcSpiderList: 9,
  teleportList: 10,
  crystalList: 10,
  lanternList: 8,
  fishList: 25
}

const baseSoundPath = 'sounds/'

export const soundsPath = {
  voiceNPC: `${baseSoundPath}npc_astronaut_talking.mp3`,
  voiceAndroid: `${baseSoundPath}big_robot_talking.mp3`,
  soundFountain: `${baseSoundPath}sound_water_fountain.mp3`,
  soundSpider: `${baseSoundPath}robot_spider_walks.mp3`,
  compliteQuest: `${baseSoundPath}quest_completion_sound.mp3`,
  pickUpSeed: `${baseSoundPath}pick_up_seed.mp3`,
  growTree: `${baseSoundPath}sound_growing_tree.mp3`,
  updateTask: `${baseSoundPath}sound_updating_current_task.mp3`,
  teleportTurnOnAttempt: `${baseSoundPath}attempt_to_turn_on_teleport.mp3`,
  teleportTurnOn: `${baseSoundPath}sound_activation_of_teleport.mp3`,
  collectCrystal: `${baseSoundPath}collect_crystal.mp3`,
  collectStick: `${baseSoundPath}pick_up_charging_stick.mp3`,
  fireLight: `${baseSoundPath}chinese_flashlight_activated.mp3`,
  lavalampOnAttempt: `${baseSoundPath}shaking_lava_lamp.mp3`,
  lavalampOn: `${baseSoundPath}sound_working_lava_lamp.mp3`,
  pickUpFeed: `${baseSoundPath}pick_up_fish_food.mp3`,
  useFeed: `${baseSoundPath}throw_fish_food_into_water.mp3`,
  spiderPlatform: `${baseSoundPath}returning_spider_to_nest.mp3`,
  pickUpSpider: `${baseSoundPath}spider_caught_hands.mp3`,
  firefliesTurnOnAttempt: `${baseSoundPath}push_the_firefly.mp3`,
  firefliesTurnOn: `${baseSoundPath}firefly_woke_up.mp3`,
  waterTree: `${baseSoundPath}water_tree_from_jug.mp3`,
  fillJug: `${baseSoundPath}fill_jug_with_water.mp3`,
  pickUpJug: `${baseSoundPath}take_jug.mp3`,
  eraseGraffiti: `${baseSoundPath}painted_over_graffiti.mp3`,
  collectTrash: `${baseSoundPath}collecting_trash.mp3`,
  pickUpCoin: `${baseSoundPath}coin.mp3`
}

export const npcSpawnPoint = [80, 0.75, 75]

export const NPC_MODEL = 'models/npc_astronaut.gltf'
export const NPC_DIALOG_RADIUS = 7

export const npcfollowPathPoint = [
  [90, 1, 90],
  [85, 1, 90],
  [85, 1, 85],
  [90, 1, 85]
]

export const dailyQuestDialogMap = new Map([
  [1, 0],
  [2, 5],
  [3, 9],
  [4, 14],
  // [5, 17],
  [6, 20],
  [7, 23],
  [8, 26],
  [9, 29]
])

// for debugmenu
export const testDailyQuestDialogMap = new Map([
  [1, 0], // ready
  [2, 5], // ready
  [3, 9], // ready
  [4, 14], // ready
  [5, 17],
  [6, 20], // ready
  [7, 23], // ready
  [8, 26], // ready
  [9, 29] // ready
])

export const questDialogMap = new Map([
  [1, 0],
  [2, 4],
  [3, 10],
  [4, 15],
  [5, 21]
])

export const questDialogDay2Map = new Map([
  [1, 0],
  [2, 4],
  [3, 12],
  [4, 20],
  [5, 28],
  [6, 35]
])

export const coinsNumberAndPrice = {
  coinNumber: 120,
  coinPrice: 1,
  maxDayCoin: 60
}

export const coinsList = new Map([
  [1, 1],
  [2, 5],
  [3, 1],
  [4, 1],
  [5, 1]
])

export const questPerDay = 1
export const questDailyPrice = 100

export const questDayList = new Map([
  [0, dailyQuestDialogMap],
  [1, questDialogMap],
  [2, questDialogDay2Map]
])

export const questNamePointer = new Map([
  ['quest1', { day: 1, pointer: 1, revard: 0, order: 1 }],
  ['quest2', { day: 1, pointer: 2, revard: 100, order: 2 }],
  ['quest3', { day: 1, pointer: 3, revard: 100, order: 3 }],
  ['quest4', { day: 1, pointer: 4, revard: 100, order: 4 }],
  ['quest5', { day: 1, pointer: 5, revard: 100, order: 5 }],
  ['quest6', { day: 2, pointer: 1, revard: 100, order: 6 }],
  ['quest7', { day: 2, pointer: 2, revard: 100, order: 7 }],
  ['quest8', { day: 2, pointer: 3, revard: 100, order: 8 }],
  ['quest9', { day: 2, pointer: 4, revard: 100, order: 9 }],
  ['quest10', { day: 2, pointer: 5, revard: 100, order: 10 }],
  ['quest11', { day: 2, pointer: 6, revard: 100, order: 11 }]
])

export const rewardList = new Map([
  // [1, { price: 40, modelName: 'obj_reward01.001', name: "Costume" }] example
  [
    1,
    {
      price: 10,
      modelName: 'obj_superhero01.001',
      name: 'FluxArt Pullover',
      blockchain_id: 2,
      collection: '0x25a1d66891d44cdf7b8d45802489c1dea7aadf8b'
    }
  ],
  [
    2,
    {
      price: 20,
      modelName: 'obj_superhero02.001',
      name: 'FluxArt Pants',
      blockchain_id: 0,
      collection: '0x25a1d66891d44cdf7b8d45802489c1dea7aadf8b'
    }
  ],
  [
    3,
    {
      price: 30,
      modelName: 'obj_superhero03.001',
      name: 'FluxArt Hat',
      blockchain_id: 1,
      collection: '0x25a1d66891d44cdf7b8d45802489c1dea7aadf8b'
    }
  ],
  [
    4,
    {
      price: 40,
      modelName: 'obj_superhero04.001',
      name: 'FluxArt Shoes',
      blockchain_id: 3,
      collection: '0x25a1d66891d44cdf7b8d45802489c1dea7aadf8b'
    }
  ],
  [
    5,
    {
      price: 20000,
      modelName: 'obj_superhero05.001',
      name: 'Superhero Costume',
      blockchain_id: -1,
      collection: '0x25a1d66891d44cdf7b8d45802489c1dea7aadf8b'
    }
  ]
])

export const fishAndPond = [
  ['npc_fish.001', 'npc_fish.002'],
  ['npc_fish.003', 'npc_fish.004'],
  [
    'npc_fish.005',
    'npc_fish.006',
    'npc_fish.007',
    'npc_fish.008',
    'npc_fish.009',
    'npc_fish.010',
    'npc_fish.011',
    'npc_fish.012'
  ],
  [
    'npc_fish.013',
    'npc_fish.014',
    'npc_fish.015',
    'npc_fish.016',
    'npc_fish.017',
    'npc_fish.018',
    'npc_fish.019',
    'npc_fish.020',
    'npc_fish.021',
    'npc_fish.022'
  ],
  ['npc_fish.023', 'npc_fish.024'],
  ['npc_fish.025']
]

export const backEndConfig = {
  active: true
}
