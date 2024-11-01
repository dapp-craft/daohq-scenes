import {
  engine,
  Entity,
  GltfContainer,
  InputAction,
  Material,
  MeshRenderer,
  pointerEventsSystem,
  TextAlignMode,
  TextShape,
  TextureFilterMode,
  Transform
} from '@dcl/sdk/ecs'
import { IPosterInfo, SceneTransform } from '../../types'
import { teleportTo } from '~system/RestrictedActions'
import { Color4 } from '@dcl/sdk/math'
import { IBookingItem } from '../Screen/types'
import { parseLocationIdentifier } from '../../scripts/locationIdentifier'
import { teleportToRealmState } from '../../globals'
import { toggleTeleportToRealmConfirm } from '../../uiComponents/teleportToRealmConfirm'

let getPosterInfoProps: (locationId: string) => Promise<IPosterInfo>
export const setPosterInfoProps = (callback: (locationId: string) => Promise<IPosterInfo>) => {
  getPosterInfoProps = callback
}

export class EventPoster {
  private eventInfo: IPosterInfo = {} as any
  readonly locationId: string
  private transform: SceneTransform

  private defaultImage = 'images/materials/empty_config.png'

  // Timer to blink the live text
  blinkInterval: number = 1 //seconds
  private blinkTimer: number = 0

  // Interval to update the time left
  timeLeftUpdateInterval: number = 1 //seconds
  private timeLeftUpdateTimer: number = 0

  // Entities
  private mainEntity: Entity = engine.addEntity()
  private imageE: Entity | null = null
  private titleTextE = engine.addEntity()
  private dateTextE = engine.addEntity()
  private timeTextE = engine.addEntity()
  private descriptionTextE = engine.addEntity()
  private limeLeftTextE = engine.addEntity()

  constructor(locationId: string, transform: SceneTransform) {
    this.locationId = locationId
    this.transform = transform

    Transform.create(this.mainEntity, this.transform)
    GltfContainer.create(this.mainEntity, { src: 'models/obj_events.gltf' })

    engine.addSystem(this.update)

    this.updateContent()
  }

  public setContent(eventInfo: IBookingItem): void {
    this.eventInfo.closestBooking = eventInfo
    this.terminateAdditionalEntities()
    this.createPoster()
  }

  public async updateContent(): Promise<void> {
    // TODO: validate fetched content
    const eventInfoRes = await getPosterInfoProps(this.locationId)
    if (!eventInfoRes) {
      return
    }
    this.eventInfo.sceneInfo = eventInfoRes.sceneInfo
    this.setContent(eventInfoRes.closestBooking as any)
  }

  private createPoster(): void {
    pointerEventsSystem.onPointerDown(
      {
        entity: this.mainEntity,
        opts: { button: InputAction.IA_POINTER, hoverText: 'GO TO EVENT' }
      },
      () => {
        if (this.eventInfo.sceneInfo?.scene) {
          const locationData = parseLocationIdentifier(this.eventInfo.sceneInfo.scene)
          if (locationData.realm) {
            teleportToRealmState.locationId = this.locationId
            teleportToRealmState.realmToTeleport = locationData.realm
            teleportToRealmState.sceneInfo = this.eventInfo.sceneInfo
            toggleTeleportToRealmConfirm()
          } else teleportTo({ worldCoordinates: locationData.coordinates })
        }
      }
    )

    this.imageE = engine.addEntity()
    Transform.create(this.imageE, {
      position: { x: 0, y: 1.85, z: 0.07 },
      scale: { x: -2.9, y: 1.8, z: 1 },
      parent: this.mainEntity
    })

    // Image
    MeshRenderer.setPlane(this.imageE)
    Material.createOrReplace(this.imageE, {
      material: {
        $case: 'pbr',
        pbr: {
          texture: {
            tex: {
              $case: 'texture',
              texture: { src: this.getImageUrl(), filterMode: TextureFilterMode.TFM_TRILINEAR }
            }
          },
          emissiveColor: Color4.White(),
          emissiveIntensity: 0.9,
          emissiveTexture: {
            tex: {
              $case: 'texture',
              texture: { src: this.getImageUrl(), filterMode: TextureFilterMode.TFM_TRILINEAR }
            }
          },
          roughness: 1.0,
          specularIntensity: 0,
          metallic: 0
        }
      }
    })

    const texts = this.getText()
    // Title text
    this.titleTextE = engine.addEntity()
    Transform.create(this.titleTextE, {
      position: { x: 0, y: 0.8, z: 0.07 },
      scale: { x: -1, y: 1, z: 1 },
      parent: this.mainEntity
    })
    TextShape.create(this.titleTextE, {
      text: texts['title'],
      textColor: Color4.White(),
      fontSize: 1.5,
      textAlign: TextAlignMode.TAM_MIDDLE_CENTER
    })

    // Date text
    this.dateTextE = engine.addEntity()
    Transform.create(this.dateTextE, {
      position: { x: 1.35, y: 0.25, z: 0.07 },
      scale: { x: -1, y: 1, z: 1 },
      parent: this.mainEntity
    })
    TextShape.create(this.dateTextE, {
      text: texts['date'],
      textColor: Color4.White(),
      fontSize: 1.2,
      textAlign: TextAlignMode.TAM_MIDDLE_LEFT
    })

    // Time text
    this.timeTextE = engine.addEntity()
    Transform.create(this.timeTextE, {
      position: { x: -1.35, y: 0.25, z: 0.07 },
      scale: { x: -1, y: 1, z: 1 },
      parent: this.mainEntity
    })
    TextShape.create(this.timeTextE, {
      text: texts['time'],
      textColor: Color4.White(),
      fontSize: 1.2,
      textAlign: TextAlignMode.TAM_MIDDLE_RIGHT
    })

    // Description text
    this.descriptionTextE = engine.addEntity()
    Transform.create(this.descriptionTextE, {
      position: { x: 0, y: 0.45, z: 0.07 },
      scale: { x: -1, y: 1, z: 1 },
      parent: this.mainEntity
    })
    TextShape.create(this.descriptionTextE, {
      text: texts['description'],
      textColor: Color4.Gray(),
      fontSize: 0.9,
      textAlign: TextAlignMode.TAM_MIDDLE_CENTER,
      textWrapping: true,
      width: 2.7,
      lineCount: 3
    })

    // Live text
    this.limeLeftTextE = engine.addEntity()
    Transform.create(this.limeLeftTextE, {
      position: { x: 0, y: 0.25, z: 0.07 },
      scale: { x: -1, y: 1, z: 1 },
      parent: this.mainEntity
    })
    TextShape.create(this.limeLeftTextE, {
      text: texts['timeLeft'],
      textColor: Color4.Red(),
      fontSize: 1.2,
      textAlign: TextAlignMode.TAM_MIDDLE_CENTER
    })
  }

