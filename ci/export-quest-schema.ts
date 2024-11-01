import path from "path";
import * as fs from "node:fs/promises";

const questConfigPath = path.join(
  `file://${process.cwd()}`,
  "src",
  "quests",
  "src",
  "questConfig"
);

console.log(questConfigPath);

import(questConfigPath).then(({ questNamePointer, questPerDay, questDailyPrice, coinsNumberAndPrice, rewardList }) => {
  interface Quest {
    order: number;
    day: number;
    reward_count: number;
  }

  const quests: { [key: string]: Quest } = {};
  const questArray = Array.from(questNamePointer, ([name, obj]) => ({ name, ...obj }));
  questArray.forEach((e: any, k: number) => {
    quests[e.name] = {
      order: e.pointer,
      day: e.day,
      reward_count: e.revard,
    };
  });
  let coins: { [key: number]: number } = {};
  for (let i = 1; i <= coinsNumberAndPrice.coinNumber; i++) {
    coins[i] = coinsNumberAndPrice.coinPrice
  }
  let rewards: { [key: number]: any } = {};
  rewardList.forEach((e: any, k: number) => {
    rewards[k] = { price: e.price, blockchain_id: e.blockchain_id, collection: e.collection };
  });
  fs.writeFile(
    "export-quest-schema.json",
    JSON.stringify({ dailyQuestPerDay: questPerDay, dailyQuestPrice: questDailyPrice, quests: quests, coins: coins, coinsPerDay: coinsNumberAndPrice.maxDayCoin, rewards: rewards }, null, 4),
    "utf8"
  );
});
