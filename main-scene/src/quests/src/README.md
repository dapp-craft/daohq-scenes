# Quest System - Comprehensive Guide

### Adding a New Quest Day

To add a new quest day to the system, follow these steps:

**Create a New Array:**
Define a new array of `Dialog[]` objects inside the respective quest file (e.g., `dayOneDialogs.ts`, `dayTenDialogs.ts`), where each object represents a dialog entry or interaction.

Example: In the file `dayOneDialogs.ts`, you can add a new dialog array:

````ts
const Day1: Dialog[] = [
  {
    "text": "Hello, adventurer!",
    "isQuestion": false,
    "buttons": [],
    "isEndOfDialog": false,
    "triggeredByNext": () => {
      questMark(); // Handles quest marking logic
    }
  }
];

### **Implementing Quest Logic**
For each quest day, you will need to add the necessary logic in `triggeredByNext` that drives the narrative or gameplay progression. The logic for each dialog interaction must be carefully crafted to ensure that quests progress seamlessly.

Example for Day 10:

```ts
const Day10: Dialog[] = [
{
 "text": "Welcome back! Are you ready for your next challenge?",
 "isQuestion": false,
 "buttons": [],
 "isEndOfDialog": false,
 "triggeredByNext": () => {
   questMark(); // Adds quest mark above NPC
 }
}
];
````

Explanation:

`triggeredByNext` allows actions to be triggered when the next dialog is activated.

### **System Dialogs**

`systemDialogs` are used to manage technical messages or in-game system prompts that don’t involve player choices. These can be useful for conveying progress updates or handling technical instructions.

System dialogs should follow the same structure as regular dialogs but are designed to be non-interactive.

Example of a system dialog:

```ts
const systemDialog = [
  {
    text: 'Loading...',
    isQuestion: false,
    buttons: [],
    isEndOfDialog: true
  }
]
```

Usage Tip: Use system dialogs to provide feedback on game actions like saving, loading, or other automated processes.

### **Backend Communication**

To ensure that each quest is properly tracked, it’s crucial to communicate with the backend server after the completion of each quest. This helps in saving the player's progress and synchronizing quest states.

The function to use:

```ts
awaitSavingQuest(dayVariable, dialogPointer, systemDialogPointer, questName)
```

`dayVariable`: The variable holding the quest day’s dialog array (e.g., day10).
`dialogPointer`: The index pointing to the relevant dialog that has been completed (e.g., 21).
`systemDialogPointer`: The index pointing to the system dialog (e.g., 0).
`questName`: The name of the quest to be sent to the backend (e.g., 'quest4').

Example:

```ts
awaitSavingQuest(Day10, 21, 0, 'quest4')
```

### **Quest Mark System**

You can use quest marks above NPCs to indicate the status of a quest. This can be in the form of a question mark (quest available) or an exclamation mark (information or attention needed).

Use the `questMark(boolean?)` function

`true`: Displays a quest mark above the NPC.
`false`: Displays an exclamation mark above the NPC.
Leave _empty_ to remove the mark entirely.
Example:

```ts
questMark(true) // Show quest mark
questMark(false) // Show exclamation mark
questMark() // Remove mark
```

### **NPC Movement**

To move an NPC along a predefined path or set of points, use the `npcFollow()` function. This function allows for NPC movement and can trigger dialogs or change quest markers upon completion of movement.

The function signature:

```ts
npcFollow(
  points: Array<Vector3>,    // Path or waypoints for NPC to follow
  duration: number,      // Duration for the NPC to move along the path
  startNextDialog: boolean,  // Determines if the next dialog starts after the movement
  questMarkSignAfterWalk?: boolean  // Optional: Display a quest mark after the movement
);
```

Example usage:

```ts
npcFollow(
  [Vector3, Vector3], // NPC moves between these points
  5, // Movement takes 5 seconds
  true, // Starts the next dialog after movement ends
  true // Displays quest mark after the walk
)
```

# Configuration

In order to change some config variables, you need to open the `questConfig.ts` file.

### **Quest List Configuration**

The quest list on the backend is managed using the `questNamePointer` variable. You can change the name of the quest, set the day, pointer to dialog, reward, and order.

Example:

```ts
;['quest1', { day: 1, pointer: 1, reward: 0, order: 1 }]
```

### **Daily Quest Settings**

You can control how many daily quests a player can have by adjusting the questPerDay value:

```ts
questPerDay: number
```

You can also set the price for daily quests using the questDailyPrice.
_Note: that all daily quests will share the same reward structure._

### **Coin Configuration**

To configure coins in the scene, modify the `coinsNumberAndPrice` variable. This allows you to control the following:

```ts
const coinsNumberAndPrice = {
  coinNumber: 120,
  coinPrice: 1,
  maxDayCoin: 60
}
```

How many coins `coinNumber`.
The rewards for each coin `coinPrice`.
The maximum number of coins available on the scene `maxDayCoin`.

_Note: Coins require locators to place them. These can be changed in the `coins.ts` file. Coin positions are generated randomly for each user by the backend._

### **Reward List Configuration**

If you need to change rewards after quests, you can update the `rewardList`. Here’s an example of a reward configuration:

```ts
;[
  1,
  {
    price: 10,
    modelName: 'obj_superhero01.001',
    name: 'FluxArt Pullover',
    blockchain_id: 2,
    collection: '0x25a1d66891d44cdf7b8d45802489c1dea7aadf8b'
  }
]
```

### Changing the Start Quest Pointer

To change the starting point of a quest, you need to either create a new map or modify an existing one. This map defines which quest starts with which dialog ID

For example, to change the quest pointer for Day 1, modify or create the `questDialogMap` as follows:

```ts
questDialogMap: new Map<number, number>([
  [1, 1],
  [2, 4]
  // Add more days and dialog pointers as needed
])
```
