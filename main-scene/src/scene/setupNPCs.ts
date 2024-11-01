import { engine, GltfContainer, Transform, VisibilityComponent } from '@dcl/ecs'
import * as npc from 'dcl-npc-toolkit'
import { closeDialog } from 'dcl-npc-toolkit/dist/dialog'
import { openExternalUrl } from '~system/RestrictedActions'
import { allSavedEntity } from '../states/states'
import { HELP_LINKS } from './constants'
import { callbackAI } from '../quests/src/questHandler'
import { BASE_URL } from '../../deployConfig'
import { AREA_SYSTEM } from 'daohq-shared/Components/AreaTrigger'
import { AREA_TRIGGER_ID } from './constants/areaConfig'

export function setupHelpCenterNPC() {
  const helpCenterNPCEntity = allSavedEntity.get('npc_assistant.001')
  let { position, rotation } = Transform.get(helpCenterNPCEntity!)
  const dialog = [
    {
      text: 'Welcome to DAO HQ where community meets innovation, fostering decentralization and collaboration. Choose the subject to explore more',
      isQuestion: true,
      buttons: Object.entries(HELP_LINKS).map(([name, link]) => ({
        label: name,
        goToDialog: 0,
        size: 100,
        triggeredActions: () => openExternalUrl({ url: link }).then(() => closeDialog(helpCenterNPC))
      })),
      triggeredByNext: () => closeDialog(helpCenterNPC),
      typeSpeed: 60
    }
  ]
  const helpCenterNPC = npc.create(
    { position, rotation },
    {
      type: npc.NPCType.CUSTOM,
      model: GltfContainer.get(helpCenterNPCEntity!),
      idleAnim: 'stand',
      portrait: {
        path: 'images/portraits/npc_assistant_icon.png',
        height: 350,
        width: 350,
        offsetX: -100,
        offsetY: -20
      },
      onActivate: () => {
        callbackAI()
        npc.talk(helpCenterNPC, dialog)
        npc.playAnimation(helpCenterNPC, 'talk', true, 2.66)
      },
      hoverText: 'TALK',
      onlyClickTrigger: true,
      faceUser: true
    }
  )
  VisibilityComponent.createOrReplace(helpCenterNPC, { visible: false })
  allSavedEntity.delete('npc_assistant.001')
  engine.removeEntity(helpCenterNPCEntity!)
  AREA_SYSTEM.registerEnterEvent(AREA_TRIGGER_ID.HELP_CENTER, (_) => {
    npc.playAnimation(helpCenterNPC, 'idle1', true, 7.33)
    VisibilityComponent.createOrReplace(helpCenterNPC, { visible: true })
  })
  AREA_SYSTEM.registerExitEvent(AREA_TRIGGER_ID.HELP_CENTER, (_) => {
    closeDialog(helpCenterNPC)
    VisibilityComponent.createOrReplace(helpCenterNPC, { visible: false })
  })
}

export function setupBookingNPCs() {
  const splitBaseUrl: string[] = BASE_URL.split('/')
  splitBaseUrl.pop()
  const baseHostName: string = splitBaseUrl.join('/')

  const npcModelEntities = [1001, 1101].map((id) => allSavedEntity.get(`npc_librarian03.${id}`))
  for (const entity of npcModelEntities) {
    VisibilityComponent.create(entity!, { visible: false })
    let { position, rotation } = Transform.get(entity!)
    const dialog = [
      {
        text: "Welcome, my friend! If you're here for an event, check the EVENT BOARD next to me. To host your own event, book one of the available spaces.",
        isQuestion: true,
        buttons: [
          {
            label: 'Close',
            goToDialog: 0,
            size: 100,
            triggeredActions: () => closeDialog(bookingNPC)
          },
          {
            label: 'Book',
            goToDialog: 0,
            size: 100,
            triggeredActions: () =>
              openExternalUrl({ url: `${baseHostName}/booking` }).then(() => closeDialog(bookingNPC))
          }
        ],
        triggeredByNext: () => closeDialog(bookingNPC),
        typeSpeed: 60
      }
    ]
    const bookingNPC = npc.create(
      { position, rotation },
      {
        type: npc.NPCType.CUSTOM,
        model: GltfContainer.get(entity!),
        idleAnim: 'stand',
        portrait: {
          path: 'images/portraits/npc_librarian03_icon.png',
          height: 350,
          width: 350,
          offsetX: -100,
          offsetY: -20
        },
        onActivate: () => {
          npc.talk(bookingNPC, dialog)
          npc.playAnimation(bookingNPC, 'talk', true, 2)
        },
        onlyClickTrigger: true,
        faceUser: true
      }
    )
  }
}
