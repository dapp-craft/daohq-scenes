import * as npc from 'dcl-npc-toolkit'
import { Entity, pointerEventsSystem, InputAction, PointerEvents } from '@dcl/sdk/ecs'
import { questMark } from './questHandler'
import { dialogState } from './questState'
import { SOUND_MANAGER } from '../../states/states'
import { myNPC } from './npc'
import { systemDialog } from './systemDialog'

interface additionDialog {
  npc: Entity
  dialog: any
  pointer: number
}

export class QuestClicker {
  private clickCounter = 0
  private clickAmount = 0
  private entities: Array<Entity>
  private text: string
  private afterClick: Function
  private resolveReady!: () => void
  private questDone: Promise<void>
  private resourceClicks = 0
  private resourceAmount = 0
  private reverseCounter = 0
  private additionEntityClicks = 0
  private additionEntityClicksCounter = 0
  private randomClicks: boolean = false
  private reqStatus = false
  private arguments: any
  private reqCallback: Function | undefined
  private isCounterReverse: boolean
  private additionDialog: additionDialog | undefined
  private soundQuest: any
  private soundVolume: any
  private usedEntity: Array<Entity> = []
  private playCompliteQuestSound: boolean | undefined
  private getHintQuest: { entity: Array<Entity>; systemDialogPoint: number; hoverText?: string } | undefined = undefined
  private hoverText: string = 'Click'

  constructor(
    questData: {
      amountClicks: number
      entities: Array<Entity>
      text: string
      afterClick: Function
      reqCallback?: any
      additionEntityClicks?: number
      resourceAmount?: number
      randomClicks?: boolean
      reverse?: boolean
      additionDialog?: additionDialog
      questSoundURL?: any
      soundVolume?: number
      playCompliteQuestSound?: boolean
      hoverText?: string
      getHint?: { entity: Array<Entity>; systemDialogPoint: number; hoverText?: string }
    },
    ...args: any[]
  ) {
    this.clickAmount = questData.amountClicks
    this.clickCounter = this.clickAmount
    this.text = questData.text
    this.afterClick = questData.afterClick
    this.entities = questData.entities
    this.arguments = args
    this.isCounterReverse = questData.reverse || true
    this.resourceAmount = questData.resourceAmount || 0
    this.resourceClicks = questData.resourceAmount || 0
    this.additionDialog = questData.additionDialog || undefined
    this.additionEntityClicks = questData.additionEntityClicks || 0
    this.additionEntityClicksCounter = this.additionEntityClicks
    this.randomClicks = questData.randomClicks || false
    this.reqCallback = questData.reqCallback || (() => {})
    this.questDone = new Promise((res) => {
      this.resolveReady = res
    })
    this.soundQuest = questData.questSoundURL || undefined
    this.soundVolume = questData.soundVolume
    this.playCompliteQuestSound = questData.playCompliteQuestSound == false ? questData.playCompliteQuestSound : true
    this.getHintQuest = questData.getHint || undefined
    if (questData.hoverText != undefined) this.hoverText = questData.hoverText
  }

  private async additionalReq(reqCallback: any) {
    this.entities = this.entities.filter((element) => !this.usedEntity.includes(element))
    this.entities.forEach((e) => PointerEvents.deleteFrom(e))
    this.reqStatus = await reqCallback(...this.arguments)
    this.entities.forEach((entity) => this.attachClickEvent(entity))
    this.updateDialogState()
    this.resourceClicks = this.resourceAmount
    questMark()
  }

  public async startQuest() {
    questMark()
    dialogState.questUiHudVisible = true
    if (this.resourceAmount != 0) await this.additionalReq(this.reqCallback)
    this.updateDialogState()
    this.getHint()
    this.entities.forEach((entity) => this.attachClickEvent(entity))
    await this.questDone
    this.questDone = new Promise((r) => (this.resolveReady = r))
    return true
  }

  private async attachClickEvent(entity: Entity) {
    pointerEventsSystem.onPointerDown(
      {
        entity,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: this.hoverText
        }
      },
      () => {
        if (
          !this.randomClicks
            ? this.additionEntityClicksCounter != 0
            : this.additionEntityClicksCounter != Math.floor(Math.random() * this.additionEntityClicksCounter) + 1
        ) {
          if (this.additionDialog) {
            npc.openDialogWindow(this.additionDialog.npc, this.additionDialog.dialog, this.additionDialog.pointer)
            this.additionDialog = undefined
          }
          this.additionEntityClicksCounter--
          return this.afterClick(entity, ...this.arguments, true)
        }
        this.soundQuest && SOUND_MANAGER.playSound(this.soundQuest, this.soundVolume)
        pointerEventsSystem.removeOnPointerDown(entity)
        this.additionEntityClicksCounter = this.additionEntityClicks
        if (this.reqStatus && this.resourceClicks <= 0) return this.additionalReq(this.reqCallback)
        this.usedEntity.push(entity)
        this.updateClickCounters()
        this.updateDialogState()
        this.afterClick(entity, ...this.arguments)
        if (this.reverseCounter >= this.clickCounter) this.endQuest()
        if (this.reqStatus && this.resourceClicks <= 0) return this.additionalReq(this.reqCallback)
      }
    )
  }

  private getHint() {
    if (!this.getHintQuest) return
    console.log('GET HINT')
    this.getHintQuest.entity.forEach((entity) => {
      pointerEventsSystem.onPointerDown(
        {
          entity,
          opts: {
            button: InputAction.IA_POINTER,
            hoverText: this.getHintQuest?.hoverText ? this.getHintQuest?.hoverText : 'Click'
          }
        },
        () => {
          npc.openDialogWindow(myNPC, systemDialog, this.getHintQuest?.systemDialogPoint)
        }
      )
    })
  }

  private updateClickCounters() {
    !this.isCounterReverse ? this.clickCounter-- : this.reverseCounter++
    this.resourceClicks--
  }

  private updateDialogState() {
    dialogState.uiText = {
      text: this.text,
      counter: !this.isCounterReverse ? this.clickCounter : this.reverseCounter,
      amount: this.clickAmount
    }
  }

  private endQuest() {
    console.log('END OF QUEST')
    this.entities.forEach((entity) => pointerEventsSystem.removeOnPointerDown(entity))
    questMark(true)
    this.playCompliteQuestSound && SOUND_MANAGER.playSound('updateTask', 0.3)
    if (this.getHintQuest) this.getHintQuest.entity.forEach((entity) => pointerEventsSystem.removeOnPointerDown(entity))
    this.resolveReady()
  }
}
