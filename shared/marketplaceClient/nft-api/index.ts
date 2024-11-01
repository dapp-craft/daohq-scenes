import { CatalogFilters, NFTFilters } from '@dcl/schemas'
import { LandOrder } from './types'
import { URLSearchParams } from '../utils'
import { useFetch } from '../../scripts'

export interface WearableItem {
  id: string
  beneficiary: string
  itemId: string
  name: string
  thumbnail: string
  url: string
  category: string
  rarity: string
  contractAddress: string
  available: number
  isOnSale: boolean
  creator: string
  data: Data
  network: string
  chainId: number
  price: string
  createdAt: number
  updatedAt: number
  reviewedAt: number
  firstListedAt: number
  soldAt: number
  minPrice: string
  maxListingPrice: string
  minListingPrice: string
  listings: number
  owners: null
  picks: Picks
  urn: string
  creatorName?: string
  collectionName?: string
}

interface Data {
  emote: Emote
  wearable: { bodyShapes: string[]; category: string; description: string; isSmart: boolean; rarity: string }
}

interface Emote {
  description: string
  category: string
  bodyShapes: string[]
  rarity: string
  loop: boolean
  hasGeometry: boolean
  hasSound: boolean
}

interface Picks {
  itemId: string
  count: number
}

let DEFAULT_URL = 'https://nft-api.decentraland.org/v1'

export function setBaseUrl(url: string) {
  DEFAULT_URL = url
}

export class NFTSeverClient {
  public URL: string
  private queryParams: Object

  constructor(url: string = DEFAULT_URL) {
    this.URL = url
    this.queryParams = {}
  }

  async fetchNFTs(filters: NFTFilters): Promise<LandOrder[]> {
    const response = await fetch(`${this.URL}/nfts?${new URLSearchParams(filters as any)}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch NFTs: ${response.statusText}`)
    }
    return (await response.json())['data']
  }

  // Dirty hack
  // TODO - set a proper type
  async fetchTrendingNFTs(count: number = 5): Promise<any> {
    const response = await fetch(`${this.URL}/trendings?size=${count}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch trenging NFTs: ${response.statusText}`)
    }
    return (await response.json())['data']
  }

  async getShowroomWearables(filters: CatalogFilters = {}): Promise<WearableItem[] | null> {
    const queryParams = this.buildQueryString(filters)
    const { resultReq } = await useFetch({ url: `${this.URL}/catalog?${queryParams}`, method: 'GET' })
    console.log(resultReq && typeof resultReq === 'object' && 'data' in resultReq && Array.isArray(resultReq.data))
    if (resultReq && typeof resultReq === 'object' && 'data' in resultReq && Array.isArray(resultReq.data)) {
      console.log(resultReq.data)
      return resultReq.data
    } else {
      throw new Error("Can't get correct wearable data")
    }
  }

  private buildQueryString(filters: CatalogFilters): string {
    if (Object.keys(this.queryParams).length) this.queryParams = {}
    const appendParam = (key: string, value: string) => Object.assign(this.queryParams, { [key]: value })

    Object.entries(filters).forEach((v) => {
      const [key, val] = v
      if (val !== undefined) {
        if (Array.isArray(val)) {
          val.forEach((valItem) => appendParam(key, valItem))
        } else appendParam(key, `${val}`)
      }
    })

    return Object.entries(this.queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  }
}
