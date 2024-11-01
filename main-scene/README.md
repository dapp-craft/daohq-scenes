# DAOHQ main scene

#### Links to sections of the documentation describing each part of the code in the context of each directory:

(Each directory in "/src" contains a description of the current section)

- [DEBUG](src/debug/README.md)
- [QUESTS](src/quests/src/README.md)
- [SCENE](src/scene/README.md)
  - [constants](src/scene/constants/README.md)
- [SCRIPTS](src/scripts/README.md)
- [STATES](src/states/README.md)
- [UI](src/ui/modules/README.md)
- [WS_EVENTS](src/wsEvents/README.md)

### Building the project

1. Install dependencies for main-scene and shared folder
   ```sh
   npm install
   ```
   _Run this command twice. From ./main-scene and ./shared folder_
2. Link the shared folder. In the ./main-scene folder:
   ```sh
   npm run link-shared
   ```
3. Build the project
   ```sh
   npm run build
   ```
4. Start the project
   ```sh
   npm run start
   ```

### Debug Config

To **_add new_** option in debug menu you need to add field in **_debugConfig.ts_**

Example:

```
config = {
    debugMenu: true,
};
```

I need to add the ability to disable quests in the scene

```
config = {
    debugMenu: true,
    quests: {
        active: true,
    },
};
```

In main quest file i need to check this fields

```
export async function questSystem() {

  if (!config.quests.active) return // Here a check config

  console.log('Quest system: Loading...')
}
...
```

Disable or enable **_UI_** by config works almost the same, you need to check in main block config field.

Example:

```
...
    <UiEntity
        uiTransform={{
            ...

            display: config.debugMenu ? 'flex' : 'none' // Here i check config

            ...
        }}>
...
```

### Debug menu

To add new fields in debug menu you need to **_add function_** to debugUi.tsx in onClick, onSubmit etc

Example with input:

```
<Input
     onSubmit={(value) => {
         setQuestPointer(+value) // Pass data through the callback
     }}
></Input>
```