  private getImageUrl(): string {
    if (this.eventInfo.closestBooking?.preview) return this.eventInfo.closestBooking.preview
    if (this.eventInfo.sceneInfo?.preview) return this.eventInfo.sceneInfo.preview
    return this.defaultImage
  }

  public terminate(): void {
    engine.removeEntity(this.mainEntity)
    engine.removeSystem(this.update)
    this.terminateAdditionalEntities()
  }

  private terminateAdditionalEntities(): void {
    if (this.imageE) engine.removeEntity(this.imageE)
    if (this.titleTextE) engine.removeEntity(this.titleTextE)
    if (this.dateTextE) engine.removeEntity(this.dateTextE)
    if (this.timeTextE) engine.removeEntity(this.timeTextE)
    if (this.descriptionTextE) engine.removeEntity(this.descriptionTextE)
    if (this.limeLeftTextE) engine.removeEntity(this.limeLeftTextE)
  }

  private getText() {
    const ret = {
      title: 'No upcoming events',
      date: '--/--/----',
      time: '--:--:-- AM',
      description: 'Book your event now!',
      location: '------',
      live: false,
      timeLeft: ''
    }
    if (!this.eventInfo.closestBooking) return ret
    ret['title'] = this.eventInfo.closestBooking?.title
      ? this.eventInfo.closestBooking.title.length > 22
        ? this.eventInfo.closestBooking.title.slice(0, 22).concat('...')
        : this.eventInfo.closestBooking.title
      : 'No upcoming events'
    ret['date'] = this.eventInfo.closestBooking?.event_date
      ? new Date(this.eventInfo.closestBooking.event_date).toLocaleDateString()
      : '--/--/----'
    ret['time'] = this.eventInfo.closestBooking?.event_date
      ? new Date(this.eventInfo.closestBooking.event_date).toLocaleTimeString()
      : '--:--:-- AM'
    ret['description'] = this.eventInfo.closestBooking?.description
      ? this.eventInfo.closestBooking.description
      : 'Book your event now!'
    ret['location'] = this.eventInfo.closestBooking?.location ? this.eventInfo.closestBooking.location : '------'
    ret['live'] = this.eventInfo.closestBooking?.is_live ? this.eventInfo.closestBooking.is_live : false
    ret['timeLeft'] = this.eventInfo.closestBooking?.is_live
      ? 'Live'
      : String(Math.round((this.eventInfo.closestBooking!.event_date - Date.now()) / 1000))
    return ret
  }

  private update = (dt: number) => {
    // TODO optimize this using event
    if (this.eventInfo.closestBooking?.is_live) {
      this.blinkTimer += dt
      if (this.blinkTimer >= this.blinkInterval) {
        this.blinkTimer = 0
        TextShape.getMutable(this.limeLeftTextE).text =
          TextShape.getMutableOrNull(this.limeLeftTextE)?.text === 'Live' ? ' ' : 'Live'
      }
    } else {
      // Update time left
      if (!TextShape.has(this.limeLeftTextE)) return
      if (!this.eventInfo.closestBooking) return
      this.timeLeftUpdateTimer += dt
      if (this.timeLeftUpdateTimer >= this.timeLeftUpdateInterval) {
        TextShape.getMutable(this.limeLeftTextE).text = formatTime(
          Math.round((this.eventInfo.closestBooking!.event_date - Date.now()) / 1000)
        )
        this.timeLeftUpdateTimer = 0
      }
    }
  }
}

function formatTime(seconds: number): string {
  if (seconds < -10) return 'About to start'
  if (seconds < 60) return `less than a minute`

  const days = Math.floor(seconds / (24 * 60 * 60))
  seconds %= 24 * 60 * 60
  const hours = Math.floor(seconds / (60 * 60))
  seconds %= 60 * 60
  const minutes = Math.floor(seconds / 60)
  seconds %= 60

  if (days > 0) return `in ${days} day${days !== 1 ? 's' : ''}`

  if (hours > 0) return `in ${hours} hour${hours !== 1 ? 's' : ''}`

  if (minutes > 0) return `in ${minutes} minute${minutes !== 1 ? 's' : ''}`

  return 'time format error'
}
