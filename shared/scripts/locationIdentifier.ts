export type ILocationEdentifier = {
  coordinates: { x: number; y: number }
  realm?: string
  network?: string
  catalyst?: string
}

export function constructLocationIdentifier({ coordinates: { x, y }, realm, network, catalyst }: ILocationEdentifier) {
  return `${x + ',' + y}:${realm ?? ''}:${network ?? ''}:${catalyst ?? ''}`
}

export function parseLocationIdentifier(id: string): ILocationEdentifier {
  const [coordinates, realm, network, catalyst] = id.split(':').map((v) => v || undefined)
  if (!coordinates || id.match(/:/g)?.length != 3) throw 'Invalid identifier'
  const [x, y] = coordinates.split(',')
  return {
    coordinates: { x: Number(x), y: Number(y) },
    realm,
    network,
    catalyst
  }
}
