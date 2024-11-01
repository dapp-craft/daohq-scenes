import { WearableCategory, Rarity } from '@dcl/schemas/dist/index'
import { CatalogSortBy } from '@dcl/schemas/dist/dapps/catalog'
import { Entity } from '@dcl/sdk/ecs'
import { WearableItem } from 'daohq-shared/marketplaceClient'
import { IBookingItem, ICreatedDiscordScreen, ICreatedMetricsScreen } from 'daohq-shared/Components/Screen/types'
import { LOCATIONS_ID_ENUM } from 'daohq-shared/types'
import { EventPoster } from 'daohq-shared/Components/EventPoster/EventPoster'
import { Vector3 } from '@dcl/sdk/math'
import { SoundManager } from 'daohq-shared/Components/SoundManager'

type ProposalCategoryType = 'poi' | 'catalyst' | 'ban_name' | 'linked_wearables' | 'hiring'

type BiddingType = 'pitch' | 'tender' | 'bid'

type GovernanceType = 'poll' | 'draft' | 'governance'

type GrandsType =
  | 'grant'
  | 'Accelerator'
  | 'Core+Unit'
  | 'Documentation'
  | 'In-World+Content'
  | 'Platform'
  | 'Social+Media+Content'
  | 'Sponsorship'
  | 'legacy'

type ProposalStatusesType = 'pending' | 'active' | 'finished' | 'rejected' | 'passed' | 'out_of_budget' | 'enacted'

type TimeFrameType = 'week' | 'month' | '3months'

export interface IProposalFilterParams {
  type: ProposalCategoryType | BiddingType | GovernanceType | GrandsType | undefined
  status: ProposalStatusesType | undefined
  timeFrame: TimeFrameType | undefined
  limit: number
  offset: number
}

interface IChosenFilterParams {
  sortBy: CatalogSortBy
  category?: WearableCategory
  rarity?: Rarity[]
  isWearableSmart?: boolean
  isOnSale?: boolean
  onlyMinting?: boolean
  onlyListing?: boolean
  minPrice?: string
  maxPrice?: string
}

interface IPaginationParams {
  first: number
  isLoaded: boolean
  skip?: number
}

export interface IMannequins {
  mannequinZoneLimit: number
  mannequinItems: IMannequinItem[]
  wearableForDescr?: WearableItem
}

export interface IMannequinItem {
  avatar: Entity
  podium: Entity
  currentWearable?: WearableItem
}

interface IisVisible {
  npcFilterMenu: boolean
  npcSortByMenu: boolean
  wearableDescriptionMenu: boolean
  teleportSubmenu: boolean
  proposalModal: boolean
  proposalFilterMenu: boolean
  proposalBoard: boolean
  votingConfirmModal: boolean
  votingResultModal: boolean
  proposalsAndEventsPanel: boolean
  teleportMap: boolean
  controlsAndQuestsPanel: boolean
  paginationMsgInShotMenu: boolean
  paginationMsgInBoard: boolean
  votingChoiceModal: boolean
}

export interface IUserData {
  name: string
  tutorialStep: number
  userId: string
  ethAddress: string
  email: string
  avatar: {
    bodyShape: string
    wearables: string[]
    snapshots: {
      body: string
      face256: string
    }
  }
}

export interface IWearableCollectionData {
  chainId: string
  contractAddress: string
  createdAt: number
  creator: string
  firstListedAt: number
  isOnSale: boolean
  name: string
  network: string
  reviewedAt: number
  size: number
  updatedAt: number
  urn: string
}

export interface IProposal {
  id: string
  created_at: string
  updated_at: string
  start_at: string
  finish_at: string
  status: string
  title: string
  description: string
  type: string
  user: string
  configuration: { choices: string[] }
  snapshot_id: string
  snapshot_space: string
  snapshot_proposal: {
    app: string
    author: string
    body: string
    choices: string[]
    created: number
    end: number
    start: number
    snapshot: string
    type: string
    space: { id: string }
  }
  userData: IUserData | null
  votes: object | null
  comments: {
    comments: object[]
    totalComments: number
  }
}

interface IVotingData {
  proposals: IProposal[] | null
  totalProposals: number | null
  selectedProposal: IProposal | null
  selectedProposalDetails: { text: string | null }
  voteValue: number | null
  votingResult: boolean | null
  proposalsShortList: IProposal[] | null
  totalShortListProposals: number | null
  isShortListLoaded: boolean
  isBoardPageLoaded: boolean
}

