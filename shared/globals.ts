import { TransformType } from '@dcl/sdk/ecs'
import { ICreatedScreen } from './Components/Screen/types'
import { ScreenContentManager } from './Components/ScreenContentManager/ScreenContentManager'
import { ILocationSchema, ISceneInfo } from './types'
import { WebSocketHandler } from './scripts/websocketHandler'

export const wsHandler = new WebSocketHandler()
export const screenContentManager = new ScreenContentManager()

export let screensInstances: { screens: ICreatedScreen[] } = { screens: [] }
export function setScreenInstances(instances: { screens: ICreatedScreen[] }) {
  screensInstances = instances
}

export let sceneLocationsSchema: ILocationSchema = {}
export function setSceneLocationsSchema(schema: ILocationSchema) {
  sceneLocationsSchema = schema
}

export let base_url: string = ''
export function setBaseUrl(uri: string) {
  base_url = uri
}

export let toggleProposalBoard: () => void
export function setToggleProposalBoard(toggle: () => void) {
  toggleProposalBoard = toggle
}

export const teleportToScreenData: {
  screens: { locationId: string; slotId: string; transform: TransformType; name: string }[]
  isVisible: boolean
} = {
  screens: [],
  isVisible: false
}

export const musicState: { isPlay: boolean } = { isPlay: true }

export const teleportToRealmState: {
  locationId: string | null
  isModalVisible: boolean
  realmToTeleport: string | null
  sceneInfo: ISceneInfo | null
} = { locationId: null, isModalVisible: false, realmToTeleport: null, sceneInfo: null }
