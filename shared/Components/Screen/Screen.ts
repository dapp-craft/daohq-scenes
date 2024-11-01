import {
  engine,
  Entity,
  InputAction,
  Material,
  MaterialTransparencyMode,
  MeshCollider,
  MeshRenderer,
  PBVideoPlayer,
  pointerEventsSystem,
  TextureFilterMode,
  TextureUnion,
  TextureWrapMode,
  Transform,
  videoEventsSystem,
  VideoPlayer,
  VideoState,
  VisibilityComponent
} from '@dcl/sdk/ecs'
import { timers } from '@dcl-sdk/utils'
import { IResource, SceneTransform } from '../../types'
import { IScreenConfig, IConcaveScreenConfig, ScreenFormatEnum } from './types'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { getActiveVideoStreams, VideoTrackSourceType } from '~system/CommsApi'
import { screensInstances, toggleProposalBoard } from '../../globals'
import { openExternalUrl } from '~system/RestrictedActions'

let selectedStream: string = ''

export class Screen {
  private concaveConfigData?: IConcaveScreenConfig
  private defaultOnCreationRes: IResource[] | undefined
  private currentIntervalTimerId: number | null
  private intervalDuration: number
  public counter: number = 0
  public concaveSectionsEntities: Entity[]
  public name: string
  public screenEntity: Entity
  public isRunScreenIntervalMode: boolean
  public isUserInTriggerZone: boolean
  public screenTransform: SceneTransform | null
  public resource?: IResource[]
  public locationId?: string | number
  public slotId?: string | number
  public description?: string
  public videoTrigger?: {
    entity?: Entity
    zoneLength?: number
    zoneWidth?: number
    expansionAngle?: number
    groundLevel?: number
    visibility?: boolean
    area?: string
  }

  constructor(screenConfig: IScreenConfig, triggersVisibility?: boolean) {
    this.resource = []
    this.counter = 0
    this.concaveConfigData = screenConfig.concaveConfig
    this.screenEntity = engine.addEntity()
    this.concaveSectionsEntities = []
    this.name = screenConfig.name
    this.defaultOnCreationRes = screenConfig.defaultResources
    this.locationId = screenConfig.locationId
    this.slotId = screenConfig.slotId
    this.isUserInTriggerZone = false
    this.intervalDuration = 30000
    this.currentIntervalTimerId = null
    this.isRunScreenIntervalMode = screenConfig.isRunScreenIntervalMode
    this.description = screenConfig.description
    this.videoTrigger = screenConfig.trigger
    this.screenTransform = null

    if (this.concaveConfigData && this.concaveConfigData.sectionsQuantity) {
      for (let i = 0; i < this.concaveConfigData.sectionsQuantity; i++) {
        this.concaveSectionsEntities.push(engine.addEntity())
      }
      this.createConcaveScreen(screenConfig.transform, this.concaveConfigData)
    } else {
      this.createFlatScreen(screenConfig.transform)
    }

    if (this.videoTrigger && !this.videoTrigger.area) {
      this.videoTrigger.visibility = triggersVisibility
      this.setScreenVideoTrigger()
    }
  }

  public setPrevContent(remoteResources?: IResource[]) {
    if (remoteResources) this.resource = remoteResources
    if (this.resource && this.resource.length) {
      const currentCount: number = (this.counter - 1) % this.resource.length
      this.counter = currentCount >= 0 ? currentCount : 0
      this.setContent()
    }
  }

  public setNextContent(remoteResources?: IResource[]) {
    if (remoteResources) this.resource = remoteResources
    if (this.resource && this.resource.length) {
      this.counter = (this.counter + 1) % this.resource.length
      this.setContent()
    }
  }

