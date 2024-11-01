import { IBookingItem, ScreenFormatEnum } from './Components/Screen/types'

export enum MENU_TYPE {
  CROWD = 'CROWD',
  EVENT = 'EVENT',
  BEST = 'BEST'
}

export enum LOCATIONS_ID_ENUM {
  TOWN_HALL = 'town_hall',
  WAR_ROOM = 'war_room',
  SHOWROOM = 'showroom',
  GOVERNANCE = 'governance',
  TECHLAB = 'techlab',
  SPACEBASE = 'spacebase',
  HELP_CENTER = 'help_center',
  CREATOR_HALL = 'creator_hall',
  OUTSIDE = 'outside',
  MUSEUM = 'museum',
  WORLDS = 'worlds',
  COFFEE_SPACE = 'coffee_space', //booking
  ATOM_SPACE = 'atom_space', //booking
  GEAR_SPACE = 'gear_space', //booking
  STAR_SPACE = 'star_space' //booking
}

export enum SCREEN_FORMATS {
  STANDARD_WIDE = '16:9',
  STANDARD_NARROW = '9:16',
  ULTRA_WIDE = '21:9',
  RECTANGULAR = '4:3',
  RECTANGULAR_NARROW = '3:4'
}
export interface ISlotStateItem {
  booking: number
  content_index: number
  is_paused: boolean | number | null
  slot: number
}

export const locationTypes = {
  town_hall: 'outdoor',
  war_room: 'outdoor',
  showroom: 'outdoor',
  governance: 'outdoor',
  tech_lab: 'outdoor',
  space_base: 'outdoor',
  help_center: 'outdoor',
  creator_hall: 'outdoor',
  outside: 'outdoor',
  coffee_space_room: 'room', //booking
  atom_space_room: 'room', //booking
  gear_space_room: 'room', //booking
  star_space_room: 'room' //booking
}

export interface ILocationSchema {
  [locationId: string]: {
    type: string
    for_booking: boolean
    slots?: { id: number | string; name: string; supports_streaming: boolean; format: string; trigger: boolean }[]
    discord_screens?: { id: string; description: string }[]
  }
}

export interface IResource {
  booking?: null | number
  content_id?: number
  location_id?: string
  name?: string
  order_id?: number
  preview?: string
  resource_id?: number
  s3_urn: string
  slot?: number
  discord_message_link?: string
  type: ScreenFormatEnum
}

export interface IResourcesLinks {
  url: string
  format: ScreenFormatEnum
}

export interface ILocatorNode {
  name: string
  translation: number[]
  scale?: number[]
  rotation?: number[]
  extras?: IConfigExtras
}

export interface IConfigExtras {
  locationId?: string
  slotId?: string | number
  isButtons?: boolean
  format?: string
  specification?: string
  concaveSectionsQuantity?: number
  concaveRadius?: number
}

export interface SceneTransform {
  position?: {
    x: number
    y: number
    z: number
  }
  rotation?: {
    x: number
    y: number
    z: number
    w: number
  }
  scale?: {
    x: number
    y: number
    z: number
  }
}

export interface IExtraLocatorData {
  name: string
  transform?: SceneTransform
  extras?: { [key: string]: object | string | number | boolean | undefined }
}

export interface ISceneInfo {
  for_booking: boolean | number
  id: string
  preview: null | string
  scene: string
  type: string
}

export interface IPosterInfo {
  closestBooking: IBookingItem | null
  sceneInfo: ISceneInfo | null
}
