import { NFTFilters, NFT, Order } from '@dcl/schemas'

export type LandOrder = {
    nft: NFT
    orders: Order
    [key: string]: any
}
