import { NFTCategory } from '@dcl/schemas/dist/dapps/nft-category'
import { toggleNpcMenuVisibility, NPC_MENU_ENUM } from '../ui/modules/marketplaceMenu'
import { triggers, NO_LAYERS, LAYER_1 } from '@dcl-sdk/utils'
import {
  AvatarShape,
  Entity,
  GltfContainer,
  InputAction,
  Schemas,
  Transform,
  engine,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import {
  filterWearablesParams,
  paginationMarketParams,
  mannequins,
  IUserData,
  IWearableCollectionData,
  IMannequinItem
} from '../states/states'
import { useFetch } from 'daohq-shared/scripts'
import { IExtraLocatorData, SceneTransform } from 'daohq-shared/types'
import { NFTSeverClient, WearableItem } from 'daohq-shared/marketplaceClient'
import { AREA_TRIGGER_ID } from './constants/areaConfig'

export const MarketplaceMannequin = engine.defineComponent('marketplaceMannequin', {
  areaId: Schemas.EnumString<AREA_TRIGGER_ID>(AREA_TRIGGER_ID, AREA_TRIGGER_ID.NONE),
  static: Schemas.Boolean,
  visible: Schemas.Boolean
  // wearables: Schemas.Array(Schemas.String),
  // bodyShape: Schemas.String
})

interface ICreateBtn {
  name: string
  transform?: SceneTransform
  entity: Entity
  pathToModel: string
  handler: () => void
}

enum PAGINATION_ENUM {
  PREV = 'prev',
  NEXT = 'next'
}

const nftServerClient = new NFTSeverClient()

const DEFAULT_WEARABLES = [
  'urn:decentraland:off-chain:base-avatars:f_eyes_00',
  'urn:decentraland:off-chain:base-avatars:f_eyebrows_00',
  'urn:decentraland:off-chain:base-avatars:f_mouth_00',
  'urn:decentraland:off-chain:base-avatars:standard_hair',
  'urn:decentraland:off-chain:base-avatars:f_simple_yellow_tshirt',
  'urn:decentraland:off-chain:base-avatars:f_brown_trousers',
  'urn:decentraland:off-chain:base-avatars:bun_shoes'
]

async function getWearables(first?: number, skip?: number): Promise<WearableItem[] | null> {
  return await nftServerClient.getShowroomWearables({
    first: first ? first : paginationMarketParams.first,
    skip: skip ? skip : paginationMarketParams.skip,
    category: NFTCategory.WEARABLE,
    wearableCategory: filterWearablesParams.category,
    rarities: filterWearablesParams.rarity,
    isWearableSmart: filterWearablesParams.isWearableSmart,
    isOnSale: filterWearablesParams.isOnSale,
    onlyMinting: filterWearablesParams.onlyMinting,
    onlyListing: filterWearablesParams.onlyListing,
    minPrice: filterWearablesParams.minPrice,
    maxPrice: filterWearablesParams.maxPrice,
    sortBy: filterWearablesParams.sortBy
  })
}

const createMannequin = (config: IExtraLocatorData, wearableGetter: () => WearableItem | undefined): Entity => {
  const { name, extras, transform } = config
  const { position, rotation, scale } = transform!
  let mannequinAddYPos: number = 0.45

  let podiumModelName: string = name.replace('mann_', '')
  let index: number = podiumModelName.search(/\./g)
  if (index < 0) {
    podiumModelName = podiumModelName
  } else podiumModelName = podiumModelName.slice(0, index)

  if (extras && 'addYPos' in extras && extras.addYPos) mannequinAddYPos = +extras.addYPos
  const avatar = engine.addEntity()
  const podium = engine.addEntity()

  MarketplaceMannequin.create(avatar, {
    areaId: extras?.area ? (extras.area as AREA_TRIGGER_ID) : AREA_TRIGGER_ID.NONE,
    static: extras?.static ? (extras?.static as boolean) : false,
    visible: false
  })

  GltfContainer.createOrReplace(podium, { src: `models/${podiumModelName}.gltf` })
  if (position) {
    Transform.createOrReplace(avatar, { position: { ...position, y: position.y + mannequinAddYPos }, rotation, scale })
    Transform.createOrReplace(podium, transform)
  }

  triggers.addTrigger(podium, NO_LAYERS, LAYER_1, [{ type: 'box', scale: { x: 5, y: 5, z: 5 } }], () => {
    if (AvatarShape.getOrNull(avatar)) AvatarShape.getMutable(avatar).expressionTriggerId = 'wave'
  })

  pointerEventsSystem.onPointerDown(
    {
      entity: podium,
      opts: { button: InputAction.IA_POINTER, hoverText: 'OPEN DESCRIPTION', maxDistance: 5 }
    },
    () => {
      toggleNpcMenuVisibility(NPC_MENU_ENUM.WEARABLE)
      mannequins.wearableForDescr = wearableGetter()
    }
  )

  mannequins.mannequinItems.push({ avatar, podium })

  return avatar
}

const updateMannequinWearable = (wearable: WearableItem | undefined, mannequin: Entity): void => {
  if (AvatarShape.getOrNull(mannequin)) {
    AvatarShape.getMutable(mannequin).wearables = wearable ? getWearableSet(wearable) : DEFAULT_WEARABLES
    if (wearable) AvatarShape.getMutable(mannequin).bodyShape = getBodyURN(wearable)
  }
}

const getUserData = async (userAddress: string): Promise<IUserData | undefined> => {
  const { resultReq } = await useFetch({
    url: `https://peer.decentraland.org/lambdas/profile/${userAddress}`,
    method: 'GET'
  })
  if (
    resultReq &&
    typeof resultReq === 'object' &&
    'avatars' in resultReq &&
    Array.isArray(resultReq.avatars) &&
    resultReq.avatars.length
  ) {
    return resultReq.avatars[0] as IUserData
  }
}

const getCollectionData = async (contractAddress: string): Promise<IWearableCollectionData | undefined> => {
  const { resultReq } = await useFetch({
    url: `${nftServerClient.URL}/collections?contractAddress=${contractAddress}`
  })
  if (
    resultReq &&
    typeof resultReq === 'object' &&
    'data' in resultReq &&
    Array.isArray(resultReq.data) &&
    resultReq.data.length
  ) {
    return resultReq.data[0] as IWearableCollectionData
  }
}

export const putOnWearables = async () => {
  const wearables = await getWearables().catch((_) => null)
  let iterableMannequins = mannequins.mannequinItems.filter((mannequin) => {
    return !MarketplaceMannequin.get(mannequin.avatar).static
  })
  wearables?.forEach((wearable) => {
    if ('creator' in wearable) getUserData(wearable.creator).then((data) => (wearable!.creatorName = data?.name))
    // .then(v => console.log("MARK NAME", v))
    if ('contractAddress' in wearable)
      getCollectionData(wearable.contractAddress).then((data) => (wearable!.collectionName = data?.name))
    // .then(v => console.log("MARK COLLECTION", v))
  })
  iterableMannequins.map((mannequin, index) => {
    let wearable = wearables?.[index % mannequins.mannequinZoneLimit]
    if (wearable) {
      mannequin.currentWearable = wearable
    } else mannequin.currentWearable = undefined
    updateMannequinWearable(wearable, mannequin.avatar)
  })
}

const createButton = (btnSettings: ICreateBtn): void => {
  const { entity, transform, pathToModel, handler, name } = btnSettings

  GltfContainer.create(entity, { src: pathToModel })
  Transform.create(entity, transform)
  pointerEventsSystem.onPointerDown(
    {
      entity: entity,
      opts: { button: InputAction.IA_POINTER, hoverText: name }
    },
    handler
  )
}

const showWearables = (paginationType: PAGINATION_ENUM): void => {
  if (paginationMarketParams.isLoaded) {
    if (paginationType === PAGINATION_ENUM.PREV && !paginationMarketParams.skip) return
    if (paginationType === PAGINATION_ENUM.NEXT) {
      paginationMarketParams.skip = paginationMarketParams.skip
        ? paginationMarketParams.first + paginationMarketParams.skip
        : paginationMarketParams.first
    }
    if (paginationType === PAGINATION_ENUM.PREV && paginationMarketParams.skip) {
      paginationMarketParams.skip = paginationMarketParams.skip - paginationMarketParams.first
    }
    showWearablesPage()
  }
}

const showWearablesPage = async () => {
  paginationMarketParams.isLoaded = false
  await putOnWearables()
  paginationMarketParams.isLoaded = true
}

export const addButtonsToControlPanels = async (transform: SceneTransform) => {
  const sortByBtn = engine.addEntity()
  const filterBtn = engine.addEntity()
  const prevBtn = engine.addEntity()
  const nextBtn = engine.addEntity()
  createButton({
    name: 'SORT BY',
    transform,
    entity: sortByBtn,
    pathToModel: 'models/obj_filters_sorting.gltf',
    handler: () => toggleNpcMenuVisibility(NPC_MENU_ENUM.SORT_BY)
  })
  createButton({
    name: 'FILTERS',
    transform,
    entity: filterBtn,
    pathToModel: 'models/obj_filters_filtering.gltf',
    handler: () => toggleNpcMenuVisibility(NPC_MENU_ENUM.FILTER)
  })
  createButton({
    name: 'PREVIOUS',
    transform,
    entity: prevBtn,
    pathToModel: 'models/obj_filters_left_arrow.gltf',
    handler: () => showWearables(PAGINATION_ENUM.PREV)
  })
  createButton({
    name: 'NEXT',
    transform,
    entity: nextBtn,
    pathToModel: 'models/obj_filters_right_arrow.gltf',
    handler: () => showWearables(PAGINATION_ENUM.NEXT)
  })
}

export const hideMannequin = (mannequin: IMannequinItem) => {
  if (MarketplaceMannequin.get(mannequin.avatar).visible === false) return
  MarketplaceMannequin.getMutable(mannequin.avatar).visible = false
  AvatarShape.deleteFrom(mannequin.avatar)
}

export const showMannequin = (mannequin: IMannequinItem) => {
  console.log('Show Mannequin')
  console.log('Mannequin: ', mannequin)

  if (MarketplaceMannequin.get(mannequin.avatar).visible === true) return
  MarketplaceMannequin.getMutable(mannequin.avatar).visible = true

  AvatarShape.createOrReplace(mannequin.avatar, {
    id: 'mannequin',
    emotes: [],
    wearables: mannequin.currentWearable ? getWearableSet(mannequin.currentWearable) : DEFAULT_WEARABLES,
    bodyShape: getBodyURN(mannequin.currentWearable),
    name: ''
  })
}

export const getBodyURN = (wearable: WearableItem | undefined) => {
  let bodyShape_: string = 'urn:decentraland:off-chain:base-avatars:BaseFemale'

  if (
    wearable &&
    wearable.data.wearable.bodyShapes.includes('BaseMale') &&
    wearable.data.wearable.bodyShapes.includes('BaseFemale')
  ) {
    bodyShape_ =
      Math.random() > 0.5
        ? 'urn:decentraland:off-chain:base-avatars:BaseMale'
        : 'urn:decentraland:off-chain:base-avatars:BaseFemale'
    return bodyShape_
  } else if (wearable && wearable.data.wearable.bodyShapes.includes('BaseMale')) {
    bodyShape_ = 'urn:decentraland:off-chain:base-avatars:BaseMale'
    return bodyShape_
  }
  return bodyShape_
}

const getWearableSet = (wearable: WearableItem) => {
  if (wearable.data.emote) return [wearable.urn].concat(DEFAULT_WEARABLES)
  const type = wearable.data.wearable.category
  if (type == 'skin') return [wearable.urn]

  const defaultWearables = {
    eyes: 'urn:decentraland:off-chain:base-avatars:f_eyes_00',
    facial_hair: 'urn:decentraland:off-chain:base-avatars:f_eyebrows_00',
    mouth: 'urn:decentraland:off-chain:base-avatars:f_mouth_00',
    hair: 'urn:decentraland:off-chain:base-avatars:standard_hair',
    upper_body: 'urn:decentraland:off-chain:base-avatars:f_simple_yellow_tshirt',
    lower_body: 'urn:decentraland:off-chain:base-avatars:f_brown_trousers',
    feet: 'urn:decentraland:off-chain:base-avatars:bun_shoes'
  }

  const ret = [wearable.urn]
  Object.keys(defaultWearables).forEach((key) => {
    if (key != type) ret.push(defaultWearables[key as keyof typeof defaultWearables])
  })
  return ret
}

export function sortMannequinConfigs(mannequinsConfigs: IExtraLocatorData[]) {
  const staticMannequins: IExtraLocatorData[] = []
  const dynamicMannequins: IExtraLocatorData[] = []
  mannequinsConfigs.forEach((mannConfig) => {
    if (mannConfig.extras?.static) {
      staticMannequins.push(mannConfig)
    } else dynamicMannequins.push(mannConfig)
  })
  return { staticMannequins, dynamicMannequins }
}

export async function setupDynamicMarket(configs: IExtraLocatorData[]) {
  configs.forEach(async (config) => {
    const avatar = createMannequin(
      config,
      () => mannequins.mannequinItems.find((entity) => entity.avatar === avatar)?.currentWearable
    )
  })
  await putOnWearables()
}

export async function setupStaticMarket(configs: IExtraLocatorData[]) {
  let maxIndex: number = 0
  configs.forEach((config) => {
    if (config.extras?.index === undefined) return
    return (maxIndex = Math.max(maxIndex, config.extras!.index as number))
  })

  let wearables: WearableItem[] | null = await nftServerClient.fetchTrendingNFTs(20)
  if (wearables) {
    wearables = wearables.sort((a, b) => {
      const sortFlag = b.firstListedAt - a.firstListedAt
      if (sortFlag === 0) return -1
      else return sortFlag
    })
    wearables = wearables
      .filter((wearableItem) => wearableItem.category === NFTCategory.WEARABLE)
      .slice(0, maxIndex + 1)
  }
  await Promise.all(
    configs.map(async (config) => {
      if (config.extras && wearables) {
        const wearable: WearableItem | undefined = wearables[config.extras.index as number]
        if (wearable) {
          let catalogData: WearableItem | null = null
          const { resultReq } = await useFetch({
            url: `${nftServerClient.URL}/catalog?contractAddress=${wearable.contractAddress}`
          })
          if (resultReq && typeof resultReq === 'object' && 'data' in resultReq && Array.isArray(resultReq.data)) {
            catalogData = resultReq.data[0]
          }
          const createdAvatar = createMannequin(config, () => wearable)
          const mannequin = mannequins.mannequinItems.find((mannequin) => mannequin.avatar === createdAvatar)
          if (mannequin && catalogData) {
            mannequin.currentWearable = wearable
            mannequin.currentWearable.minPrice = catalogData.minPrice
          }

          getUserData(wearable.creator).then((data) => (wearable.creatorName = data?.name))
          getCollectionData(wearable.contractAddress).then((data) => (wearable.collectionName = data?.name))

          updateMannequinWearable(wearable, createdAvatar)
        }
      }
    })
  )
}
