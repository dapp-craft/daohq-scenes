import {
  raycastSystem,
  engine,
  ColliderLayer,
  RaycastQueryType,
  Entity,
  Schemas,
  GltfContainer,
  MeshCollider,
  Transform
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'

const COLLISION_LAYER = ColliderLayer.CL_CUSTOM1

const AreaTrigger = engine.defineComponent('areaTrigger', {
  areaId: Schemas.String
})

export type TriggerEvent = (area: string) => void
export let AREA_SYSTEM: AreaSystem
export class AreaSystem {
  private enterEvents: Map<string, TriggerEvent[]> = new Map()
  private exitEvents: Map<string, TriggerEvent[]> = new Map()

  private currentArea: string[] = []
  public get currentAreaId(): string[] {
    return this.currentArea
  }

  static create(): void {
    AREA_SYSTEM = new AreaSystem()
  }

  static registerEntity(entity: Entity, id: string): void {
    if (AreaTrigger.getMutableOrNull(entity)) {
      return
    }

    AreaTrigger.create(entity, {
      areaId: id
    })

    if (GltfContainer.getMutableOrNull(entity)) {
      GltfContainer.getMutable(entity).visibleMeshesCollisionMask = COLLISION_LAYER
    }

    if (MeshCollider.getMutableOrNull(entity)) {
      MeshCollider.getMutable(entity).collisionMask = COLLISION_LAYER
    }
  }

  constructor() {
    this.setRaycastSystem()
  }

  /**
   * Register an event to be triggered when an entity enters a specified area.
   * @param area - The area identifier.
   * @param event - The event function to be executed when the entity enters the area.
   */
  public registerEnterEvent(area: string, event: TriggerEvent): void {
    if (!this.enterEvents.has(area)) {
      this.enterEvents.set(area, [])
    }
    this.enterEvents.get(area)!.push(event)
  }

  /**
   * Register an event to be triggered when an entity exits a specified area.
   * @param area - The area identifier.
   * @param event - The event function to be executed when the entity exits the area.
   */
  public registerExitEvent(area: string, event: TriggerEvent): void {
    if (!this.exitEvents.has(area)) {
      this.exitEvents.set(area, [])
    }
    this.exitEvents.get(area)!.push(event)
  }

  /**
   * Unregister an event from being triggered when an entity enters a specified area.
   * @param area - The area identifier.
   * @param event - The event function to be removed.
   */
  public unregisterEnterEvent(area: string, event: TriggerEvent): void {
    if (this.enterEvents.has(area)) {
      const events = this.enterEvents.get(area)
      this.enterEvents.set(
        area,
        events!.filter((e) => e !== event)
      )
    }
  }

  /**
   * Unregister an event from being triggered when an entity exits a specified area.
   * @param area - The area identifier.
   * @param event - The event function to be removed.
   */
  public unregisterExitEvent(area: string, event: TriggerEvent): void {
    if (this.exitEvents.has(area)) {
      const events = this.exitEvents.get(area)
      this.exitEvents.set(
        area,
        events!.filter((e) => e !== event)
      )
    }
  }

  /**
   * Method to be called when an entity enters an area.
   * Executes all registered enter events for that area.
   * @param area - The area identifier.
   */
  private onEntityEnter(area: string): void {
    if (this.enterEvents.has(area)) {
      this.enterEvents.get(area)!.forEach((event) => event(area))
    }
  }

  /**
   * Method to be called when an entity exits an area.
   * Executes all registered exit events for that area.
   * @param area - The area identifier.
   */
  private onEntityExit(area: string): void {
    if (this.exitEvents.has(area)) {
      this.exitEvents.get(area)!.forEach((event) => event(area))
    }
  }

  private setRaycastSystem(): void {
    raycastSystem.registerGlobalDirectionRaycast(
      {
        entity: engine.PlayerEntity,
        opts: {
          direction: Vector3.Down(),
          collisionMask: COLLISION_LAYER,
          queryType: RaycastQueryType.RQT_QUERY_ALL,
          maxDistance: 15,
          continuous: true
        }
      },
      (res) => {
        let hitAreas: string[] = []
        ;(res.hits as Array<any>).sort((a: any, b: any) => b.position.y - a.position.y)
        res.hits.forEach((hit) => {
          const areaTrigger = AreaTrigger.getOrNull(hit?.entityId as Entity)
          if (areaTrigger) {
            hitAreas.push(areaTrigger.areaId)
          }
        })

        const enteredAreas = hitAreas.filter((area) => !this.currentArea.includes(area))
        const exitedAreas = this.currentArea.filter((area) => !hitAreas.includes(area))

        exitedAreas.forEach((area) => {
          this.onEntityExit(area)
        })
        enteredAreas.forEach((area) => {
          this.onEntityEnter(area)
        })

        this.currentArea = hitAreas
      }
    )
  }
}
