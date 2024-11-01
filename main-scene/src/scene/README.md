## Setup of the 3D part of the main-scene

Here, modules are grouped that setup parts of the 3D scene, which are related only to the main scene.

Specifically, these are the following:

- **setupDiscord :**
  There are several screens on the scene that display up-to-date information from the DAO's Discord channels. The `setupDiscord` function initializes these screens and sets the required content on them. Additionally, in the **setupDiscord** module, there are other functions (`setContentToDiscordScreen`, `addDiscordScreenRes`, `updateDiscordScreenRes`, `deleteDiscordResource`), which are executed to make real-time content updates for such screens.
- **setupEstate :**
  In the main scene, within the Creator Hall room, several screens are set up to display estate information. The `setupEstateBoards` function handles the initialization of these screens and the placement of content on them.
- **setupMarketplace :**
  The scene includes several locations where mannequins are used. There are two types of mannequins: static and dynamic.
  The type depends on whether dynamic wearables switching is supported. Accordingly, the `setupStaticMarket` function initializes static mannequins, while the `setupDynamicMarket` function handles the initialization of dynamic ones.
  Additionally, in the **setupMarketplace.ts** file, there are other functions (such as `putOnWearables` and others) that enable dynamic interaction between the user and the mannequins.
  To optimize scene performance, mannequins with wearables appear only when the user enters the relevant part of the location.
- **setupMetrics :**
  To set up screens that display DAO metrics, the `setupMetrics` function is executed. It creates the necessary screens and sets the required content on them. The content on these screens is static.
- **setupNPCs :**
  Function `setupBookingNPCs` creates an NPC located in rooms that can be booked by the user. This NPC provides a link to the DAO HQ Admin Panel, where the user can make their bookind. `setupHelpCenterNPC` function creates an NPC located in the Help Center room. This NPC is created to assist users who need additional information about the DAO HQ.
- **setupPlazaMenu :**
  The function sets up boards located in the main scene, specifically in the Worlds room. These boards are identical to those found at the Genesis Plaza location.
- **setupTeleports :**
  The function sets up teleporters in the main scene, allowing users to access rooms that are located in the air. There are two ways to teleport to a room: by entering the teleporter at the Space Base location or by using the map available through the 2D UI menu.
- **setupAreaSystem :**
  The Area System is a trigger system that operates based on the Raycast System. It is used to implement music switching in different locations and to start/stop video content playing on screens, which are managed through the DAO HQ Admin Panel.
  The `setupAreaLayers` and `setupAreaEvents` functions are responsible for setting up layers and the necessary events in the scene, respectively.
- **setupArcade :**
  The `setupArcade` function sets up arcade machines in the scene.
- **setupThemes :**
  The `setupThemes` function sets the background music for all areas of the main scene.
- **setupSounds :**
  The `setupSounds` functions creates ambient sounds attached to scene models
- **setupScene :**
  The `setupScene` function that sets up all the individual parts of the 3D scene, which are described above or partially located in the **shared** directory.
