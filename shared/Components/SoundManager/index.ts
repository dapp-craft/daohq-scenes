import { AudioSource, AudioStream, engine, Entity, Transform, MediaState } from '@dcl/sdk/ecs'
import * as utils from '@dcl-sdk/utils'

export let SOUNDS: { [key: string]: string } = {}
export let THEMES: { [key: string]: string[] } = {}

const STREAM_VOLUME_DELTA = 0.05
const STREAM_VOUME_MAX = 0.025

export class SoundManager {
  private soundsStorage: Entity[] = []
  private themeEntity: Entity
  public currentTheme: keyof typeof THEMES | undefined = undefined
  private targerTheme: keyof typeof THEMES | undefined = undefined
  private themeVolume = 0
  private currentThemeIndex: number = 0
  constructor() {
    Object.keys(SOUNDS).forEach((key) => {
      let ent = engine.addEntity()
      AudioSource.create(ent, {
        audioClipUrl: `${SOUNDS[key as keyof typeof SOUNDS]}`,
        loop: false,
        playing: false
      })
      this.soundsStorage.push(ent)
    })
    this.themeEntity = engine.addEntity()
    engine.addSystem(this.update)
    AudioStream.createOrReplace(this.themeEntity, { url: '', playing: false, volume: 0 })
  }

  public playSound(soundName: keyof typeof SOUNDS, volume: number = 0.5) {
    let soundEntity = engine.addEntity()
    Transform.create(soundEntity, { parent: engine.PlayerEntity })
    AudioSource.create(soundEntity, {
      audioClipUrl: `${SOUNDS[soundName as keyof typeof SOUNDS]}`,
      loop: false,
      playing: false
    })
    let audioSource = AudioSource.getMutable(soundEntity)
    audioSource.volume = volume
    audioSource.playing = true
    utils.timers.setTimeout(() => {
      audioSource.playing = false
      engine.removeEntity(soundEntity)
    }, 2000)
  }
  public setThemeVolume(volume: number) {
    AudioStream.getMutable(this.themeEntity).volume = this.themeVolume = volume
  }

  public setTheme(theme: keyof typeof THEMES | undefined) {
    this.targerTheme = theme
  }

  private update = (dt: number) => {
    if (AudioStream.getOrNull(this.themeEntity) == null) return
    this.themeVolume = AudioStream.getMutable(this.themeEntity).volume as number

    if (
      AudioStream.getAudioState(this.themeEntity)?.state == MediaState.MS_PAUSED &&
      this.currentTheme != undefined &&
      this.themeVolume == STREAM_VOUME_MAX
    ) {
      this.currentThemeIndex = (this.currentThemeIndex + 1) % THEMES[this.currentTheme].length
      AudioStream.getMutable(this.themeEntity).url = THEMES[this.currentTheme][this.currentThemeIndex]
      return
    }

    if (this.targerTheme == this.currentTheme && this.themeVolume == STREAM_VOUME_MAX) return

    if (this.targerTheme != this.currentTheme) {
      // If target theme is set and it's not the current theme
      if (this.themeVolume != 0) {
        engine._id
        // Decrease the volume of the current theme
        this.themeVolume = Math.max(this.themeVolume - STREAM_VOLUME_DELTA * dt, 0)
        AudioStream.getMutable(this.themeEntity).volume = this.themeVolume
      } else {
        // Change the theme
        this.currentThemeIndex = 0
        this.currentTheme = this.targerTheme
        if (this.currentTheme == undefined) {
          AudioStream.getMutable(this.themeEntity).playing = false
          return
        }
        if (this.currentTheme && THEMES[this.currentTheme][this.currentThemeIndex]) {
          this.currentThemeIndex = 0
          AudioStream.createOrReplace(this.themeEntity, {
            url: THEMES[this.currentTheme][this.currentThemeIndex],
            playing: true,
            volume: this.themeVolume
          })
        }
      }
      return
    }

    if (
      this.themeVolume < STREAM_VOUME_MAX &&
      this.currentTheme != undefined &&
      AudioStream.getAudioState(this.themeEntity)?.state == MediaState.MS_PLAYING
    ) {
      this.themeVolume = Math.min(this.themeVolume + STREAM_VOLUME_DELTA * dt, STREAM_VOUME_MAX)
      AudioStream.getMutable(this.themeEntity).volume = this.themeVolume
    }
  }

  /**
   * Set sounds for the game
   * Set has to be done before initializing the SoundManager and can not be changed after that
   * @param sounds key-value pair of sound names and their paths
   *
   * @example
   * setConstantSounds({
   *   "jump": "sounds/jump.mp3",
   *   "explosion": "sounds/explosion.mp3",
   *   "background": "sounds/background.mp3"
   * })
   */
  static setConstantSounds(sounds: { [key: string]: string }) {
    SOUNDS = sounds
  }

  /**
   * Set themes for the game
   * @param themes key-value pair of theme names and their urls
   *
   * @todo
   * Implement support for updating the theme set after the SoundManager has been initialized.
   *
   * @example
   * setStreamThemes({
   * "zombies": "https://stream.api.crossverse.review/zombies",
   * "vampires": "https://stream.api.crossverse.review/vampires",
   * })
   */
  public setStreamThemes(themes: { [key: string]: string[] }) {
    THEMES = themes
    console.log('Set theme', THEMES)
    if (this.currentTheme)
      AudioStream.createOrReplace(this.themeEntity, {
        url: THEMES[this.currentTheme][this.currentThemeIndex],
        playing: true,
        volume: this.themeVolume
      })
  }
}
