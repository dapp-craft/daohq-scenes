import { Entity } from '@dcl/sdk/ecs'
import { IResource, SceneTransform } from '../../types'
import { Screen } from './Screen'

export interface IScreenConfig {
  name: string
  transform: SceneTransform
  supportsStreaming: boolean
  forBooking: boolean
  isRunScreenIntervalMode: boolean
  locationId?: string | undefined
  slotId?: string | number | undefined
  isButtons?: boolean
  format?: string
  description?: string
  defaultResources?: IResource[]
  concaveConfig?: IConcaveScreenConfig
  trigger?: {
    zoneLength?: number
    zoneWidth?: number
    expansionAngle?: number
    groundLevel?: number
    area?: string
  }
}

export interface IConcaveScreenConfig {
  sectionsQuantity: number | undefined
  radius: number | undefined
}
export interface ICreatedScreen {
  screen: Screen
  buttons?: {
    nextButton?: Entity
    prevButton?: Entity
  }
}

export interface ICreatedDiscordScreen {
  screen: Screen
  nextContentInterval?: number
}

export interface ICreatedMetricsScreen {
  screen: Screen
  id: string
}

export interface ILocationsContent {
  [locationId: string]: ISlotsContent
}

export interface ISlotsContent {
  [slotId: string]: IResource[]
}

export interface IBookingItem {
  creation_date: number
  description: string
  duration: number
  event_date: number
  id: number
  location: string
  owner: string
  preview: null | string
  start_date: number
  title: string
  is_live: boolean
}

interface IBookingSocketMsg {
  location: string
  data: IBookingItem[]
}

export enum ScreenFormatEnum {
  image = 'image',
  video = 'video',
  cast_stream = 'streaming'
}
