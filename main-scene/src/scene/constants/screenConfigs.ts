import { IExtraLocatorData, LOCATIONS_ID_ENUM, SCREEN_FORMATS } from 'daohq-shared/types'
import { AREA_TRIGGER_ID } from './areaConfig'

export const screenConfigs: IExtraLocatorData[] = [
  //area01 (showroom)
  {
    name: 'screen_showroom1.001',
    transform: { scale: { x: 4, y: 2.49, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.SHOWROOM,
      slotId: 1,
      description: 'Showroom Screen',
      for_booking: true,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        zoneWidth: 8,
        zoneLength: 7.5,
        expansionAngle: 45,
        groundLevel: 0.3
      }
    }
  },
  //area02 (space base)
  {
    name: 'screen_spacebase1.001',
    transform: { scale: { x: 4, y: 2.49, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.SPACEBASE,
      slotId: 2,
      description: 'Space Base Screen',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        zoneWidth: 8,
        zoneLength: 8.5,
        expansionAngle: 5,
        groundLevel: 0.3
      }
    }
  },
  //area03 (tech lab)
  {
    name: 'screen_techlab1.001',
    transform: { scale: { x: 4, y: 2.49, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.TECHLAB,
      slotId: 3,
      description: 'Tech Lab Screen',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        zoneWidth: 7,
        zoneLength: 7,
        expansionAngle: 15,
        groundLevel: 0.3
      }
    }
  },
  //area04 (governance)
  {
    name: 'screen_governance1.001',
    transform: { scale: { x: 4, y: 2.49, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.GOVERNANCE,
      slotId: 4,
      description: 'Governance Screen',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        zoneWidth: 8.5,
        zoneLength: 8,
        expansionAngle: 25,
        groundLevel: 0.37
      }
    }
  },
  //room01 (town hall)
  {
    name: 'screen_town_hall1',
    transform: { scale: { x: 19.2, y: 10.5, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.TOWN_HALL,
      slotId: 5,
      concaveSectionsQuantity: 15,
      concaveRadius: 16.9,
      description: 'Town Hall Screen',
      for_booking: true,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        area: AREA_TRIGGER_ID.TOWN_HALL
      }
    }
  },
  //room02 (help center)
  {
    name: 'screen_help_center1.001',
    transform: { scale: { x: 4.5, y: 2.8, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.HELP_CENTER,
      slotId: 6,
      concaveRadius: 8,
      concaveSectionsQuantity: 6,
      description: 'Help Center Screen',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        zoneWidth: 6,
        zoneLength: 8,
        expansionAngle: 15,
        groundLevel: 16.37
      }
    }
  },
  //room03 (war room)
  {
    name: 'screen_war_room7.007',
    transform: { scale: { x: 7, y: 4.25, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.WAR_ROOM,
      slotId: 13,
      concaveRadius: 14,
      concaveSectionsQuantity: 6,
      description: 'War Room Screen',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        zoneWidth: 8.5,
        zoneLength: 8,
        expansionAngle: 5,
        groundLevel: 15.5
      }
    }
  },
  //room04 (creator hall)
  {
    name: 'screen_creator_hall1.001',
    transform: { scale: { x: 3.9, y: 2.49, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.CREATOR_HALL,
      slotId: 14,
      concaveRadius: 6.5,
      concaveSectionsQuantity: 6,
      description: 'Creator Hall Screen1',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        zoneWidth: 4.5,
        zoneLength: 5,
        expansionAngle: -10,
        groundLevel: 16.43
      }
    }
  },
  {
    name: 'screen_creator_hall2.002',
    transform: { scale: { x: 3.9, y: 2.49, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.CREATOR_HALL,
      slotId: 15,
      concaveRadius: 6.5,
      concaveSectionsQuantity: 6,
      description: 'Creator Hall Screen2',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        zoneWidth: 4.5,
        zoneLength: 5,
        expansionAngle: -10,
        groundLevel: 16.43
      }
    }
  },
  {
    name: 'screen_creator_hall3.003',
    transform: { scale: { x: 3.9, y: 2.49, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.CREATOR_HALL,
      slotId: 16,
      concaveRadius: 6.5,
      concaveSectionsQuantity: 6,
      description: 'Creator Hall Screen3',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        zoneWidth: 8.5,
        zoneLength: 5,
        expansionAngle: 5,
        groundLevel: 16.43
      }
    }
  },
  //room05 (museum)
  {
    name: 'screen_museum952.001',
    transform: { scale: { x: 5, y: 3.08, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.MUSEUM,
      concaveRadius: 9,
      concaveSectionsQuantity: 6,
      description: 'Museum Screen 1',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        zoneWidth: 5,
        zoneLength: 9.2,
        groundLevel: 17.5,
        expansionAngle: -6.5
      }
    }
  },
  {
    name: 'screen_museum953.001',
    transform: { scale: { x: 5, y: 3.08, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.MUSEUM,
      concaveRadius: 9,
      concaveSectionsQuantity: 6,
      description: 'Museum Screen 2',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        zoneWidth: 5,
        zoneLength: 9,
        groundLevel: 17.5,
        expansionAngle: -6.2
      }
    }
  },
  {
    name: 'screen_museum954.001',
    transform: { scale: { x: 5, y: 3.08, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.MUSEUM,
      concaveRadius: 9,
      concaveSectionsQuantity: 6,
      description: 'Museum Screen 3',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        zoneWidth: 5,
        zoneLength: 9.2,
        groundLevel: 17.5,
        expansionAngle: -6.5
      }
    }
  },
  {
    name: 'screen_museum955.001',
    transform: { scale: { x: 5, y: 3.08, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.MUSEUM,
      concaveRadius: 9,
      concaveSectionsQuantity: 6,
      description: 'Museum Screen 4',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        zoneWidth: 5,
        zoneLength: 9,
        groundLevel: 17.5,
        expansionAngle: -6.5
      }
    }
  },
  //room06 (coffee space)
  {
    name: 'screen_coffee_space1001.001',
    transform: { scale: { x: 5.88, y: 3.62, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.COFFEE_SPACE,
      slotId: 17,
      concaveRadius: 11,
      concaveSectionsQuantity: 6,
      description: 'Coffee Space Screen',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        area: AREA_TRIGGER_ID.COFFEE_SPACE
      }
    }
  },
  //room07 (atom space)
  {
    name: 'screen_atom_space1101.001',
    transform: { scale: { x: 7, y: 4.25, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.ATOM_SPACE,
      slotId: 18,
      concaveRadius: 14,
      concaveSectionsQuantity: 6,
      description: 'Atom Space Screen',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        area: AREA_TRIGGER_ID.ATOM_SPACE
      }
    }
  },
  //room08 (gear space)
  {
    name: 'screen_gear_space1201.001',
    transform: { scale: { x: 3.9, y: 2.45, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.GEAR_SPACE,
      slotId: 19,
      concaveRadius: 7,
      concaveSectionsQuantity: 6,
      description: 'Gear Space Screen',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        zoneWidth: 6,
        zoneLength: 5,
        expansionAngle: 15,
        groundLevel: 17.25
      }
    }
  },
  //room09 (star space)
  {
    name: 'screen_star_space1301.001',
    transform: { scale: { x: 3.9, y: 2.45, z: 1 } },
    extras: {
      locationId: LOCATIONS_ID_ENUM.STAR_SPACE,
      slotId: 20,
      concaveRadius: 7,
      concaveSectionsQuantity: 6,
      description: 'Star Space Screen',
      for_booking: false,
      supports_streaming: false,
      isRunScreenIntervalMode: true,
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE,
      trigger: {
        zoneWidth: 6,
        zoneLength: 4,
        expansionAngle: 15,
        groundLevel: 17.25
      }
    }
  },
  {
    name: 'screen_showroom103.001',
    extras: {
      description: 'Showroom Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_showroom103.002',
    extras: {
      description: 'Showroom Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_showroom103.003',
    extras: {
      description: 'Showroom Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_showroom103.004',
    extras: {
      description: 'Showroom Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_showroom103.005',
    extras: {
      description: 'Showroom Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_showroom103.006',
    extras: {
      description: 'Showroom Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_showroom103.007',
    extras: {
      description: 'Showroom Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_showroom103.008',
    extras: {
      description: 'Showroom Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_showroom101.001',
    extras: {
      description: 'Showroom Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_showroom101.002',
    extras: {
      description: 'Showroom Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_showroom101.003',
    extras: {
      description: 'Showroom Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_showroom101.004',
    extras: {
      description: 'Showroom Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_showroom101.005',
    extras: {
      description: 'Showroom Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_showroom101.006',
    extras: {
      description: 'Showroom Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_showroom101.007',
    extras: {
      description: 'Showroom Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_showroom101.008',
    extras: {
      description: 'Showroom Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_showroom101.009',
    extras: {
      description: 'Showroom Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_showroom101.010',
    extras: {
      description: 'Showroom Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_showroom101.011',
    extras: {
      description: 'Showroom Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_showroom101.012',
    extras: {
      description: 'Showroom Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_showroom102.001',
    extras: {
      description: 'Showroom Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_showroom102.002',
    extras: {
      description: 'Showroom Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_showroom102.003',
    extras: {
      description: 'Showroom Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_showroom102.004',
    extras: {
      description: 'Showroom Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_showroom102.005',
    extras: {
      description: 'Showroom Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_showroom102.006',
    extras: {
      description: 'Showroom Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_showroom102.007',
    extras: {
      description: 'Showroom Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_showroom102.008',
    extras: {
      description: 'Showroom Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_showroom102.009',
    extras: {
      description: 'Showroom Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_showroom102.010',
    extras: {
      description: 'Showroom Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_showroom102.011',
    extras: {
      description: 'Showroom Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_showroom102.012',
    extras: {
      description: 'Showroom Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_spacebase201.001',
    extras: {
      description: 'Spacebase Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_spacebase202.001',
    extras: {
      description: 'Spacebase Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_spacebase201.002',
    extras: {
      description: 'Spacebase Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_spacebase201.003',
    extras: {
      description: 'Spacebase Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_spacebase201.004',
    extras: {
      description: 'Spacebase Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_spacebase201.005',
    extras: {
      description: 'Spacebase Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_spacebase201.006',
    extras: {
      description: 'Spacebase Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_spacebase202.002',
    extras: {
      description: 'Spacebase Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_spacebase202.003',
    extras: {
      description: 'Spacebase Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_spacebase202.004',
    extras: {
      description: 'Spacebase Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_spacebase202.005',
    extras: {
      description: 'Spacebase Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_spacebase202.006',
    extras: {
      description: 'Spacebase Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_spacebase201.007',
    extras: {
      description: 'Spacebase Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_spacebase201.008',
    extras: {
      description: 'Spacebase Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_spacebase201.009',
    extras: {
      description: 'Spacebase Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_spacebase202.007',
    extras: {
      description: 'Spacebase Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_spacebase202.008',
    extras: {
      description: 'Spacebase Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_spacebase202.009',
    extras: {
      description: 'Spacebase Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_spacebase203.001',
    extras: {
      description: 'Spacebase Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_spacebase203.002',
    extras: {
      description: 'Spacebase Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_spacebase203.003',
    extras: {
      description: 'Spacebase Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_spacebase203.004',
    extras: {
      description: 'Spacebase Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_spacebase203.005',
    extras: {
      description: 'Spacebase Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_spacebase203.006',
    extras: {
      description: 'Spacebase Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_techlab301.001',
    extras: {
      description: 'Tech Lab Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_techlab301.002',
    extras: {
      description: 'Tech Lab Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_techlab301.003',
    extras: {
      description: 'Tech Lab Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_techlab301.004',
    extras: {
      description: 'Tech Lab Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_techlab301.005',
    extras: {
      description: 'Tech Lab Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_techlab301.006',
    extras: {
      description: 'Tech Lab Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_techlab302.001',
    extras: {
      description: 'Tech Lab Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_techlab302.002',
    extras: {
      description: 'Tech Lab Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_techlab302.003',
    extras: {
      description: 'Tech Lab Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_techlab302.004',
    extras: {
      description: 'Tech Lab Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_techlab302.005',
    extras: {
      description: 'Tech Lab Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_techlab302.006',
    extras: {
      description: 'Tech Lab Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_techlab301.007',
    extras: {
      description: 'Tech Lab Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_techlab301.008',
    extras: {
      description: 'Tech Lab Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_techlab301.009',
    extras: {
      description: 'Tech Lab Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_techlab301.010',
    extras: {
      description: 'Tech Lab Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_techlab301.011',
    extras: {
      description: 'Tech Lab Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_techlab302.007',
    extras: {
      description: 'Tech Lab Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_techlab302.008',
    extras: {
      description: 'Tech Lab Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_techlab302.009',
    extras: {
      description: 'Tech Lab Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_techlab302.010',
    extras: {
      description: 'Tech Lab Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_techlab302.011',
    extras: {
      description: 'Tech Lab Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_techlab301.012',
    extras: {
      description: 'Tech Lab Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_techlab302.012',
    extras: {
      description: 'Tech Lab Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_techlab303.001',
    extras: {
      description: 'Tech Lab Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_techlab303.002',
    extras: {
      description: 'Tech Lab Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_techlab303.003',
    extras: {
      description: 'Tech Lab Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_techlab303.004',
    extras: {
      description: 'Tech Lab Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_governance401.001',
    extras: {
      description: 'Governance Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_governance402.001',
    extras: {
      description: 'Governance Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_governance401.002',
    extras: {
      description: 'Governance Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_governance402.002',
    extras: {
      description: 'Governance Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_governance401.003',
    extras: {
      description: 'Governance Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_governance402.003',
    extras: {
      description: 'Governance Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_governance401.004',
    extras: {
      description: 'Governance Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_governance402.004',
    extras: {
      description: 'Governance Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_governance401.005',
    extras: {
      description: 'Governance Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_governance402.005',
    extras: {
      description: 'Governance Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_governance401.006',
    extras: {
      description: 'Governance Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_governance402.006',
    extras: {
      description: 'Governance Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_governance401.007',
    extras: {
      description: 'Governance Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_governance402.007',
    extras: {
      description: 'Governance Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_governance401.008',
    extras: {
      description: 'Governance Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_governance402.008',
    extras: {
      description: 'Governance Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_governance401.009',
    extras: {
      description: 'Governance Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_governance402.009',
    extras: {
      description: 'Governance Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_governance401.010',
    extras: {
      description: 'Governance Banner 1',
      screenFormat: SCREEN_FORMATS.STANDARD_NARROW
    }
  },
  {
    name: 'screen_governance402.010',
    extras: {
      description: 'Governance Banner 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR_NARROW
    }
  },
  {
    name: 'screen_governance403.001',
    extras: {
      description: 'Governance Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_governance403.002',
    extras: {
      description: 'Governance Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_governance403.003',
    extras: {
      description: 'Governance Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_governance403.004',
    extras: {
      description: 'Governance Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_governance403.005',
    extras: {
      description: 'Governance Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_governance403.006',
    extras: {
      description: 'Governance Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_governance403.007',
    extras: {
      description: 'Governance Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_governance403.008',
    extras: {
      description: 'Governance Banner 3',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  //room08
  //room09
  //room10
  {
    name: 'screen_pboard404.001',
    extras: {
      locationId: LOCATIONS_ID_ENUM.GOVERNANCE,
      description: 'Pboard Screen',
      screenFormat: SCREEN_FORMATS.STANDARD_WIDE
    }
  },
  {
    name: 'screen_museum901.002',
    extras: {
      description: 'Museum DCL date 1',
      screenFormat: SCREEN_FORMATS.ULTRA_WIDE
    }
  },
  {
    name: 'screen_museum902.001',
    extras: {
      description: 'Museum DCL info 1',
      screenFormat: SCREEN_FORMATS.RECTANGULAR
    }
  },
  {
    name: 'screen_museum903.002',
    extras: {
      description: 'Museum DCL date 2',
      screenFormat: SCREEN_FORMATS.ULTRA_WIDE
    }
  },
  {
    name: 'screen_museum904.001',
    extras: {
      description: 'Museum DCL info 2',
      screenFormat: SCREEN_FORMATS.RECTANGULAR
    }
  },
  {
    name: 'screen_museum905.001',
    extras: {
      description: 'Museum DCL info 3',
      screenFormat: SCREEN_FORMATS.RECTANGULAR
    }
  },
  {
    name: 'screen_museum906.002',
    extras: {
      description: 'Museum DCL date 3',
      screenFormat: SCREEN_FORMATS.ULTRA_WIDE
    }
  },
  {
    name: 'screen_museum907.002',
    extras: {
      description: 'Museum DCL date 4',
      screenFormat: SCREEN_FORMATS.ULTRA_WIDE
    }
  },
  {
    name: 'screen_museum908.001',
    extras: {
      description: 'Museum DCL info 4',
      screenFormat: SCREEN_FORMATS.RECTANGULAR
    }
  },
  {
    name: 'screen_museum909.002',
    extras: {
      description: 'Museum DCL date 5',
      screenFormat: SCREEN_FORMATS.ULTRA_WIDE
    }
  },
  {
    name: 'screen_museum910.001',
    extras: {
      description: 'Museum DCL info 5',
      screenFormat: SCREEN_FORMATS.RECTANGULAR
    }
  },
  {
    name: 'screen_museum911.001',
    extras: {
      description: 'Museum DCL info 6',
      screenFormat: SCREEN_FORMATS.RECTANGULAR
    }
  },
  {
    name: 'screen_museum912.002',
    extras: {
      description: 'Museum DCL date 6',
      screenFormat: SCREEN_FORMATS.ULTRA_WIDE
    }
  },
  {
    name: 'screen_museum913.002',
    extras: {
      description: 'Museum DCL date 7',
      screenFormat: SCREEN_FORMATS.ULTRA_WIDE
    }
  },
  {
    name: 'screen_museum914.001',
    extras: {
      description: 'Museum DCL info 7',
      screenFormat: SCREEN_FORMATS.RECTANGULAR
    }
  },
  {
    name: 'screen_museum915.001',
    extras: {
      description: 'Museum DCL info 8',
      screenFormat: SCREEN_FORMATS.RECTANGULAR
    }
  },
  {
    name: 'screen_museum916.002',
    extras: {
      description: 'Museum DCL date 8',
      screenFormat: SCREEN_FORMATS.ULTRA_WIDE
    }
  },
  {
    name: 'screen_museum917.002',
    extras: {
      description: 'Museum DCL date 9',
      screenFormat: SCREEN_FORMATS.ULTRA_WIDE
    }
  },
  {
    name: 'screen_museum918.001',
    extras: {
      description: 'Museum DCL info 9',
      screenFormat: SCREEN_FORMATS.RECTANGULAR
    }
  },
  {
    name: 'screen_museum919.002',
    extras: {
      description: 'Museum DCL date 10',
      screenFormat: SCREEN_FORMATS.ULTRA_WIDE
    }
  },
  {
    name: 'screen_museum920.001',
    extras: {
      description: 'Museum DCL info 10',
      screenFormat: SCREEN_FORMATS.RECTANGULAR
    }
  },
  {
    name: 'screen_museum921.001',
    extras: {
      description: 'Museum DCL info 11',
      screenFormat: SCREEN_FORMATS.RECTANGULAR
    }
  },
  {
    name: 'screen_museum922.002',
    extras: {
      description: 'Museum DCL date 11',
      screenFormat: SCREEN_FORMATS.ULTRA_WIDE
    }
  }
]
