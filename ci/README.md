## CI sync schema

In the DAO HQ project, there is a scheme where the backend state is determined by the frontend (3D scene) configuration. This synchronization occurs in several stages.

- #### Location schema synchronization.

  After the scene is successfully built, a POST request is sent to the endpoint **/sync/location-schema**. In the request body, a JSON file with the following data structure needs to be sent:

  ```
    {
      "locationId": {
        "type": "outdoor" | "room",
        "for_booking": boolean,
        "slots": [
            {
              "id": string | number,
              "name": string,
              "supports_streaming": boolean,
              "format": string,
              "trigger": boolean
            },
            ...
          ],
        "discord_screens": [
          {
            "id": string,
            "description": string
          },
          ...
        ]
      },
      //another locations
      ...
    }
  ```

  This process synchronizes the location schema on the scene with the backend. It ensures that content is correctly displayed on the screens in the scene and can be fully managed through the DAO HQ Admin Panel. For any new element of this schema to appear on the backend, it must first be present on the scene.
  After a new scene build, the script in the **export-location-schema.ts** file will create the necessary new configuration JSON file. This file is synchronized with the backend using the method described above, and the updated data will be available for administration.

- #### Quest schema synchronization.

  This script dynamically loads and processes quest data from a configuration file, organizing it into a structured JSON format.

  ##### **Setup**

  1. **Prerequisites**: Ensure **Node.js** is installed.
  2. **Configuration Path**: Place your `questConfig` file at `src/quests/src/questConfig`.

  ##### **Usage**

  Run the script with:

  ```bash
  node export-quest-schema.js
  ```

  The output will be saved as `export-quest-schema.json` in the root directory.

  ##### **Key Functions**

  1. **Load Configuration**: Dynamically imports data from `questConfig`.
  2. **Process Quests**: Maps each quest to an object with order, day, and reward count.
  3. **Map Coins and Rewards**: Creates structured objects for coins and rewards.
  4. **Export**: Saves the data to `export-quest-schema.json` in a readable JSON format.

  ##### **Output Format**

  The JSON output contains:

  - **dailyQuestPerDay**: Number of quests per day.
  - **dailyQuestPrice**: Price of each daily quest.
  - **quests**: Quest details by name.
  - **coins**: Coins with prices.
  - **coinsPerDay**: Maximum coins available daily.
  - **rewards**: Details on rewards.

  This process synchronizes the location schema in the scene with the backend, ensuring content displays correctly on scene. For any new element of this schema to appear on the backend, it must first be added to the scene. After building a new scene, the script in the export-quest-schema.json file generates the necessary configuration JSON file. This file is then synchronized with the backend as described above, ensuring data is updated.