  public setContent(remoteResources?: IResource[]) {
    if (!this.resource) this.resource = this.defaultOnCreationRes
    if (remoteResources) this.resource = remoteResources

    const emptyConfigMsg: string = 'images/materials/empty_config.png'
    let content: string = emptyConfigMsg

    this.counter = this.resource?.length ? this.counter % this.resource.length : 0

    if (this.resource && Array.isArray(this.resource) && this.resource.length) {
      content = this.resource[this.counter].s3_urn
    }
    if (this.concaveConfigData && Object.keys(this.concaveConfigData).length && this.resource) {
      if (content === emptyConfigMsg) {
        this.setConcaveImage(content)
        return
      }
      if (this.resource[this.counter].type === ScreenFormatEnum.image) {
        this.setConcaveImage(content)
      }
      if (this.resource[this.counter].type === ScreenFormatEnum.video) {
        if (!this.isUserInTriggerZone && this.resource[this.counter].preview) {
          this.setConcaveImage(this.resource[this.counter].preview!)
        } else {
          this.setConcaveVideo(content)
        }
      }
      if (this.resource[this.counter].type === ScreenFormatEnum.cast_stream) {
        this.isUserInTriggerZone = true
        this.setConcaveVideo(selectedStream)
      }
    } else {
      if (content === emptyConfigMsg) {
        this.setFlatImage(content)
        return
      }
      if (this.resource && this.resource[this.counter].type === ScreenFormatEnum.image) {
        this.setFlatImage(content)
      }
      if (this.resource && this.resource[this.counter].type === ScreenFormatEnum.video) {
        if (!this.isUserInTriggerZone && this.resource[this.counter].preview) {
          this.setFlatImage(this.resource[this.counter].preview!)
        } else {
          this.setFlatVideo(content)
        }
      }
      if (this.resource && this.resource[this.counter].type === ScreenFormatEnum.cast_stream) {
        this.isUserInTriggerZone = true
        this.setFlatVideo(selectedStream)
      }
    }
  }

  private setFlatImage(content: string) {
    Material.createOrReplace(this.screenEntity, {
      material: {
        $case: 'pbr',
        pbr: {
          texture: {
            tex: {
              $case: 'texture',
              texture: { src: content, filterMode: TextureFilterMode.TFM_TRILINEAR }
            }
          },
          alphaTexture: {
            tex: {
              $case: 'texture',
              texture: {
                src: 'images/alpha/alpha_screen.png',
                filterMode: TextureFilterMode.TFM_TRILINEAR,
                wrapMode: TextureWrapMode.TWM_REPEAT
              }
            }
          },
          emissiveColor: Color4.White(),
          emissiveIntensity: 0.9,
          emissiveTexture: {
            tex: {
              $case: 'texture',
              texture: { src: content, filterMode: TextureFilterMode.TFM_TRILINEAR }
            }
          },
          roughness: 1.0,
          specularIntensity: 0,
          metallic: 0,
          transparencyMode: MaterialTransparencyMode.MTM_AUTO
        }
      }
    })
  }

  private setConcaveImage(content: string) {
    this.concaveSectionsEntities.forEach((section) => {
      Material.createOrReplace(section, {
        material: {
          $case: 'pbr',
          pbr: {
            texture: {
              tex: {
                $case: 'texture',
                texture: { src: content, filterMode: TextureFilterMode.TFM_TRILINEAR }
              }
            },
            alphaTexture: {
              tex: {
                $case: 'texture',
                texture: {
                  src: 'images/alpha/alpha_screen.png',
                  filterMode: TextureFilterMode.TFM_TRILINEAR,
                  wrapMode: TextureWrapMode.TWM_REPEAT
                }
              }
            },
            emissiveColor: Color4.White(),
            emissiveIntensity: 0.9,
            emissiveTexture: {
              tex: {
                $case: 'texture',
                texture: { src: content, filterMode: TextureFilterMode.TFM_TRILINEAR }
              }
            },
            roughness: 1.0,
            specularIntensity: 0,
            metallic: 0,
            transparencyMode: MaterialTransparencyMode.MTM_AUTO
          }
        }
      })
    })
  }

