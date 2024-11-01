import { Vector3 } from '@dcl/sdk/math'
import { awaitSavingQuest } from './backendHandler'
import { npcFollow, followLocators, questMark, setSystemDialog } from './questHandler'
import { dialogState } from './questState'
import { readGltfLocators } from 'daohq-shared/scripts/readGltfLocators'
import { getTransfFromLocNode } from 'daohq-shared/scripts'

export const day2 = [
  {
    text: 'Finally, you\u2019re here! I was starting to worry! But now I understand \u2013 you\u2019re not afraid of new tasks! I wanted to tell you last time! We\u2019ve opened a new Help Center.',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: async () => {
      // questMark()
    }
  },
  {
    text: 'Follow me—I’ll take you to the teleport. My colleague Lumina will meet you there. You can’t miss him; he’ll be right in the center! Talk to him—he’s a treasure trove of information and knows everything about DAO DCL. He can tell you all about it. Once you’ve spoken with him, come back to me!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.pointer = 2
      dialogState.questUiHudVisible = true
      dialogState.uiText = { text: 'Follow Cosmo to the Space Base' }
      npcFollow(await followLocators('locators/npc_astronaut_path11.gltf'), 12, true, false)
    }
  },
  {
    text: 'Find the Help Center and talk to our Lumina megabrain! You can learn a lot of interesting things about DCL DAO. Just have a chat with him—he sometimes gets lonely. Then, come back to me!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      questMark()
      dialogState.uiText = { text: 'Talk to Lumina AI at the Help Center' }
      dialogState.interactedAI = false
      if (dialogState.interactedAI) dialogState.pointer = 3
    }
  },
  {
    text: "I've been told that you're a great conversationalist! I hope you got answers to all your questions! By the way, you can visit the Help Center anytime for any information regarding Decentraland DAO.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.uiText = { text: 'Talk to Cosmo' }
      // npcFollow([Vector3.create(80, 1, 80), Vector3.create(80, .5, 75)], .001, false, false);
      await awaitSavingQuest(day2, 4, 0, 'quest6')
      questMark(false)
    }
  },
  {
    text: "Haven't you wondered why I'm dressed like this? Maybe you're even a little jealous of my outfit? In vain - I'll tell you how to look just as stylish! It's all about the trends! And if you want to stay up-to-date on the latest trends, then you need to go somewhere more often! Follow me, I'll take you to the teleport!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = true
      dialogState.uiText = { text: 'Follow Cosmo to the Space Base' }
      npcFollow(await followLocators('locators/npc_astronaut_path12.gltf'), 2, true, false)
      dialogState.pointer = 5
    }
  },
  {
    text: "Use this teleport to get to the Creator Hall! You can also get to the place using the mini-map, the icon of which is located at the top right of the screen. Don't confuse it with the DCL map! I'll be waiting for you there!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.uiText = { text: 'Meet Cosmo at the Creator Hall' }
      npcFollow(await followLocators('locators/npc_astronaut_path13.gltf'), 0.0001, true, false)
      dialogState.pointer = 6
    }
  },
  {
    text: "If you want to know what's trendy in DCL, discover the newest released wearables, and explore the hottest plots of land, then you've come to the right place!  In today's world, it's very important to keep your finger on the pulse! Come here periodically to find out about the latest metaverse trends!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = false
      dialogState.pointer = 7
    }
  },
  {
    text: 'I want to ask you another question! Which color of wearables do you think will be trending this year?',
    isQuestion: true,
    buttons: [
      { label: `Classic Black`, goToDialog: 9, size: 150, triggeredActions: () => (dialogState.pointer = 9) },
      { label: `Peach Fuzz`, goToDialog: 9, size: 150, triggeredActions: () => (dialogState.pointer = 9) },
      { label: `Future Dusk`, goToDialog: 9, size: 150, triggeredActions: () => (dialogState.pointer = 9) },
      { label: `Grey-Brown Speckled`, goToDialog: 9, size: 150, triggeredActions: () => (dialogState.pointer = 9) }
    ],
    isEndOfDialog: true
  },
  {
    text: "Something makes me doubt your answer. I hope you're more careful in the store! Go back and check the price!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: () => {
      dialogState.pointer = 7
    }
  },
  {
    text: "You never cease to amaze me! By the way, that's my favorite color! I hope you've learned a lot of useful information, and if not, you can always come back here and learn even more!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: () => {
      dialogState.pointer = 10
    }
  },
  {
    text: 'If you want to stay here longer - please do. But I need to return to the Spawn Point. Someone might be looking for me. By the way, you can always find me there too. I have a couple more tasks for you. See you later!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.uiText = { text: 'Talk to Cosmo' }
      await awaitSavingQuest(day2, 12, 0, 'quest7')
      npcFollow([Vector3.create(80, 1, 80), Vector3.create(80, 0.5, 75)], 0.001, false, false)
    }
  },
  {
    text: 'Delited',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: "I'll personally escort you to the next room! This is my favorite place! You know robots love statistics, right? Well, we\u2019re going to a place where all the statistics for Decentraland DAO are collected. This is our War Room! Enter the teleport I point to, and I'll meet you on the other side!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = true
      dialogState.uiText = { text: 'Follow Cosmo to the Space Base' }
      npcFollow(await followLocators('locators/npc_astronaut_path14.gltf'), 12, true, false)
      dialogState.pointer = 13
    }
  },
  {
    text: "You need to visit the War Room. Don't wait for me – I'll catch up with you and meet you there. You can also get to the place using the mini-map, the icon of which is located at the top right of the screen. Don't confuse it with the DCL map!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.uiText = { text: 'Meet Cosmo in the War Room' }
      npcFollow(await followLocators('locators/npc_astronaut_path15.gltf'), 0.0001, true, false)
      dialogState.pointer = 14
    }
  },
  {
    text: "We're here! The War Room is where a plethora of statistical data converges. One aspect of studying anything is gathering statistics! So, now you know where to find such data.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: () => {
      dialogState.pointer = 15
    }
  },
  {
    text: "How about finding out the highest price of MANA in its entire trading history? To make it easier for you, I'll show you 4 possible answers. Choose the one you think is correct!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: () => {
      dialogState.pointer = 16
    }
  },
  {
    text: 'What about it - what is highest price of MANA in its entire trading history?',
    isQuestion: true,
    buttons: [
      { label: `5.1991 $`, goToDialog: 19, size: 130, triggeredActions: () => (dialogState.pointer = 19) },
      { label: `3.5634 $`, goToDialog: 17, size: 130 },
      { label: `69893 $`, goToDialog: 17, size: 130 },
      { label: `4810 $`, goToDialog: 17, size: 130 }
    ],
    isEndOfDialog: true
  },
  {
    text: 'And did you really examine the numbers? I think you might be mistaken! Please double-check the rate.',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: () => {
      dialogState.pointer = 16
    }
  },
  {
    text: "What about it - surprise me! What's the MANA rate today?",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false
  },
  {
    text: "Great! The price matches my historical data! Just please don't ask me for financial advice, okay? I can see that you're eager to continue exploring new places! Don't worry, we'll move on soon! But for now, I need to head back. See you there, in the same place as always!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.uiText = { text: 'Talk to Cosmo' }
      await awaitSavingQuest(day2, 20, 0, 'quest8')
      npcFollow([Vector3.create(80, 1, 80), Vector3.create(80, 0.5, 75)], 0.001, false, true)
    }
  },
  {
    text: "May I ask a personal question? Have you been to a museum lately? I'm asking for a reason! Right now we are going to a real meta Museum! Follow me and step into the teleportation device I'll show you. Don't fall behind!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = true
      dialogState.uiText = { text: 'Follow Cosmo to the Space Base' }
      npcFollow(await followLocators('locators/npc_astronaut_path16.gltf'), 12, true, false)
      dialogState.pointer = 21
    }
  },
  {
    text: "Use this teleporter - it will take you straight the Museum. You can also get to the place using the mini-map, the icon of which is located at the top right of the screen. Don't confuse it with the DCL map! Find me there!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.uiText = { text: 'Meet Cosmo at the Museum' }
      npcFollow(await followLocators('locators/npc_astronaut_path17.gltf'), 0.0001, true, false)
      dialogState.pointer = 22
    }
  },
  {
    text: "This is where history is made! Look around - it's a real journey to the past! Literally, here is information about the first steps of people in Decentraland! The first launch, the first wearable and of course the launch of MANA!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: () => {
      dialogState.pointer = 23
    }
  },
  {
    text: "Let's see how well you know DCL history! Don't worry if you can't remember something. It's not for nothing that we're in the repository of history!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: () => {
      dialogState.pointer = 24
    }
  },
  {
    text: 'What question should I ask you? Hmm... oh, I got it! Can you tell me the year when the Decentraland DAO was founded?',
    isQuestion: true,
    buttons: [
      { label: `2017`, goToDialog: 25, size: 90, triggeredActions: () => (dialogState.pointer = 25) },
      { label: `2001`, goToDialog: 25, size: 90, triggeredActions: () => (dialogState.pointer = 25) },
      { label: `2020`, goToDialog: 26, size: 100, triggeredActions: () => (dialogState.pointer = 25) },
      { label: `2077`, goToDialog: 25, size: 100, triggeredActions: () => (dialogState.pointer = 25) }
    ],
    isEndOfDialog: true
  },
  {
    text: "I think you've confused it with another event.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: () => {
      dialogState.pointer = 24
    }
  },
  {
    text: 'And this is (drumroll) the CORRECT ANSWER! Tada! Congratulations my friend - you have completed all my tasks and now you know all the key locations of this place like the back of your hand!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: async () => {
      dialogState.pointer = 27
      await awaitSavingQuest(day2, 28, 0, 'quest9')
    }
  },
  {
    text: "I thank you for all your help with the preparation! If it weren't for you, I doubt I would have made it! I hope you will continue to help me if I need it! In addition, for each completed task you will continue to receive XP!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      npcFollow([Vector3.create(80, 1, 80), Vector3.create(80, 0.5, 75)], 0.001, false, false)
      dialogState.pointer = 28
    }
  },
  {
    text: "Hello! Good to see you again! I have a new task for you. Would you like to take a look at our new Town Hall? It's where all the major DAO DCL events happen. Interested?",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false
  },
  {
    text: "Follow me, I'll show you the way to the Town Hall. It's a special place where all the important events and meetings are held. You'll learn a lot of new and interesting things!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = true
      dialogState.uiText = { text: 'Follow Cosmo to the Space Base' }
      npcFollow(await followLocators('locators/npc_astronaut_path18.gltf'), 12, true, false)
      dialogState.pointer = 30
    }
  },
  {
    text: "You need to get to the Town Hall. You can also get to the place using the mini-map, the icon of which is located at the top right of the screen. Don't confuse it with the DCL map! See you there!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.uiText = { text: 'Meet Cosmo at the Town Hall' }
      npcFollow(await followLocators('locators/npc_astronaut_path19.gltf'), 0.0001, true, false)
      dialogState.pointer = 31
    }
  },
  {
    text: 'Welcome to the Town Hall! This is where all the major DAO DCL events and gatherings take place. Here, you can learn about upcoming events and even participate in some of them.',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: async () => {
      dialogState.pointer = 32
    }
  },
  {
    text: "Let's hear your opinion! What themes of events would interest you? Here are a few options.",
    isQuestion: true,
    buttons: [
      { label: `Metaverse and Virtual Reality`, goToDialog: 33, triggeredActions: () => (dialogState.pointer = 33) },
      { label: `Blockchain and Cryptocurrencies`, goToDialog: 33, triggeredActions: () => (dialogState.pointer = 33) },
      {
        label: `Artificial Intelligence and Machine Learning`,
        goToDialog: 33,
        triggeredActions: () => (dialogState.pointer = 33)
      },
      {
        label: `Ecology and Sustainable Development`,
        goToDialog: 33,
        triggeredActions: () => (dialogState.pointer = 33)
      }
    ],
    isEndOfDialog: false
  },
  {
    text: 'Thanks for sharing your thoughts with us. Now we know what topics interest our visitors. This is valuable information!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: async () => {
      dialogState.pointer = 34
    }
  },
  {
    text: "You did great! I hope you enjoyed this adventure. If you're interested in learning more, come to our events. See you soon!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      await awaitSavingQuest(day2, 35, 0, 'quest10')
      npcFollow([Vector3.create(80, 1, 80), Vector3.create(80, 0.5, 75)], 0.001, false, false)
      dialogState.pointer = 35
    }
  },
  {
    text: "I completely forgot to tell you some very important news! But as they say, seeing is believing. Follow me - I'll show you everything.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = true
      dialogState.uiText = { text: 'Follow Cosmo to the Space Base' }
      npcFollow(await followLocators('locators/npc_astronaut_path20.gltf'), 24, true, false)
      dialogState.pointer = 36
    }
  },
  {
    text: `Use this teleport to get to the Coffee Space! You can also get to the place using the mini-map, the icon of which is located at the top right of the screen. Don't confuse it with the DCL map! And there's another method of transportation - a small shuttle journey! Choose! I'll be waiting for you there!`,
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.uiText = { text: 'Meet Cosmo at the Coffee Space' }
      let teleports = await readGltfLocators('locators/obj_rooms_teleport_locators.gltf')
      teleports.forEach(async (node) => {
        if (node.name == 'obj_room_teleport.006')
          npcFollow(
            [
              {
                ...getTransfFromLocNode(node).position,
                x: getTransfFromLocNode(node).position!.x - 2,
                y: getTransfFromLocNode(node).position!.y - 1
              }
            ],
            0.001,
            true,
            false
          )
      })

      dialogState.pointer = 37
    }
  },
  {
    text: 'Would you believe it if someone told you that any DAO member can now book a capsule to host their own event? It sounds like science fiction, but it has become a reality! If you ever need to book a capsule for your own event, you can do it here.',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: async () => {
      dialogState.pointer = 38
    }
  },
  {
    text: "It's not necessary to do it right now! I just had to inform you about this opportunity. Come back whenever you want to host an event! To get more information, follow the official DAO news and don't miss the events!",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: false,
    triggeredByNext: async () => {
      dialogState.pointer = 39
    }
  },
  {
    text: 'For now, I have to leave you, but this isn’t goodbye! We’ll definitely see each other again—I’ll be right here in the same place where you met me. Feel free to come by more often. It’s always nice to see you!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      dialogState.questUiHudVisible = false
      await awaitSavingQuest(day2, 39, 0, 'quest11')
      npcFollow([Vector3.create(80, 1, 80), Vector3.create(80, 0.5, 75)], 0.001, false)
      setSystemDialog(2)
    }
  }
]