export interface ITeleportsDataItem {
  coords: { capsule: Vector3 | null; roomPoint: Vector3 | null; lookAt: Vector3 | null }
  capsuleEntity?: Entity
  locationId?: LOCATIONS_ID_ENUM
}
interface ITeleportsData {
  gearSpace: ITeleportsDataItem
  museum: ITeleportsDataItem
  coffeeSpace: ITeleportsDataItem
  creatorHall: ITeleportsDataItem
  spawnPoint: ITeleportsDataItem
  warRoom: ITeleportsDataItem
  starSpace: ITeleportsDataItem
  worlds: ITeleportsDataItem
  atomSpace: ITeleportsDataItem
  helpCenter: ITeleportsDataItem
  townHall: ITeleportsDataItem
}

export interface IBookingInUiList extends IBookingItem {
  userData: IUserData
}

export const filterWearablesParams: IChosenFilterParams = {
  category: undefined,
  rarity: undefined,
  isWearableSmart: undefined,
  isOnSale: undefined,
  onlyMinting: undefined,
  onlyListing: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  sortBy: CatalogSortBy.NEWEST
}

export const paginationMarketParams: IPaginationParams = {
  first: 6,
  skip: 0,
  isLoaded: true
}

export const mannequins: IMannequins = {
  mannequinZoneLimit: 6,
  mannequinItems: []
}

export const isVisible: IisVisible = {
  npcFilterMenu: false,
  npcSortByMenu: false,
  wearableDescriptionMenu: false,
  teleportSubmenu: false,
  proposalModal: false,
  proposalFilterMenu: false,
  proposalBoard: false,
  votingConfirmModal: false,
  votingResultModal: false,
  proposalsAndEventsPanel: true,
  teleportMap: false,
  controlsAndQuestsPanel: true,
  paginationMsgInShotMenu: false,
  paginationMsgInBoard: false,
  votingChoiceModal: false
}

export const votingData: IVotingData = {
  proposals: null,
  totalProposals: null,
  selectedProposal: null,
  selectedProposalDetails: {
    text: null
  },
  voteValue: null,
  votingResult: null,
  proposalsShortList: null,
  totalShortListProposals: null,
  isShortListLoaded: true,
  isBoardPageLoaded: true
}

export const proposalFilterParams: IProposalFilterParams = {
  limit: 8,
  offset: 0,
  status: undefined,
  timeFrame: undefined,
  type: undefined
}

export const shortListFilterParams: IProposalFilterParams = {
  limit: 4,
  offset: 0,
  status: 'active',
  timeFrame: undefined,
  type: undefined
}

export let SOUND_MANAGER: SoundManager = new SoundManager()

export const discordScreensInstances: { screens: ICreatedDiscordScreen[] } = { screens: [] }
export const metricsScreensInstances: { screens: ICreatedMetricsScreen[] } = { screens: [] }

export const allSavedEntity: Map<string, Entity> = new Map()

export const loadingProgress: Array<number> = []

export const proposalsAndEventsUiState: { activeSection: 'proposals' | 'events' } = { activeSection: 'proposals' }

export const eventsData: { liveEvents: IBookingInUiList[] | null } = { liveEvents: null }

export const allEventPosters: EventPoster[] = []

export const teleportsData: ITeleportsData = {
  atomSpace: { coords: { capsule: null, lookAt: null, roomPoint: null }, locationId: LOCATIONS_ID_ENUM.ATOM_SPACE },
  coffeeSpace: { coords: { capsule: null, lookAt: null, roomPoint: null }, locationId: LOCATIONS_ID_ENUM.COFFEE_SPACE },
  creatorHall: { coords: { capsule: null, lookAt: null, roomPoint: null }, locationId: LOCATIONS_ID_ENUM.CREATOR_HALL },
  gearSpace: { coords: { capsule: null, lookAt: null, roomPoint: null }, locationId: LOCATIONS_ID_ENUM.GEAR_SPACE },
  helpCenter: { coords: { capsule: null, lookAt: null, roomPoint: null }, locationId: LOCATIONS_ID_ENUM.HELP_CENTER },
  museum: { coords: { capsule: null, lookAt: null, roomPoint: null }, locationId: LOCATIONS_ID_ENUM.MUSEUM },
  spawnPoint: { coords: { capsule: null, lookAt: null, roomPoint: null } },
  starSpace: { coords: { capsule: null, lookAt: null, roomPoint: null }, locationId: LOCATIONS_ID_ENUM.STAR_SPACE },
  townHall: { coords: { capsule: null, lookAt: null, roomPoint: null }, locationId: LOCATIONS_ID_ENUM.TOWN_HALL },
  warRoom: { coords: { capsule: null, lookAt: null, roomPoint: null }, locationId: LOCATIONS_ID_ENUM.WAR_ROOM },
  worlds: { coords: { capsule: null, lookAt: null, roomPoint: null }, locationId: LOCATIONS_ID_ENUM.WORLDS }
}
