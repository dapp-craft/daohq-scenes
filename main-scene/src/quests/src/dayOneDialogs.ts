import * as utils from '@dcl-sdk/utils'
import * as npc from 'dcl-npc-toolkit'
import { Transform, engine, GltfContainer, pointerEventsSystem, InputAction } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { allSavedEntity, SOUND_MANAGER } from '../../states/states'
import { awaitSavingQuest } from './backendHandler'
import { myNPC, createAndroidNpc, androidNPC } from './npc'
import { entityList } from './questConfig'
import {
  questMark,
  npcFollow,
  followLocators,
  createEntity,
  takeItem,
  deleteTakenitems,
  triggerQuestItemAnimation,
  setSystemDialog
} from './questHandler'
import { QuestClicker } from './Quests'
import { dialogState, selectedEntityState, fixedTeleportList, questModels, entityState } from './questState'
import { systemDialog } from './systemDialog'

export const day1 = [
  {
    text: "Welcome to the DAO Decentraland location! I'm Cosmo, your guide. But it seems you've arrived a bit early; the official opening hasn't happened yet!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: async () => {}
  },
  {
    text: "I'm going to check the date and time now! ... uhm  (mumbling) This can't be! Oh no! It seems I forgot to set my internal clock! ",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false
  },
  {
    text: 'I was supposed to finish some preparations so everything would be perfect for the opening! ',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false
  },
  {
    text: "Please help me finish up the last preparations! There are a few tasks I didn't manage to complete. ",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      await awaitSavingQuest(day1, 4, 0, 'quest1')
      questMark(false)
    }
  },
  {
    text: "While you're here, let's start with the most difficult task! You know, I'm very talented, but I haven't mastered working with plants yet. Follow me - I'll show you where it is. ",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = true
      dialogState.uiText = { text: 'Follow Cosmo to the Showroom' }
      npcFollow(await followLocators('locators/npc_astronaut_path01.gltf'), 12, true, false)
      dialogState.pointer = 5
    }
  },
  {
    text: "A luxurious garden, isn't it? Of course, I'd prefer a rock garden - they require less maintenance. So, let's not waste any time - let's get to work! ",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false
  },
  {
    text: 'Did I not tell you? After landing on the moon, my memory fails me! We need to plant the remaining trees! Explore this showroom and look for seeds under other trees! ',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false
  },
  {
    text: "First and foremost, gather the necessary amount of seeds! Then plant a seed in every hole you find in the showroom.  I'll be waiting for you in the Spawn Point! Don't worry, I'll be busy too – I'll be trying to unravel the mystery of nature! ",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      npcFollow(await followLocators('locators/npc_astronaut_path02.gltf'), 56, false)

      Array.from(allSavedEntity.entries())
        .filter(([key]) => key.startsWith('obj_earth'))
        .map(([key, value]) =>
          selectedEntityState.treeData.forEach((e) => {
            if (JSON.stringify(e.position) == JSON.stringify(Transform.get(value).position))
              selectedEntityState.earth.push(value)
          })
        )

      dialogState.myQuest = new QuestClicker({
        amountClicks: selectedEntityState.seeds.length,
        entities: selectedEntityState.seeds,
        text: 'Collect the required number of seeds',
        afterClick: (...args: any[]) => {
          engine.removeEntity(args[0])
        },
        questSoundURL: 'pickUpSeed',
        hoverText: 'COLLECT',
        getHint: { entity: selectedEntityState.earth, systemDialogPoint: 7 }
      })
      dialogState.pointer = 8
      await dialogState.myQuest.startQuest()

      let seed = await createEntity([{ position: { x: 0, y: 1, z: 0 } }], 'obj_seeds')
      takeItem(seed[0], { disableMash: true })

      dialogState.myQuest = new QuestClicker(
        {
          amountClicks: selectedEntityState.earth.length,
          entities: selectedEntityState.earth,
          text: 'Plant each seed in a hole',
          afterClick: (...args: any[]) => {
            let entityData = Transform.get(args[0])
            args[1].forEach((tree: any) => {
              if (JSON.stringify(Transform.get(tree).position) == JSON.stringify(entityData.position))
                return (Transform.getMutable(tree).scale = Vector3.create(0.86, 0.8622, 0.86))
            })
          },
          questSoundURL: 'growTree',
          hoverText: 'PLANT'
        },
        selectedEntityState.questEntityTrees
      )
      await dialogState.myQuest.startQuest()
      deleteTakenitems()
      selectedEntityState.seeds.forEach((entity) => engine.removeEntity(entity))
      dialogState.uiText = { text: 'Return and talk to Cosmo' }
      dialogState.pointer = 9
    }
  },
  {
    text: "First, you must gather the necessary amount of seeds! Only when you have collected all the seeds can you begin planting. Don't ask me why it has to be this way – I don't understand gardening at all. ",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: "Congratulations! You did a great job! By the way, did you notice the XP awarded? Yes, indeed, you get XP for each completed building. I'll tell you more about this as soon as we complete all of today's tasks. Don't worry - it won't take long at all!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = false
      questMark(false)
      await awaitSavingQuest(day1, 10, 0, 'quest2')
    }
  },
  {
    text: "Now let's take a walk to a very important place! We call it a Space Base! Follow me, and you'll see for yourself!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = true
      dialogState.uiText = { text: 'Follow Cosmo to the Space Base' }
      npcFollow(await followLocators('locators/npc_astronaut_path03.gltf'), 12, true, false)
      dialogState.pointer = 11
    }
  },
  {
    text: "Teleports - the greatest invention! Wouldn't you agree? The Space Base here lets you reach any capsule on the upper level! No more stairs! But first, there's something we need to do… ",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: () => {
      dialogState.pointer = 12
    }
  },
  {
    text: "Another incredibly important task! You'll be a great help if you activate the teleports that are meant for transitioning to the upper level. It's crucial to do this - otherwise, they'll remain switched off! You'll figure it out easily! I'll be waiting for you here!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      npcFollow(await followLocators('locators/npc_astronaut_path04.gltf'), 56, false)
      dialogState.myQuest = new QuestClicker(
        {
          amountClicks: entityList.teleportList,
          entities: selectedEntityState.teleport,
          text: 'Activate each teleport',
          afterClick: (...args: any[]) => {
            GltfContainer.getMutable(args[0]).src = args[1]
            args[3] && SOUND_MANAGER.playSound('teleportTurnOnAttempt')
            if (!args[3]) fixedTeleportList.push(args[0])
            utils.timers.setTimeout(() => {
              GltfContainer.getMutable(args[0]).src = args[3] ? args[2] : args[1]
            }, 100)
          },
          questSoundURL: 'teleportTurnOn',
          additionEntityClicks: 5,
          additionDialog: { npc: myNPC, dialog: systemDialog, pointer: 4 },
          randomClicks: true,
          hoverText: 'ACTIVATE'
        },
        questModels.get('workingTeleport'),
        questModels.get('brokenlTeleportModel')
      )
      dialogState.pointer = 13
      await dialogState.myQuest.startQuest()
      dialogState.teleportActive = true
      dialogState.uiText = { text: 'Return and talk to Cosmo' }
      dialogState.pointer = 14
    }
  },
  {
    text: "Find the teleports with turquoise indicators and activate them. Once you've checked all the necessary teleports, return to me.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: "Excellent! And you've gained even more XP! The transport system is fully activated and ready to receive visitors! Once again, you've done an outstanding job! I'll let you in on a secret - you can also move around the location using the map you'll find in the terminals. And you can even travel on flying shuttles.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = false
      questMark(false)
      await awaitSavingQuest(day1, 15, 0, 'quest3')
    }
  },
  {
    text: "I see you're ready to continue! I really appreciate your enthusiasm! Follow me - I'll show you the next area! ",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      npcFollow(await followLocators('locators/npc_astronaut_path05.gltf'), 28, true, false)
      dialogState.questUiHudVisible = true
      dialogState.uiText = { text: 'Follow Cosmo to the Tech Lab' }
      dialogState.pointer = 16
    }
  },
  {
    text: "All these buildings and mechanisms consume a lot of energy! We're lucky that energy crystals are easily found in this Tech Lab! Gearhead, that massive robot in the Tech Lab, needs all the energy crystals you can find.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false
  },
  {
    text: `Gearhead, the big robot in the Tech Lab, will install the crystals for the power supply on his own, but you first need to collect the crystals and then bring them to him. I'll check on your progress with the task, and then I need to return to welcome the visitors.`,
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      npcFollow(await followLocators('locators/npc_astronaut_path06.gltf'), 44, false)
      dialogState.myQuest = new QuestClicker({
        amountClicks: selectedEntityState.crystals.length,
        entities: selectedEntityState.crystals,
        text: 'Collect the required number of crystals',
        afterClick: (...args: any[]) => engine.removeEntity(args[0]),
        questSoundURL: 'collectCrystal',
        hoverText: 'COLLECT',
        getHint: {
          entity: selectedEntityState.android,
          systemDialogPoint: 8,
          hoverText: 'COLLECT ALL THE CRYSTALS FIRST'
        }
      })
      dialogState.pointer = 18
      await dialogState.myQuest.startQuest()

      try {
        let crystal = await createEntity([{ position: { x: 0, y: 1, z: 0 } }], 'obj_crystals')
        takeItem(crystal[0], { disableMash: true })
      } catch (e) {
        console.error(`NOT NPC ERROR: ${e}`)
      }
      createAndroidNpc()
      dialogState.myQuest = new QuestClicker({
        amountClicks: entityList.androidList,
        entities: selectedEntityState.android,
        text: 'Take crystals to Gearhead',
        afterClick: (...args: any[]) => {
          deleteTakenitems()
          triggerQuestItemAnimation(selectedEntityState.android[0], 'talk')
          npc.openDialogWindow(androidNPC, day1, 19)
        },
        hoverText: 'PASS THE CRYSTALS'
      })
      await dialogState.myQuest.startQuest()
      dialogState.androidAlive = true
      pointerEventsSystem.onPointerDown(
        {
          entity: selectedEntityState.android[0],
          opts: {
            button: InputAction.IA_POINTER,
            hoverText: 'TALK'
          }
        },
        () => {
          npc.openDialogWindow(androidNPC, day1, 19)
        }
      )
      dialogState.uiText = { text: 'Return and talk to Cosmo' }
      dialogState.pointer = 20
    }
  },
  {
    text: 'Gearhead, the big robot standing in the Tech Lab, will install the crystals for the power supply on his own, but you first need to collect the crystals and then bring them to him.',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: "Those minutes felt like an eternity to me! Thank you for bringing them—I was so hungry that I couldn't wait any longer! I almost forgot to mention: Our friend Cosmo asked me to tell you to meet him at the Spawn Point.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: "I see you've finished already! Your XP count is growing again! I hope Gearhead didn't eat all the crystals himself. Thank you—now I have one less task to worry about!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      pointerEventsSystem.removeOnPointerDown(selectedEntityState.android[0])
      dialogState.questUiHudVisible = false
      questMark(false)
      selectedEntityState.crystals.forEach((entity) => engine.removeEntity(entity))
      entityState.robots.forEach((entity) => engine.removeEntity(entity))
      await awaitSavingQuest(day1, 21, 0, 'quest4')
    }
  },
  {
    text: "I see you still have some energy left! That's impressive! I have one last task for you today! I hope you'll enjoy it. Keep up! ",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = true
      dialogState.uiText = { text: 'Follow Cosmo to the Governance' }
      npcFollow(await followLocators('locators/npc_astronaut_path07.gltf'), 12, true, false)
      dialogState.pointer = 22
    }
  },
  {
    text: "Welcome to the Governance where streams of information and metaverse magic intertwine! Look, at the heart of it stands the Data Trees - you'll learn more about it in time. But for now, let's get to work!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false
  },
  {
    text: "Technology and nature complement each other perfectly, but we need to add more light here! See those purple Chinese lanterns? You need to activate them with special energy sticks, which you'll have to look for around here. Don’t go too far—everything you need is in this area.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      npcFollow(await followLocators('locators/npc_astronaut_path08.gltf'), 56, false)
      dialogState.myQuest = new QuestClicker(
        {
          amountClicks: selectedEntityState.match.length,
          entities: selectedEntityState.match,
          text: 'Collect the needed energy sticks',
          afterClick: (...args: any[]) => engine.removeEntity(args[0]),
          questSoundURL: 'collectStick',
          hoverText: 'COLLECT',
          getHint: { entity: selectedEntityState.lanterns, systemDialogPoint: 9 }
        },
        'obj_earth'
      )
      dialogState.pointer = 24
      await dialogState.myQuest.startQuest()

      let match = await createEntity([{ position: { x: 0, y: 1, z: 0 } }], 'obj_torch')
      Transform.getMutable(match[0]).scale = Vector3.create(0.5, 0.5, 0.5)
      takeItem(match[0], { disableMash: true })

      dialogState.myQuest = new QuestClicker(
        {
          amountClicks: selectedEntityState.lanterns.length,
          entities: selectedEntityState.lanterns,
          text: 'Activate all the Chinese lanterns',
          afterClick: (...args: any[]) => triggerQuestItemAnimation(args[0], 'stand', true),
          questSoundURL: 'fireLight',
          hoverText: 'LIGHT'
        },
        'obj_earth'
      )
      dialogState.pointer = 25
      await dialogState.myQuest.startQuest()
      deleteTakenitems()
      dialogState.uiText = { text: 'Return and talk to Cosmo' }
      dialogState.pointer = 26
    }
  },
  {
    text: 'You need to gather the necessary amount of energy sticks before we start lighting the Chinese lanterns! The sticks are small and glow a bright turquoise color. I saw a few in this area!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'I see not all Chinese lanterns are ready yet. Please return to the Governance and light all the lanterns.',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: "What a stunning sight! You should be proud - everything is ready now! Thank you! You already have enough experience to show everyone your status! Follow me, I'll show you where you can get wearables, a symbol of your active participation in the life of the DAO!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = true
      dialogState.uiText = { text: 'Follow Cosmo to the Suit Up area' }
      await awaitSavingQuest(day1, 27, 0, 'quest5', false, false)
      npcFollow(await followLocators('locators/npc_astronaut_path09.gltf'), 28, true, false)
    }
  },
  {
    text: `Here's your well-deserved reward! Just press "claim" next to this wearable! And if you want to collect them all - keep actively participating in DAO activities, but don't forget about me either! There will always be tasks here for you, for example tomorrow!`,
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = false
      npcFollow(await followLocators('locators/npc_astronaut_path10.gltf'), 56, false)
      setSystemDialog(2)
    }
  }
]
