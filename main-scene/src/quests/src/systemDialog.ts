import { questMark } from './questHandler'

export const systemDialog = [
  {
    text: 'Loading...',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'Daily quests are over for today, come for new ones tomorrow!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      questMark()
    }
  },
  {
    text: 'There will always be tasks here for you, for example tomorrow!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true,
    triggeredByNext: async () => {
      questMark()
    }
  },
  {
    text: 'Loading data error!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'Try again, these buttons are so hard to press!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'Try again, give them a good shake!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'Just give each firefly a gentle tap',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'First and foremost, gather the necessary amount of seeds!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'Gearhead will install the crystals for the power supply on his own, but you first need to bring them to him.',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'First of all, collect energy sticks',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'First, gather the necessary amount of feed.',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: "To water the tree, you'll need a jug filled with water.",
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'You need to gather all the spiders first to ensure they have a balanced charge when placed in the nests.',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'The teleports are broken, talk to Cosmo, he should know what to do.',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  },
  {
    text: 'Hello! Welcome to DAO HQ! If you want to get the full experience, you need to connect your wallet! In guest mode, quests are not available, but the entire space is open for exploration and discovery!',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  }
]
