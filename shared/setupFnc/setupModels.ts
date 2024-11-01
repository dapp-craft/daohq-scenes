import {
  Entity,
  GltfContainer,
  Transform,
  TransformType,
  LoadingState,
  GltfContainerLoadingState,
  engine
} from '@dcl/sdk/ecs'
import { IExtraLocatorData } from '../types'
import * as utils from '@dcl-sdk/utils'

export interface IModelLoadCallback {
  name: string
  okay: boolean
  error?: string
  thread: number
  current: number
  total: number
}

export async function setupModels(
  models: IExtraLocatorData[],
  storage: Map<string, Entity>,
  concurrency: number = 1,
  loadCallback?: (data: IModelLoadCallback) => void
) {
  const chunks: IExtraLocatorData[][] = new Array(concurrency).fill(null).map(() => [])
  let i = 0
  for (let model of models) chunks[i++ % concurrency].push(model)
  console.log('Model loading chunks: ', chunks)

  return chunks
    .map((chunk, thread) =>
      chunk.reduce(async (prev, { name, transform }) => {
        const current = (await prev) + 1
        if (!transform) return current
        try {
          storage.set(name, await loadModel('models', name.slice(0, name.search(/\.|$/)), transform))
          loadCallback?.({ name, okay: true, thread, current, total: chunk.length })
        } catch (e) {
          loadCallback?.({ name, okay: false, thread, current, total: chunk.length, error: String(e) })
        }
        return current
      }, Promise.resolve(0))
    )
    .reduce(async (s, n) => (await s) + (await n))
}

const EXTENSIONS = new Array(3).fill(['gltf', 'glb']).flat()
export async function loadModel(rootPath: string, modelName: string, transform: Partial<TransformType>) {
  const entity = engine.addEntity()
  Transform.create(entity, transform)
  let extensionIndex = 0
  let state: LoadingState | undefined = LoadingState.NOT_FOUND
  do
    switch (state) {
      case LoadingState.NOT_FOUND:
      case LoadingState.FINISHED_WITH_ERROR:
        if (extensionIndex >= EXTENSIONS.length) throw 'file not found'
        GltfContainer.createOrReplace(entity, { src: `${rootPath}/${modelName}.${EXTENSIONS[extensionIndex++]}` })
      case undefined:
      case LoadingState.UNKNOWN:
      case LoadingState.LOADING:
        await new Promise<void>((r) => utils.timers.setTimeout(r, 1))
        state = GltfContainerLoadingState.getOrNull(entity)?.currentState
        break
      case LoadingState.FINISHED:
        return entity
    }
  while (true)
}
