import * as utils from '@dcl-sdk/utils'
import { GltfContainer, pointerEventsSystem, Transform, engine, VisibilityComponent, Entity } from '@dcl/sdk/ecs'
import { Vector3, Quaternion } from '@dcl/sdk/math'
import { readGltfLocators } from 'daohq-shared/scripts'
import { SOUND_MANAGER } from '../../states/states'
import { setEntityDailyState, awaitSavingQuest } from './backendHandler'
import { myNPC } from './npc'
import { fishAndPond, entityList } from './questConfig'
import {
  takeItem,
  questMark,
  deleteTakenitems,
  triggerQuestItemAnimation,
  createEntity,
  loadQuestEntityFromLocators
} from './questHandler'
import { QuestClicker } from './Quests'
import {
  dialogState,
  selectedEntityState,
  questModels,
  questEntitySaveState,
  entityScale,
  entityState,
  fixedTeleportList
} from './questState'
import { systemDialog } from './systemDialog'

export const daily = [
  {
    text: "It's time for a bit of garden care! As you might have noticed, it doesn't rain much around here. The trees will feel much better if we give them a good watering.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: async () => {
      setEntityDailyState(1)
      dialogState.pointer = 1
    }
  },
  {
    text: "Find a jug near the fountain and fill it there. By the way, you can also fill it from any other water source. Take the jug of water to the trees whose leaves look a bit droopy. Please don't forget to water all the trees that need it!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.myQuest = new QuestClicker({
        amountClicks: 1,
        entities: selectedEntityState.jug,
        text: 'Find the appropriate jug',
        reverse: false,
        afterClick: (...args: any[]) => takeItem(args[0]),
        questSoundURL: 'pickUpJug',
        hoverText: 'PICK UP',
        getHint: { entity: selectedEntityState.questEntityTrees, systemDialogPoint: 11, hoverText: 'WATERING' }
      })
      dialogState.pointer = 2
      await dialogState.myQuest.startQuest()
      dialogState.uiText = { text: 'Talk to Cosmo' }
      dialogState.pointer = 3
    }
  },
  {
    text: "To water the tree, you'll need a jug filled with water.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'Some trees are still thirsty. Fill up the jug from the fountain and water those trees that need it. They might be hiding in the corners!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.myQuest = new QuestClicker(
        {
          amountClicks: selectedEntityState.questEntityTrees.length,
          entities: selectedEntityState.questEntityTrees,
          text: 'Need to watering trees',
          hoverText: 'WATERING',
          afterClick: (...args: any[]) => {
            console.log(GltfContainer.get(args[0]).src)
            GltfContainer.getMutable(args[0]).src = args[1]
            GltfContainer.get(args[0]).src == 'models/obj_pine03.gltf'
              ? (GltfContainer.getMutable(args[0]).src = args[1])
              : (GltfContainer.getMutable(args[0]).src = args[2])
            selectedEntityState.questEntityTrees.splice(selectedEntityState.questEntityTrees.indexOf(args[0]), 1)
          },
          resourceAmount: 3,
          reqCallback: async (...args: any[]) => {
            const myQuest = new QuestClicker({
              amountClicks: 1,
              entities: selectedEntityState.water,
              text: 'Fill the jug',
              afterClick: () => {
                selectedEntityState.water.forEach((entity) => pointerEventsSystem.removeOnPointerDown(entity))
              },
              questSoundURL: 'fillJug',
              playCompliteQuestSound: false,
              hoverText: 'FILL',
              getHint: { entity: selectedEntityState.questEntityTrees, systemDialogPoint: 11, hoverText: 'WATERING' }
            })
            return await myQuest.startQuest()
          },
          questSoundURL: 'waterTree'
        },
        questModels.get('bigTree'),
        questModels.get('smallTree')
      )
      dialogState.pointer = 2
      await dialogState.myQuest.startQuest()
      selectedEntityState.water.forEach((entity) => pointerEventsSystem.removeOnPointerDown(entity))
      questMark(true)
      deleteTakenitems()
      dialogState.uiText = { text: 'Talk to Cosmo' }
      dialogState.pointer = 4
    }
  },
  {
    text: "Fantastic! Our Showroom looks splendid again! It's so refreshing to relax here on a hot day. Thanks for helping me take care of this place!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = false
      await awaitSavingQuest(daily, 4, 0, 'daily', true)
      questMark()
    }
  },
  {
    text: 'Hello, my friend! Our fish in the pond look hungry! They could use some food today. Could you find some feed for them and bring it to the pond?',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      setEntityDailyState(2)
      dialogState.myQuest = new QuestClicker({
        amountClicks: selectedEntityState.feed.length,
        entities: selectedEntityState.feed,
        text: 'Need to collect feed',
        afterClick: (...args: any[]) => {
          questEntitySaveState.set(args[0], Transform.get(args[0]))
          Transform.getMutable(args[0]).scale = Vector3.create(0, 0, 0)
        },
        questSoundURL: 'pickUpFeed',
        hoverText: 'COLLECT',
        getHint: { entity: selectedEntityState.fish, systemDialogPoint: 10, hoverText: 'FEED' }
      })
      dialogState.pointer = 6
      await dialogState.myQuest.startQuest()

      dialogState.myQuest = new QuestClicker({
        amountClicks: fishAndPond.length,
        entities: selectedEntityState.fish,
        text: 'Need to feed all the fish',
        hoverText: 'FEED',
        afterClick: (...args: any[]) => {
          let foundArray = fishAndPond.find((subArray) => subArray.includes(selectedEntityState.fishMap.get(args[0])))
          selectedEntityState.fishMap.forEach((name, entity) => {
            if (foundArray?.find((subArray) => subArray.includes(name))) {
              pointerEventsSystem.removeOnPointerDown(entity)
              triggerQuestItemAnimation(entity, 'idle2', true)
            }
          })
        },
        questSoundURL: 'useFeed',
        soundVolume: 1
      })
      dialogState.pointer = 7
      await dialogState.myQuest.startQuest()
      selectedEntityState.fish.forEach((entity) => {
        utils.timers.setTimeout(() => {
          utils.timers.setTimeout(() => {
            triggerQuestItemAnimation(entity, 'stand', true)
          }, Math.random() * 3000)
        }, 2000)
      })
      dialogState.uiText = { text: 'Talk to Cosmo' }
      dialogState.pointer = 8
    }
  },
  {
    text: 'First, gather the necessary amount of feed. You can find it in the Governance zone.',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'First, gather the necessary amount of feed. You can find it in the Governance zone.',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: "Wonderful job! This is something you could watch forever, isn't it? Personally, I find this activity enjoyable! But the main thing is not to overfeed them!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = false
      questMark()
      await awaitSavingQuest(daily, 8, 0, 'daily', true)
    }
  },
  {
    text: "Alert! We have a spider escape situation in the Tech Lab. Those little critters have scattered everywhere! Can you track them down and bring them back? They're hiding all over the Space Base, so this might feel like a hunt.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: async () => {
      setEntityDailyState(3)
    }
  },
  {
    text: `You are surely familiar with the motto "gotta catch 'em all" right? When all the spiders are caught, take them to the "Tech Lab" zone. They will figure out why the spiders keep escaping there.`,
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      selectedEntityState.spidersObj.map((ent: any) => (Transform.getMutable(ent).scale = Vector3.create(0, 0, 0)))
      dialogState.myQuest = new QuestClicker({
        amountClicks: entityList.npcSpiderList,
        entities: selectedEntityState.spiders,
        text: 'Collected spiders',
        hoverText: 'CATCH',
        afterClick: (...args: any[]) => engine.removeEntity(args[0]),
        questSoundURL: 'pickUpSpider',
        getHint: { entity: selectedEntityState.platform, systemDialogPoint: 12, hoverText: 'PLACE' }
      })
      dialogState.pointer = 11
      await dialogState.myQuest.startQuest()

      let spider = await createEntity([{ position: { x: 90, y: 1, z: 85 } }], 'obj_spider')
      Transform.getMutable(spider[0]).scale = Vector3.create(0.6, 0.6, 0.6)
      takeItem(spider[0], { disableMash: true })

      dialogState.myQuest = new QuestClicker(
        {
          amountClicks: entityList.platformList,
          entities: selectedEntityState.platform,
          text: 'Set spiders in platform',
          hoverText: 'PLACE',
          afterClick: (...args: any[]) => {
            let entityData = Transform.get(args[0])
            args[1].forEach((spider: any) => {
              if (
                JSON.stringify(Transform.get(spider).position.x) == JSON.stringify(entityData.position.x) ||
                JSON.stringify(Transform.get(spider).position.z) == JSON.stringify(entityData.position.z)
              )
                return (Transform.getMutable(spider).scale = entityScale.has('spiders')
                  ? entityScale.get('spiders')
                  : Vector3.create(0.8, 0.8, 0.8))
            })
          },
          questSoundURL: 'spiderPlatform',
          soundVolume: 0.3
        },
        selectedEntityState.spidersObj
      )
      dialogState.pointer = 12
      await dialogState.myQuest.startQuest()
      engine.removeEntity(spider[0])
      dialogState.uiText = { text: 'Talk to Cosmo' }
      dialogState.pointer = 13
    }
  },
  {
    text: 'Still searching for those sneaky spiders? They love dark corners and hidden spots. Keep your eyes peeled!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: "I see you've caught them all! Congratulations - now just take them to the Tech Lab!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: "Mission accomplished! You caught all the spiders. Now these rascals won't be able to scare anyone. Great job!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      selectedEntityState.spidersObj.map(
        (ent: any) => (Transform.getMutable(ent).scale = Vector3.create(0.8, 0.8, 0.8))
      )
      dialogState.questUiHudVisible = false
      questMark()
      await awaitSavingQuest(daily, 13, 0, 'daily', true)
    }
  },
  {
    text: "Oh no, our beautiful area is getting a bit messy! You can help clean up using a vacuum cleaner - you'll find it behind the big robot named Gearhead. The trash is scattered everywhere, and we really want to keep this place tidy.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      setEntityDailyState(4)
      const stikersData = await readGltfLocators('locators/obj_area00_stickers.gltf')
      await loadQuestEntityFromLocators(stikersData, selectedEntityState.stickers, 'obj_stickers')
      selectedEntityState.stickers.forEach((array) =>
        array.forEach((entity: Entity) => VisibilityComponent.create(entity, { visible: false }))
      )
      const entityTrash = selectedEntityState.stickers.get(dialogState.questRanadom)
      entityTrash.forEach((entity: Entity) => (VisibilityComponent.getMutable(entity).visible = true))
      dialogState.myQuest = new QuestClicker({
        amountClicks: selectedEntityState.vacuum.length,
        entities: selectedEntityState.vacuum,
        text: 'Find vacuum behind the Gearhead',
        afterClick: () => {}
      })
      dialogState.pointer = 15
      await dialogState.myQuest.startQuest()
      Transform.getMutable(selectedEntityState.vacuum[0]).scale = Vector3.create(1, 1, 1)
      takeItem(selectedEntityState.vacuum[0], { disableMash: true, itemPosition: { x: 0, y: 0, z: 0.7 } })

      dialogState.myQuest = new QuestClicker({
        amountClicks: 10,
        entities: entityTrash,
        text: 'Collected trash',
        hoverText: 'PICK UP',
        afterClick: (...args: any[]) => engine.removeEntity(args[0]),
        questSoundURL: 'collectTrash'
      })
      dialogState.pointer = 15
      await dialogState.myQuest.startQuest()
      entityTrash.forEach((entity: Entity) => engine.removeEntity(entity))
      dialogState.uiText = { text: 'Talk to Cosmo' }
      dialogState.pointer = 16
      engine.removeEntity(selectedEntityState.vacuum[0])
    }
  },
  {
    text: "Having trouble finding the trash? Look around benches, pathways, and near the fountain - it tends to accumulate there. And remember, you can find the vacuum cleaner behind the big robot Gearhead in the Tech Lab when you're ready to clean up!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'What a difference! Our area is spotless now. Thank you so much for helping keep our place clean and beautiful!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      entityState.trash.forEach((entity) => engine.removeEntity(entity))
      dialogState.questUiHudVisible = false
      questMark()

      await awaitSavingQuest(daily, 16, 0, 'daily', true)
    }
  },
  {
    text: "Oh no - it seems our cleaning robots haven't been to the charging station in a while. They can't get back on their wheels by themselves. Can you help and send them to the charging station? Just gather all the robots that aren't moving!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      setEntityDailyState(5)
      let robot: Entity
      entityState.robots = await createEntity(
        [{ position: { x: 90, y: 1, z: 90 }, rotation: { x: 90, y: 1, z: 90, w: 50 } }],
        'npc_android'
      )
      dialogState.myQuest = new QuestClicker({
        amountClicks: 1,
        entities: entityState.robots,
        text: 'Need to take the robot',
        afterClick: (...args: any[]) => {
          Transform.getMutable(args[0]).rotation = Quaternion.Zero()
          robot = args[0]
          takeItem(args[0])
        }
      })
      dialogState.pointer = 18
      await dialogState.myQuest.startQuest()
      dialogState.myQuest = new QuestClicker({
        amountClicks: 1,
        entities: selectedEntityState.station,
        text: 'Need to charge the robot',
        afterClick: (...args: any[]) => engine.removeEntity(robot)
      })
      await dialogState.myQuest.startQuest()
      dialogState.uiText = { text: 'Talk to Cosmo' }
      dialogState.pointer = 19
    }
  },
  {
    text: 'Not all the robots are back to work yet! Try to find the remaining ones and just flip them over.',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'Hooray! The cleaning robots are back to their duties. Thank you for rescuing them and keeping our space tidy!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = false
      questMark()
      await awaitSavingQuest(daily, 19, 0, 'daily', true)
    }
  },
  {
    text: 'It seems our fireflies have dozed off on the bushes again. But who will pollinate our flowers then? Could you gently wake them up? A light nudge should do the trick.',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      setEntityDailyState(6)
      dialogState.myQuest = new QuestClicker(
        {
          amountClicks: selectedEntityState.fireflies.length,
          entities: selectedEntityState.fireflies,
          text: 'Active fireflies',
          hoverText: 'WAKE UP',
          afterClick: (...args: any[]) => {
            GltfContainer.getMutable(args[0]).src = args[1]
            args[3] && SOUND_MANAGER.playSound('firefliesTurnOnAttempt')
            utils.timers.setTimeout(() => {
              GltfContainer.getMutable(args[0]).src = args[3] ? args[2] : args[1]
            }, 100)
            !args[3] && triggerQuestItemAnimation(args[0], 'stand', true)
          },
          questSoundURL: 'firefliesTurnOn',
          additionEntityClicks: 5,
          additionDialog: { npc: myNPC, dialog: systemDialog, pointer: 6 },
          randomClicks: true
        },
        questModels.get('normalFirefly'),
        questModels.get('normalFirefly')
      )
      dialogState.pointer = 21
      await dialogState.myQuest.startQuest()
      dialogState.uiText = { text: 'Talk to Cosmo' }
      dialogState.pointer = 22
    }
  },
  {
    text: "Can't you wake them up? Just lightly touch each firefly. Some are sleeping particularly soundly! But sooner or later they will wake up and fly away!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'Great job! It was important for us not to miss another blooming period! But now everything is fine! Thank you for supporting our ecosystem!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = false
      questMark()
      await awaitSavingQuest(daily, 22, 0, 'daily', true)
    }
  },
  {
    text: "There's a bully hiding here somewhere, has been up to their tricks again with graffiti everywhere! Can you help clean off those symbols from the walls? We want to keep the place looking nice.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      setEntityDailyState(7)
      const graffitiData = await readGltfLocators('locators/obj_area00_graffiti.gltf')
      await loadQuestEntityFromLocators(graffitiData, selectedEntityState.graffiti, 'obj_graffiti')
      selectedEntityState.graffiti.forEach((array) =>
        array.forEach((entity: Entity) => VisibilityComponent.create(entity, { visible: false }))
      )
      const entityGraffiti = selectedEntityState.graffiti.get(dialogState.questRanadom)
      entityGraffiti.forEach((entity: Entity) => (VisibilityComponent.getMutable(entity).visible = true))
      dialogState.myQuest = new QuestClicker({
        amountClicks: selectedEntityState.spray.length,
        entities: selectedEntityState.spray,
        text: 'Find spray near benches in ShowRoom',
        afterClick: () => {}
      })
      dialogState.pointer = 24
      await dialogState.myQuest.startQuest()
      Transform.getMutable(selectedEntityState.spray[0]).scale = Vector3.create(1, 1, 1)
      takeItem(selectedEntityState.spray[0], { disableMash: true })
      dialogState.myQuest = new QuestClicker({
        amountClicks: entityGraffiti.lenght < 10 ? entityGraffiti.lenght : 10,
        entities: entityGraffiti,
        text: 'Clean graffiti',
        hoverText: 'CLEAN OFF',
        afterClick: (...args: any[]) => engine.removeEntity(args[0]),
        questSoundURL: 'eraseGraffiti'
      })
      dialogState.pointer = 24
      await dialogState.myQuest.startQuest()
      entityGraffiti.forEach((entity: Entity) => engine.removeEntity(entity))
      engine.removeEntity(selectedEntityState.spray[0])
      dialogState.uiText = { text: 'Talk to Cosmo' }
      dialogState.pointer = 25
    }
  },
  {
    text: "Need help finding the graffiti? Check around corners and high places where it's hard to reach. And don't forget - when you're ready to cover it up, you'll find the spray paint can in the Showroom, sitting on the railing.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'All clean! The walls look great again. Thanks for getting rid of that unsightly graffiti!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = false
      questMark()
      await awaitSavingQuest(daily, 25, 0, 'daily', true)
    }
  },
  {
    text: "Like any complex machinery, teleports require regular inspections and maintenance. Imagine what could happen if a teleport breaks down! You'll need to run to each teleport and press the system check button. If everything is okay, a bright light will turn on in the center.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      setEntityDailyState(8)
      dialogState.teleportActive = false
      dialogState.myQuest = new QuestClicker(
        {
          amountClicks: entityList.teleportList,
          entities: selectedEntityState.teleport,
          text: 'Need to inspect teleports',
          hoverText: 'SYSTEM CHECK',
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
          randomClicks: true
        },
        questModels.get('workingTeleport'),
        questModels.get('disableTeleportModel')
      )
      dialogState.pointer = 27
      await dialogState.myQuest.startQuest()
      dialogState.uiText = { text: 'Talk to Cosmo' }
      dialogState.teleportActive = true
      dialogState.pointer = 28
    }
  },
  {
    text: "Can't find all the teleporters? They are all located in the space base zone. Don't forget to thoroughly check each one!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: "Ah, there you are! So, how are the teleports - everything in order? Did you notice anything unusual? I'm sure you did an excellent job as always!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      questMark()
      dialogState.questUiHudVisible = false
      await awaitSavingQuest(daily, 28, 0, 'daily', true)
    }
  },
  {
    text: 'Our lava lamps are looking a bit sluggish today. The lava has settled at the bottom. Can you give them a good shake to get the lava flowing again? It\u2019s quite a sight when they\u2019re active.',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      setEntityDailyState(9)
      dialogState.myQuest = new QuestClicker(
        {
          amountClicks: selectedEntityState.lavaLamp.length,
          entities: selectedEntityState.lavaLamp,
          text: 'Active lava Lamp',
          hoverText: 'SHAKE',
          afterClick: (...args: any[]) => {
            GltfContainer.getMutable(args[0]).src = args[1]
            args[3] && SOUND_MANAGER.playSound('lavalampOnAttempt', 0.7)
            utils.timers.setTimeout(() => {
              GltfContainer.getMutable(args[0]).src = args[3] ? args[2] : args[1]
            }, 100)
          },
          questSoundURL: 'lavalampOn',
          soundVolume: 0.7,
          additionEntityClicks: 5,
          additionDialog: { npc: myNPC, dialog: systemDialog, pointer: 5 },
          randomClicks: true
        },
        questModels.get('normalLamp'),
        questModels.get('brokenLamp')
      )
      dialogState.pointer = 30
      await dialogState.myQuest.startQuest()
      dialogState.uiText = { text: 'Talk to Cosmo' }
      dialogState.pointer = 31
    }
  },
  {
    text: 'Need a hint? Make sure you shake each lamp thoroughly until the lava starts moving. They can be stubborn sometimes!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'Lava is flowing beautifully! The lamps are mesmerizing again. Thanks for your help in keeping the ambiance perfect!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = false
      questMark()
      await awaitSavingQuest(daily, 31, 0, 'daily', true)
    }
  }
]
