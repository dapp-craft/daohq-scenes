import * as process from 'process';
import * as fs from 'node:fs/promises'
import * as path from 'path';
import { constructLocationIdentifier } from '../shared/scripts/locationIdentifier'

const FILE_PATH = path.join(process.cwd(), 'scene.json')
const IS_STAGING = process.argv[2] === 'staging'

async function parseSceneIdentity() {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf8')
    const jsonData = JSON.parse(data)
    
    console.log(constructLocationIdentifier({
      realm: jsonData.worldConfiguration?.name,
      coordinates: {
        x: jsonData.scene.base.split(",")[0],
        y: jsonData.scene.base.split(",")[1],
      },
      network: IS_STAGING ? "sepolia" : "mainnet",
      catalyst: IS_STAGING ? "peer-testing.decentraland.org" : undefined,
    }))
  } catch (error) {
    console.error(`Error: ${error}`)
    process.exit(1)
  }
}

if (process.argv.length < 3) {
  console.log('Usage: node parse_scene_identity.js {testing|staging|production}')
  process.exit(1)
}

parseSceneIdentity()
