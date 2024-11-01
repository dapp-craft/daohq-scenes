import * as npc from 'dcl-npc-toolkit'
import { Entity, GltfContainer, Transform, VisibilityComponent, engine } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { AnimatorNPC } from './animationNPC'
import { npcSpawnPoint, NPC_MODEL, soundsPath, NPC_DIALOG_RADIUS } from './questConfig'
import { dialogState, selectedEntityState } from './questState'
import { triggerQuestItemAnimation } from './questHandler'
import { day1 } from './dayOneDialogs'

export let myNPC: Entity
export let androidNPC: Entity
export let animationController: any

export const createQuestNpc = () => {
  myNPC = npc.create(
    {
      position: Vector3.create(...npcSpawnPoint),
      scale: Vector3.create(1, 1, 1)
    },
    {
      type: npc.NPCType.CUSTOM,
      model: NPC_MODEL,
      portrait: {
        path: 'images/portraits/npc_astronaut_icon.png',
        height: 350,
        width: 350,
        offsetX: -100,
        offsetY: -20
      },
      onActivate: () => {
        GltfContainer.getMutable(myNPC).src = ''
        animationController.player_talk = true
        npc.talk(myNPC, dialogState.dialog, dialogState.pointer)
      },
      onWalkAway: () => {
        GltfContainer.getMutable(myNPC).src = NPC_MODEL
        animationController.player_talk = false
      },
      reactDistance: NPC_DIALOG_RADIUS,
      onlyClickTrigger: true,
      coolDownDuration: 1,
      faceUser: true,
      hoverText: 'TALK',
      dialogSound: soundsPath.voiceNPC
    }
  )
  VisibilityComponent.create(myNPC, { visible: false })
  animationController = new AnimatorNPC({ parent: myNPC }, NPC_MODEL)
  engine.addSystem(animationController.update.bind(animationController))
}

export const createAndroidNpc = () => {
  androidNPC = npc.create(
    {
      position: Transform.get(selectedEntityState.android[0]).position,
      scale: Vector3.create(1, 1, 1)
    },
    {
      type: npc.NPCType.CUSTOM,
      portrait: {
        path: 'images/portraits/npc_android_icon.png',
        height: 350,
        width: 350,
        offsetX: -100,
        offsetY: -20
      },
      onActivate: () => {
        npc.openDialogWindow(androidNPC, day1, 19)
      },
      onWalkAway: () => {
        if (dialogState.androidAlive && !dialogState.androidAnimationStarted) {
          triggerQuestItemAnimation(selectedEntityState.android[0], 'stand')
          dialogState.androidAnimationStarted = true
        }
      },
      onlyClickTrigger: true,
      hoverText: 'TALK',
      dialogSound: 'voiceAndroid'
    }
  )
}
