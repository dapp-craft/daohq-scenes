import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import {
  engine,
  MeshRenderer,
  MeshCollider,
  Transform,
  TransformComponent,
  TransformType,
  Entity,
  Material,
  TextShape,
  Font,
  TextAlignMode,
  PointerEvents,
  pointerEventsSystem,
  InputAction,
  GltfContainer,
  TextureFilterMode,
  TextureWrapMode,
  MaterialTransparencyMode
} from '@dcl/sdk/ecs'
import { NFTSeverClient, LandOrder } from '../../marketplaceClient'
import { openExternalUrl } from '~system/RestrictedActions'

const MARKETPLACE_URL = 'https://decentraland.org/marketplace'

export class EstateBoard {
  private entity: Entity
  private data: LandOrder
  private position: TransformType

  // Text entity
  private nameTextEntity: Entity
  private priceTextEntity: Entity
  private chainTextEntity: Entity
  private landCountTextEntity: Entity

  private imageEntity: Entity
  constructor(model: string, pos: TransformType, data: LandOrder) {
    this.position = pos
    this.data = data

    this.entity = engine.addEntity()
    Transform.create(this.entity, pos)
    GltfContainer.create(this.entity, {
      src: model
    })

    pointerEventsSystem.onPointerDown(
      {
        entity: this.entity,
        opts: { button: InputAction.IA_POINTER, hoverText: 'GO TO' }
      },
      () => {
        openExternalUrl({ url: MARKETPLACE_URL + this.data.nft.url })
      }
    )

    // Set texture
    this.imageEntity = engine.addEntity()
    Transform.create(this.imageEntity, {
      position: Vector3.create(0, 1.75, 0.07),
      scale: Vector3.create(-2, 2, 2),
      parent: this.entity
    })
    MeshRenderer.setPlane(this.imageEntity)

    Material.createOrReplace(this.imageEntity, {
      material: {
        $case: 'pbr',
        pbr: {
          texture: {
            tex: {
              $case: 'texture',
              texture: { src: this.data.nft.image, filterMode: TextureFilterMode.TFM_TRILINEAR }
            }
          },
          emissiveColor: Color4.White(),
          emissiveIntensity: 0.9,
          emissiveTexture: {
            tex: {
              $case: 'texture',
              texture: { src: this.data.nft.image, filterMode: TextureFilterMode.TFM_TRILINEAR }
            }
          },
          roughness: 1.0,
          specularIntensity: 0,
          metallic: 0
        }
      }
    })

    // Set plain text
    this.nameTextEntity = engine.addEntity()
    Transform.create(this.nameTextEntity, {
      position: Vector3.create(0.85, 0.55, 0.06),
      scale: Vector3.create(-1, 1, 1),
      parent: this.entity
    })
    TextShape.create(this.nameTextEntity, {
      text: validateName(this.data.nft.name),
      fontSize: 1.2,
      textAlign: TextAlignMode.TAM_BOTTOM_LEFT,
      textColor: Color4.White()
    })

    this.chainTextEntity = engine.addEntity()
    Transform.create(this.chainTextEntity, {
      position: Vector3.create(0.85, 0.45, 0.06),
      scale: Vector3.create(-1, 1, 1),
      parent: this.entity
    })
    TextShape.create(this.chainTextEntity, {
      text: this.data.nft.network,
      fontSize: 0.7,
      textAlign: TextAlignMode.TAM_BOTTOM_LEFT,
      textColor: Color4.Gray()
    })

    this.priceTextEntity = engine.addEntity()
    Transform.create(this.priceTextEntity, {
      position: Vector3.create(-0.85, 0.55, 0.06),
      scale: Vector3.create(-1, 1, 1),
      parent: this.entity
    })
    TextShape.create(this.priceTextEntity, {
      text: shortenNumber(this.data.order.price / 10 ** 18), // Convert from wei to eth
      fontSize: 1.2,
      textAlign: TextAlignMode.TAM_BOTTOM_RIGHT,
      textColor: Color4.White()
    })

    this.landCountTextEntity = engine.addEntity()
    Transform.create(this.landCountTextEntity, {
      position: Vector3.create(0.85, 0.2, 0.06),
      scale: Vector3.create(-1, 1, 1),
      parent: this.entity
    })
    TextShape.create(this.landCountTextEntity, {
      text: this.data.nft.data!.estate!.size + ' LAND',
      fontSize: 1.2,
      textAlign: TextAlignMode.TAM_BOTTOM_LEFT,
      textColor: Color4.White()
    })
  }

  public terminate() {
    engine.removeEntity(this.entity)
    engine.removeEntity(this.nameTextEntity)
    engine.removeEntity(this.priceTextEntity)
    engine.removeEntity(this.chainTextEntity)
    engine.removeEntity(this.landCountTextEntity)
    engine.removeEntity(this.imageEntity)
  }
}

function shortenNumber(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(2).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

function validateName(name: string): string {
  // Capitalize first letter
  name = name.charAt(0).toUpperCase() + name.slice(1)
  // Delete all emojis
  name = name.replace(/[^\u0000-\u007F]/g, '')

  if (name.length > 14) {
    return name.substring(0, 14) + '...'
  }
  return name
}
