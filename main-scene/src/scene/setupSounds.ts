import { AudioSource } from '@dcl/sdk/ecs'
import { allSavedEntity } from '../states/states'
import { soundEntity, soundVolume } from './constants/soundsConfig'

const attachSound = (entityArray: Array<any>, audioClipUrl: string, volume: number = 0.5) => {
  entityArray.forEach((entity) => {
    AudioSource.create(entity, {
      audioClipUrl,
      loop: true,
      playing: true,
      volume
    })
  })
}

export function setupSounds() {
  soundEntity.forEach((entityNameArray, sound) => {
    let entityArray = entityNameArray.map((name) => allSavedEntity.get(name))
    if (!entityArray) return
    attachSound(entityArray, sound, soundVolume.has(sound) ? soundVolume.get(sound) : 0.5)
  })
}