  private setFlatVideo(content: string) {
    console.log('setFlatVideo', content)
    if (content == '') {
      VideoPlayer.deleteFrom(this.screenEntity)
      return
    }
    VideoPlayer.createOrReplace(this.screenEntity, {
      src: content,
      playing: false,
      loop: true,
      volume: 0.2
    })
    const videoTexture = Material.Texture.Video({ videoPlayerEntity: this.screenEntity })

    Material.setPbrMaterial(this.screenEntity, {
      texture: videoTexture,
      roughness: 1.0,
      specularIntensity: 0,
      metallic: 0,
      emissiveColor: Color4.White(),
      emissiveIntensity: 0.9,
      emissiveTexture: videoTexture,
      alphaTexture: Material.Texture.Common({
        src: 'images/alpha/alpha_screen.png',
        filterMode: TextureFilterMode.TFM_TRILINEAR,
        wrapMode: TextureWrapMode.TWM_REPEAT
      }),
      transparencyMode: MaterialTransparencyMode.MTM_AUTO
    })
  }

  private setConcaveVideo(content: string) {
    console.log('setConcaveVideo', content)
    if (content == '') {
      VideoPlayer.deleteFrom(this.screenEntity)
      return
    }
    let videoTexture: TextureUnion | undefined = undefined
    if (this.screenEntity && content) {
      VideoPlayer.createOrReplace(this.screenEntity, {
        src: content,
        playing: false,
        loop: true,
        volume: 0.2
      })
      videoTexture = Material.Texture.Video({ videoPlayerEntity: this.screenEntity })
    }

    this.concaveSectionsEntities.forEach((section) => {
      Material.setPbrMaterial(section, {
        texture: videoTexture,
        roughness: 1.0,
        specularIntensity: 0,
        metallic: 0,
        emissiveColor: Color4.White(),
        emissiveIntensity: 0.9,
        emissiveTexture: videoTexture,
        alphaTexture: Material.Texture.Common({
          src: 'images/alpha/alpha_screen.png',
          filterMode: TextureFilterMode.TFM_TRILINEAR,
          wrapMode: TextureWrapMode.TWM_REPEAT
        }),
        transparencyMode: MaterialTransparencyMode.MTM_AUTO
      })
    })
  }

  private createFlatScreen(transform: SceneTransform) {
    this.screenTransform = transform
    // addTestCube(transform, undefined, undefined, Color4.Gray(), undefined, true)
    const { position, scale, rotation } = transform
    Transform.create(this.screenEntity, {
      position,
      scale,
      rotation
    })

    let heightParts = 1
    let widthParts = 1
    MeshRenderer.create(this.screenEntity, {
      mesh: {
        $case: 'plane',
        plane: {
          uvs: [
            0,
            0,

            0,
            heightParts,

            widthParts,
            heightParts,

            widthParts,
            0,

            0,
            0,

            0,
            heightParts,

            widthParts,
            heightParts,

            widthParts,
            0
          ]
        }
      }
    })
    this.setContent()
  }

