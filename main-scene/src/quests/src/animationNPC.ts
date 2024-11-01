import {
  Animator,
  ColliderLayer,
  Entity,
  GltfContainer,
  MeshCollider,
  PBAnimationState,
  Transform,
  TransformType,
  engine
} from '@dcl/sdk/ecs'
import { CLIP_DATA1 } from './clip_data1'
enum states {
  Idle,
  Stand,
  Talk,
  Walk
}
export class AnimatorNPC {
  public player_talk: boolean = false
  public player_walk: boolean = false
  private mainEntity: Entity
  public get thisEntity() {
    return this.mainEntity
  }
  private current_state: states
  public showtime: boolean = false
  constructor(transform: Partial<TransformType>, model: string) {
    this.current_state = states.Stand
    this.mainEntity = engine.addEntity()
    Transform.create(this.mainEntity, transform)
    GltfContainer.create(this.mainEntity, {
      src: model,
      invisibleMeshesCollisionMask: ColliderLayer.CL_CUSTOM1,
      visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
    })
    MeshCollider.setBox(this.mainEntity)

    Animator.create(this.mainEntity, {
      states: [
        { clip: 'stand', loop: true, playing: true, weight: 1 },
        { clip: 'idle2', loop: true, playing: true, weight: 0 },
        { clip: 'talk', loop: true, playing: true, weight: 0 },
        { clip: 'idle1', loop: true, playing: true, weight: 0 },
        { clip: 'walk', loop: true, playing: true, weight: 0 }
      ]
    })
  }
  private timer: number = 0
  update(dt: number): void {
    this.timer += dt
    const value = dt * 1.5
    switch (this.current_state) {
      case states.Stand:
        if (this.player_talk) {
          this.timer = 0
          this.current_state = states.Talk
        } else if (this.player_walk) {
          this.timer = 0
          this.current_state = states.Walk
        } else {
          this.addWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.stand.name), value)
          this.removeWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.idle1.name), value)
          this.removeWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.talk1.name), value)
          this.removeWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.talk2.name), value)
          this.removeWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.walk.name), value)
        }
        break
      case states.Idle:
        if (this.timer >= CLIP_DATA1.idle1.length) {
          this.timer = 0
          this.current_state = states.Stand
        } else if (this.player_walk) {
          this.timer = 0
          this.current_state = states.Walk
        } else if (this.player_talk) {
          this.timer = 0
          this.current_state = states.Talk
        } else {
          this.addWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.idle1.name), value)
          this.removeWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.stand.name), value)
          this.removeWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.talk1.name), value)
          this.removeWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.talk2.name), value)
          this.removeWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.walk.name), value)
        }
        break
      case states.Walk:
        if (!this.player_walk) {
          this.timer = 0
          this.current_state = states.Stand
        } else if (this.player_talk) {
          this.timer = 0
          this.current_state = states.Talk
        } else {
          this.addWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.walk.name), value)
          this.removeWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.stand.name), value)
          this.removeWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.talk1.name), value)
          this.removeWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.talk2.name), value)
        }
        break
      case states.Talk:
        if (!this.player_talk) {
          this.timer = 0
          this.current_state = states.Stand
        } else if (this.player_walk) {
          this.timer = 0
          this.current_state = states.Walk
        } else {
          this.addWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.talk2.name), value)
          this.removeWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.talk1.name), value)
          this.removeWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.idle1.name), value)
          this.removeWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.stand.name), value)
          this.removeWeight(Animator.getClip(this.mainEntity, CLIP_DATA1.walk.name), value)
        }
        break
    }
  }
  private removeWeight(animation: PBAnimationState, value: number) {
    if (animation.weight == undefined) return
    if (animation.weight <= 0) animation.weight = 0
    else animation.weight -= value
  }
  private addWeight(animation: PBAnimationState, value: number) {
    if (animation.weight == undefined) return
    if (animation.weight >= 1) animation.weight = 1
    else animation.weight += value
  }
}
