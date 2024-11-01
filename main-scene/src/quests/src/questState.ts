import { Entity } from '@dcl/sdk/ecs'
import { day1 } from './dayOneDialogs'
import { day2 } from './dayTwoDialogs'
import { daily } from './dailyDialogs'

interface DialogState {
  pointer: number
  todaysDaily: Array<number>
  currentDaily: number
  questUiHudVisible: boolean
  uiText: uiText
  dialog: any
  questInputValue: string
  myQuest: any
  interactedAI: boolean
  androidAlive: boolean
  androidAnimationStarted: boolean
  teleportActive: boolean
  isTeleportFromStory: boolean
  isItFirstTeleport: boolean
  questRanadom: number
}

interface uiText {
  text: string
  counter?: number
  amount?: number
}

interface UserData {
  userData: {
    success: boolean
    data: {
      last_quest: {
        quest: string
        order: number
      } | null
      day: number | null
      today_daily_quests: number | null
      today_coins: number[]
    }
  }
}

interface QuestReward {
  rewardUi: boolean
  rewardReady: boolean
  claimedWindow: boolean
  userRewards: Array<number>
  claimUIStatus: boolean
  text: any
  rewardNumber: number
  closeButtonReady: boolean
  rewardPending: Boolean
}

interface CoinState {
  activate: boolean
  uiCouter: number
  availableCoins: number[]
  coinMap: Map<any, any>
}

export let dialogState: DialogState = {
  pointer: 0,
  todaysDaily: [],
  currentDaily: 0,
  questRanadom: 1,
  questUiHudVisible: false,
  uiText: { text: '' },
  dialog: day1,
  questInputValue: '',
  myQuest: undefined,
  interactedAI: true,
  androidAlive: false,
  androidAnimationStarted: false,
  teleportActive: true,
  isTeleportFromStory: true,
  isItFirstTeleport: false
}

export let entityState = {
  takenItems: new Array<Entity>(),
  robots: new Array<Entity>(),
  trash: new Array<Entity>()
  // graffiti: new Array<Entity>,
}

export let selectedEntityState = {
  treeData: new Array<any>(),
  questEntityTrees: new Array<any>(),
  jug: new Array<any>(),
  water: new Array<any>(),
  earth: new Array<any>(),
  seeds: new Array<Entity>(),
  crystals: new Array<Entity>(),
  station: new Array<Entity>(),
  spiders: new Array<Entity>(),
  spidersObj: new Array<Entity>(),
  teleport: new Array<Entity>(),
  lavaLamp: new Array<Entity>(),
  platform: new Array<Entity>(),
  pond: new Array<Entity>(),
  fish: new Array<Entity>(),
  fishMap: new Map(),
  android: new Array<Entity>(),
  lanterns: new Array<Entity>(),
  match: new Array<Entity>(),
  feed: new Array<Entity>(),
  fireflies: new Array<Entity>(),
  coins: new Array<Entity>(),
  graffiti: new Map(),
  rwave: new Array(),
  stickers: new Map(),
  vacuum: new Array<Entity>(),
  spray: new Array<Entity>()
}

export const entityScale: Map<string, any> = new Map([])

export const questEntitySaveState: Map<Entity, any> = new Map()

export const questDayMap = new Map([
  [0, daily],
  [1, day1],
  [2, day2]
])

export const testQuestDayMap = new Map([
  [0, daily],
  [1, day1],
  [2, day2]
])

export const coinState: CoinState = {
  activate: true,
  uiCouter: 0,
  availableCoins: [],
  coinMap: new Map()
}

export const questReward: QuestReward = {
  rewardUi: false,
  rewardReady: false,
  claimedWindow: false,
  claimUIStatus: false,
  userRewards: [],
  text: '',
  rewardNumber: 0,
  closeButtonReady: true,
  rewardPending: false
}

export const backEndState: UserData = {
  userData: {
    success: false,
    data: {
      last_quest: null || { quest: '', order: 0 },
      day: null,
      today_daily_quests: null,
      today_coins: []
    }
  }
}
export const questModels = new Map()

export const fixedTeleportList: Array<Entity> = []