  private createConcaveScreen(transform: SceneTransform, config: IConcaveScreenConfig) {
    const { position, rotation, scale } = transform
    this.screenTransform = transform
    const { radius, sectionsQuantity } = config

    if (radius && sectionsQuantity && position && rotation && scale) {
      const forward = { x: 0, y: 0, z: 1 }

      const centerDirection = Vector3.rotate(forward, rotation)
      const centerPosition = Vector3.add(position, Vector3.scale(centerDirection, radius))

      const side = scale.x / 2
      const angleRadians = 2 * Math.asin(side / radius)
      const angleStepRad = angleRadians / sectionsQuantity

      const segmentWidth = (2 * radius * Math.sin(angleStepRad / 2)) / Math.cos(angleStepRad / 2)

      this.concaveSectionsEntities.forEach((sectionEntity, i) => {
        const currentAngleRad = -angleRadians / 2 + angleStepRad * i + angleStepRad / 2

        const stepRotationDelta = Quaternion.fromRotationYawPitchRoll(currentAngleRad, 0, 0)
        const stepRotation = Quaternion.multiply(rotation, stepRotationDelta)
        const stepDirection = Vector3.rotate(forward, stepRotation)
        const stepPosition = Vector3.add(centerPosition, Vector3.scale(stepDirection, -radius))

        Transform.create(sectionEntity, {
          position: stepPosition,
          scale: { x: segmentWidth, y: scale.y, z: scale.z },
          rotation: stepRotation
        })

        const sectionWidthStart = i / sectionsQuantity
        const sectionWidthEnd = (i + 1) / sectionsQuantity

        MeshRenderer.create(sectionEntity, {
          mesh: {
            $case: 'plane',
            plane: {
              uvs: [
                // South side of unrortated plane
                sectionWidthEnd, // lower-right corner //first
                0,

                sectionWidthEnd, // lower-left corner //first
                1,

                sectionWidthStart, // upper-left corner
                1,

                sectionWidthStart, // upper-right corner
                0,

                // North side of unrortated plane
                sectionWidthStart, //lower-left corner //first
                0,

                sectionWidthStart, //lower-right corner //first
                1,

                sectionWidthEnd, //upper-right corner
                1,

                sectionWidthEnd, //upper left-corner
                0
              ]
            }
          }
        })
        this.setContent()
      })
    } else {
      throw new Error("Concave screen don't have valid radius or section quantity")
    }
  }

  setClickableLinkToFlatScreen(linkType: 'discord' | 'proposal' | 'custom', custom?: { text: string; url: string }) {
    const transform = Transform.getMutableOrNull(this.screenEntity)
    if (transform) {
      const clickablePlane = engine.addEntity()
      Transform.create(clickablePlane, transform)
      MeshCollider.create(clickablePlane, {
        mesh: {
          $case: 'plane',
          plane: {}
        }
      })

      if (linkType === 'proposal') {
        pointerEventsSystem.onPointerDown(
          {
            entity: clickablePlane,
            opts: { button: InputAction.IA_POINTER, hoverText: 'SHOW PROPOSAL BOARD' }
          },
          () => toggleProposalBoard()
        )
      }
      if (linkType === 'discord') {
        pointerEventsSystem.onPointerDown(
          {
            entity: clickablePlane,
            opts: { button: InputAction.IA_POINTER, hoverText: 'SHOW DISCORD POST' }
          },
          () => {
            if (this.resource && this.resource[this.counter].discord_message_link) {
              openExternalUrl({ url: this.resource[this.counter].discord_message_link as string })
            }
          }
        )
      }
      if (linkType === 'custom' && custom) {
        pointerEventsSystem.onPointerDown(
          {
            entity: clickablePlane,
            opts: { button: InputAction.IA_POINTER, hoverText: custom.text }
          },
          () => {
            openExternalUrl({ url: custom.url })
          }
        )
      }
    }
  }

  runScreenInIntervalMode() {
    this.clearIntervalTimer()
    const intervalTimerId = timers.setInterval(() => {
      this.setNextContent()
    }, this.intervalDuration)
    this.currentIntervalTimerId = intervalTimerId
  }

  clearIntervalTimer() {
    if (this.currentIntervalTimerId) timers.clearInterval(this.currentIntervalTimerId)
  }

  startVideoPlaying(playingState?: boolean) {
    this.setContent()
    let player: PBVideoPlayer | null = VideoPlayer.getMutableOrNull(this.screenEntity)
    if (player) player.playing = typeof playingState === 'boolean' ? playingState : true
  }

  async stopVideoPlaying() {
    this.setContent()
    let state: VideoState | undefined = videoEventsSystem.getVideoState(this.screenEntity)?.state
    while (
      VideoPlayer.getMutableOrNull(this.screenEntity)?.playing ||
      (state !== VideoState.VS_PAUSED && state !== VideoState.VS_READY)
    ) {
      let player: PBVideoPlayer | null = VideoPlayer.getMutableOrNull(this.screenEntity)
      if (player) player.playing = false
      await new Promise<void>((r) => timers.setTimeout(r, 200))
      state = videoEventsSystem.getVideoState(this.screenEntity)?.state
    }
  }

