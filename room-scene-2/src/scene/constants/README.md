### Configs for Atom Space Room (room-scene-2)

- **areaConfig.ts :**
  This specifies the configuration data for the area system, which operates based on a raycast system.
  It includes data about the zone IDs and the names of the associated models.

- **interactionConfig.ts && postersConfigs.ts && screenConfigs.ts :**
  These files specify the configurations for the extra locators system. Each file contains settings for
  a specific type of configuration for setting up a particular part of the scene in the extra locators system.
  **The extra locator system** is described in more detail in the [SHARED DIRECTORY](/shared/scripts/README.md).

- **index.ts :**
  Here is a general list of files (an array of strings) that will be read by the system of extra locators.
  Additionally, a common array with configurations for merging by the extra locators system is created and
  exported here. There are also other settings for the scene, such as offset, names of models to hide,
  and more.
