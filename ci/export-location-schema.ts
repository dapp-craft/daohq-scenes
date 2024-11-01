import {
  IExtraLocatorData,
  ILocationSchema,
  ILocatorNode,
  SCREEN_FORMATS
} from "../shared/types";
import {
  addItemToSchema,
  mergeConfigs,
  parseLocatorsNodes,
} from "../shared/scripts/extraLocators";
import * as fs from "node:fs/promises";
import * as path from "path";

const extraLocatorsConfigPath = path.join(
  `file://${process.cwd()}`,
  "src",
  "scene",
  "constants",
  "index"
);

import(extraLocatorsConfigPath).then(
  ({ configsToMerge, extraLocatorsFiles }) => {
    async function readLocatorsFromFile(path: string) {
      const data = await fs.readFile(path, "utf8");
      const parsedData = JSON.parse(data);
      if (
        parsedData &&
        typeof parsedData === "object" &&
        "nodes" in parsedData &&
        Array.isArray(parsedData.nodes) &&
        parsedData.nodes.length
      )
        return parsedData.nodes as ILocatorNode[];
      else throw new Error();
    }

    async function exportScheme() {
      const locatorsPromises = extraLocatorsFiles.map(
        async (path) => await readLocatorsFromFile(`locators/${path}`)
      );
      const locatorNodes = await Promise.all(locatorsPromises);

      const locatorConfigs = locatorNodes.map(parseLocatorsNodes);
      let mergedInterimConfigs: IExtraLocatorData[] = [];
      for (const config of locatorConfigs.concat(configsToMerge)) {
        mergedInterimConfigs = mergeConfigs(mergedInterimConfigs, config);
      }

      const locationsSchema: ILocationSchema = {};

      mergedInterimConfigs.forEach((config) => {
        if (config.name.startsWith("screen_") && !config.extras?.ignoreScheme) {
          if (
            config.extras &&
            config.extras.locationId &&
            config.extras.slotId
          ) {
            addItemToSchema(locationsSchema, {
              locationId: config.extras.locationId.toString(),
              slotId: config.extras.slotId.toString(),
              slotName:
                config.extras.description?.toString() ||
                "Name is not available",
              forBooking:
                typeof config.extras.for_booking === "boolean"
                  ? config.extras.for_booking
                  : false,
              supportsStreaming:
                typeof config.extras.supports_streaming === "boolean"
                  ? config.extras.supports_streaming
                  : false,
              format: 
                typeof config.extras.screenFormat === "string"
                  ? config.extras.screenFormat
                  : SCREEN_FORMATS.STANDARD_WIDE,
              trigger: typeof config.extras.trigger === "object"
            });
          }
        }
        if (config.name.startsWith("discord_")) {
          if (
            config.extras &&
            config.extras.locationId &&
            config.extras.discord_id &&
            config.extras.description
          ) {
            addItemToSchema(locationsSchema, {
              locationId: config.extras.locationId.toString(),
              forBooking: false,
              discordId: config.extras.discord_id.toString(),
              discordDescription: config.extras.description.toString(),
            });
          }
        }
      });

      fs.writeFile(
        "location-schema.json",
        JSON.stringify(locationsSchema, null, 4),
        "utf8"
      );
    }

    exportScheme();
  }
);