  setScreenVideoTrigger() {
    if (this.screenTransform && this.videoTrigger) {
      let { position, scale, rotation } = this.screenTransform
      let { expansionAngle, zoneLength, zoneWidth: zoneWidthBottom, groundLevel } = this.videoTrigger
      if (
        [position, scale, rotation, zoneLength, zoneWidthBottom, expansionAngle, groundLevel].every(
          (val) => val !== undefined
        )
      ) {
        zoneWidthBottom = zoneWidthBottom! / 2
        let zoneWidthTop: number = zoneWidthBottom
        if (expansionAngle! > 70) expansionAngle = 70
        if (expansionAngle! <= -90) expansionAngle = -89
        const zoneWidthOffset: number =
          Math.round(zoneLength! * Math.tan((expansionAngle! * Math.PI) / 180) * 100) / 100
        if (zoneWidthOffset + zoneWidthBottom >= 0) {
          zoneWidthTop += zoneWidthOffset
        } else {
          zoneWidthTop = 0
        }

        this.videoTrigger.entity = engine.addEntity()
        const localOffset = Vector3.rotate({ x: 0, y: scale!.y / 2, z: zoneLength! / 2 }, rotation!)
        Transform.create(this.videoTrigger.entity, {
          position: {
            x: position!.x + localOffset.x,
            y: groundLevel! + 0.005,
            z: position!.z + localOffset.z
          },
          scale: { x: 1, y: zoneLength!, z: 0.001 },
          rotation: Quaternion.multiply(rotation!, Quaternion.fromEulerDegrees(90, 0, 0))
        })
        MeshRenderer.setCylinder(this.videoTrigger.entity, zoneWidthBottom, zoneWidthTop)
        MeshCollider.setCylinder(this.videoTrigger.entity, zoneWidthBottom, zoneWidthTop)
        Material.setPbrMaterial(this.videoTrigger.entity, { albedoColor: Color4.create(1, 0, 0, 0.6) })
        VisibilityComponent.create(this.videoTrigger.entity, {
          visible: this.videoTrigger.visibility !== undefined ? this.videoTrigger.visibility : false
        })
      }
    }
  }
}

const REFRESH_INTERVAL = 5
let refreshInterval = 0

export function fetchStreamsSystem(dt: number) {
  refreshInterval -= dt
  if (refreshInterval <= 0) {
    getActiveVideoStreams({}).then(({ streams }) => {
      if (streams.length > 0) {
        let streamToActivate: { identity: string; trackSid: string; sourceType: VideoTrackSourceType } | undefined =
          streams.find((streamItem) => streamItem.sourceType === 2)
        console.log('streamToActivate screen :>> ', streamToActivate)
        if (streamToActivate) {
          if (streamToActivate.trackSid !== selectedStream) handleChangeTrack(streamToActivate.trackSid)
        } else {
          streamToActivate = streams.find((streamItem) => streamItem.sourceType === 1)
          console.log('streamToActivate camera :>> ', streamToActivate)
          if (streamToActivate) {
            if (streamToActivate.trackSid !== selectedStream) handleChangeTrack(streamToActivate.trackSid)
          }
        }
      }
    })
    refreshInterval = REFRESH_INTERVAL
  }
}

export function handleChangeTrack(streamTrackSid: string) {
  console.log('handleChangeTrack streamTrackSid :>> ', streamTrackSid)
  selectedStream = streamTrackSid
  screensInstances.screens.forEach((screenItem) => {
    if (
      screenItem.screen.resource &&
      screenItem.screen.resource[screenItem.screen.counter].type === ScreenFormatEnum.cast_stream
    ) {
      screenItem.screen.startVideoPlaying()
    }
  })
}
