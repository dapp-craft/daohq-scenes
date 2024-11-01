import { Vector3 } from '@dcl/sdk/math'
import { ILocatorNode, SceneTransform } from '../types'

export let defaultOffset: Vector3 = { x: 0, y: 0, z: 0 }

export const getTransfFromLocNode = (node: ILocatorNode, offset: Vector3 = defaultOffset): SceneTransform => {
  return {
    position: node.translation
      ? {
          x: node.translation[0] + offset.x,
          y: node.translation[1] + offset.y,
          z: node.translation[2] + offset.z
        }
      : undefined,
    rotation: node.rotation
      ? { x: node.rotation[0], y: node.rotation[1], z: node.rotation[2], w: node.rotation[3] }
      : undefined,
    scale: node.scale ? { x: node.scale[0], y: node.scale[1], z: node.scale[2] } : undefined
  }
}

export function setDefaultOffset(offset: Vector3): void {
  defaultOffset = offset
}
