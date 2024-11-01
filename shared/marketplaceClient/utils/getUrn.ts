import { NFT } from '@dcl/schemas';

export function getURN(data: NFT): string {
   return `urn:decentraland:${data.network.toLocaleLowerCase()}:collections-v2:${data.contractAddress}:${data.itemId}`
}