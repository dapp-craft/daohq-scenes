import * as process from "process";
import * as fs from "fs";
import * as path from "path";

const vars = {
  BASE_URL: "",
  BASE_QUEST_URL: ""
};

for (const key in vars) {
  if (process.env[key]) {
    vars[key] = process.env[key];
  } else {
    console.error(`Environment variable ${key} is missing`);
  }
}

// Save the config to a ts file
let config = "";
Object.keys(vars).forEach((key) => {
  config += `export const ${key}: string = '${vars[key]}'\n`;
});

fs.writeFileSync(path.join(process.cwd(), "deployConfig.ts"), config);
