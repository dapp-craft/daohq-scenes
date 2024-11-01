export enum AREA_TRIGGER_ID {
  NONE = 'NONE',

  //Sound
  SHOWROOM = 'showroom',
  SPACEBASE = 'spacebase',
  TECHLAB = 'techlab',
  GOVERNANCE = 'governance',
  TOWN_HALL = 'town_hall',
  HELP_CENTER = 'help_center',
  WAR_ROOM = 'war_room',
  CREATOR_HALL = 'creator_hall',
  COFFEE_SPACE = 'coffee_space',
  ATOM_SPACE = 'atom_space',
  GEAR_SPACE = 'gear_space',
  STAR_SPACE = 'star_space',
  DELEGATES = 'delegates',
  VOTERS = 'voters',
  PROPOSALS = 'proposals',
  PARTICIPATION = 'participation',
  TREASURY = 'treasury',
  MUSEUM = 'museum',
  OUTSIDE = 'outside',

  //Mannequins
  MARKETPLACE_AREA_1 = 'marketplace_area_1',
  MARKETPLACE_AREA_2 = 'marketplace_area_2',
  MARKETPLACE_AREA_3 = 'marketplace_area_3'
}

export const areaTriggersModels = [
  {
    models: ['obj_road.001'],
    area: AREA_TRIGGER_ID.OUTSIDE
  },
  {
    models: ['obj_ground01.101'],
    area: AREA_TRIGGER_ID.SHOWROOM
  },
  {
    models: ['obj_ground02.201'],
    area: AREA_TRIGGER_ID.SPACEBASE
  },
  {
    models: ['obj_ground03.301'],
    area: AREA_TRIGGER_ID.TECHLAB
  },
  {
    models: ['obj_ground04.401'],
    area: AREA_TRIGGER_ID.GOVERNANCE
  },
  {
    models: ['obj_room.001'],
    area: AREA_TRIGGER_ID.TOWN_HALL
  },
  {
    models: ['obj_room.002'],
    area: AREA_TRIGGER_ID.HELP_CENTER
  },
  {
    models: ['obj_room.003'],
    area: AREA_TRIGGER_ID.WAR_ROOM
  },
  {
    models: ['obj_room.004'],
    area: AREA_TRIGGER_ID.CREATOR_HALL
  },
  {
    models: ['obj_room.005'],
    area: AREA_TRIGGER_ID.MUSEUM
  },
  {
    models: ['obj_room.006'],
    area: AREA_TRIGGER_ID.COFFEE_SPACE
  },
  {
    models: ['obj_room.007'],
    area: AREA_TRIGGER_ID.ATOM_SPACE
  },
  {
    models: ['obj_room.008'],
    area: AREA_TRIGGER_ID.GEAR_SPACE
  },
  {
    models: ['obj_room.009'],
    area: AREA_TRIGGER_ID.STAR_SPACE
  },
  {
    models: ['obj_avatars01.001'],
    area: AREA_TRIGGER_ID.MARKETPLACE_AREA_1
  },
  {
    models: ['obj_avatars02.001'],
    area: AREA_TRIGGER_ID.MARKETPLACE_AREA_2
  },
  {
    models: ['obj_avatars03.001'],
    area: AREA_TRIGGER_ID.MARKETPLACE_AREA_3
  }
]
