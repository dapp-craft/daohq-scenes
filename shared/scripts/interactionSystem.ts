import { InputAction, Transform, engine, inputSystem, PointerEventType, PointerEvents, Entity } from '@dcl/sdk/ecs'
import { movePlayerTo, triggerSceneEmote } from '~system/RestrictedActions'
import { Vector3 } from '@dcl/sdk/math'

interface EntityStartIndex {
  startIndex: number
  modelname: string
}

export class InteractionSystem {
  private allSavedEntity: Map<string, Entity>
  private entityNames: Array<string>
  private entityStartIndex: Array<EntityStartIndex>
  private pufferList: Map<Entity, string> = new Map([])
  private animation: any

  constructor(data: {
    allSavedEntity: Map<string, Entity>
    entityNames: Array<string>
    entityStartIndex: Array<EntityStartIndex>
    animation: any
  }) {
    this.allSavedEntity = data.allSavedEntity
    this.entityNames = data.entityNames
    this.entityStartIndex = data.entityStartIndex
    this.animation = data.animation
    this.initialize()
  }

  private loadEntities() {
    const entities: Array<Entity> = []
    this.entityNames.forEach((name) => {
      entities.push(...this.filterEntityByNameAndId(name))
    })
    this.entityStartIndex.forEach((model) => {
      entities.push(...this.filterEntityByNameAndId(model.modelname, model.startIndex))
    })
    return entities
  }

  private filterEntityByNameAndId(name: string, startIndex: number = 0) {
    let res: Array<Entity> = []
    let i = 0
    while (true) {
      i++
      const id = i >= 10 ? `${startIndex}${i}` : `${startIndex}0${i}`
      // console.log(name + '.' + id)
      const entity = this.allSavedEntity.get(name + '.' + id)
      if (entity !== undefined) {
        name == 'obj_puffer' && this.pufferList.set(entity, id)
        res.push(entity)
      } else return res
    }
  }

  private initialize() {
    const benches = this.loadEntities()
    benches.forEach((entity) =>
      PointerEvents.create(entity, {
        pointerEvents: [
          {
            eventType: PointerEventType.PET_DOWN,
            eventInfo: { hoverText: 'SIT', maxDistance: 5 }
          }
        ]
      })
    )

    engine.addSystem(() => {
      const event = inputSystem.getInputCommand(InputAction.IA_ANY, PointerEventType.PET_DOWN)
      if (event == null) return
      const entityId = event.hit?.entityId as Entity
      if (
        benches.find(
          (entity) =>
            entity === entityId &&
            (InputAction.IA_POINTER === event.button ||
              InputAction.IA_SECONDARY === event.button ||
              InputAction.IA_PRIMARY === event.button)
        )
      ) {
        let entityData = Transform.getMutable(entityId)
        const pos = Vector3.scale(
          Vector3.rotate(Vector3.Left(), entityData.rotation),
          this.pufferList.has(entityId) ? 1 : 0.5
        )
        triggerSceneEmote({ src: this.animation, loop: true })
        const playerPos = Vector3.add(entityData.position, pos)
        playerPos.y = playerPos.y + (this.pufferList.has(entityId) ? 0.5 : 1)
        movePlayerTo({
          newRelativePosition: playerPos,
          cameraTarget: Vector3.add(entityData.position, Vector3.scale(pos, 2))
        })
        Transform.getMutable(engine.PlayerEntity).rotation = entityData.rotation
      }
    })
  }
}
