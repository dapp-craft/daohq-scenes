import * as utils from '@dcl/ecs-scene-utils'
import { Arcade } from './gameObjects/arcade'
import { loadPlayer, unloadPlayer } from './player'
import { loadAtariLevel, loadAtariBricks, unloadAtariBricks } from './gameLogic/atariLevel'
import { loadBitcoinLevel, loadBitcoinBricks, unloadBitcoinBricks } from './gameLogic/bitcoinLevel'
import { loadEthereumLevel, loadEthereumBricks, unloadEthereumBricks } from './gameLogic/ethereumLevel'
import { loadDecentralandLevel, loadDecentralandBricks, unloadDecentralandBricks } from './gameLogic/decentralandLevel'
import { GameManager } from './gameManager'
import { X_DELTA, Y_DELTA } from './scenePos'

function positionOffset(position: Vector3): Vector3 {
  const offset = new Vector3(X_DELTA * 16, 0, Y_DELTA * 16)
  return new Vector3(position.x + offset.x, position.y + offset.y, position.z + offset.z)
}

const POSITION_ARCADE_1 = new Transform({
  position: positionOffset(new Vector3(96.05890464782715, 0.17895297706127167, 52.06349754333496)),
  rotation: new Quaternion(0, 0.8309658765792847, 0, 0.5563234090805054)
})

const POSITION_ARCADE_2 = new Transform({
  position: positionOffset(new Vector3(64.00844287872314, 0.17848560214042664, 47.2317008972168)),
  rotation: new Quaternion(0, 0.9999896883964539, 0, 0.004539333749562502)
})

const POSITION_ARCADE_3 = new Transform({
  position: positionOffset(new Vector3(70.13271617889404, 0.178586944937706, 125.36661148071289)),
  rotation: new Quaternion(0, -0.1978975385427475, 0, 0.9802228212356567)
})

const POSITION_ARCADE_4 = new Transform({
  position: positionOffset(new Vector3(90.53279781341553, 0.17850670218467712, 20.38039779663086)),
  rotation: new Quaternion(0, 0.9985766410827637, 0, 0.05333661660552025)
})

log('Arcade 1 init pos: ', POSITION_ARCADE_1)
log('Arcade 2 init pos: ', POSITION_ARCADE_2)
log('Arcade 3 init pos: ', POSITION_ARCADE_3)
log('Arcade 4 init pos: ', POSITION_ARCADE_4)

// Atari arcade cabinet
const arcadeCabinetAtari = new Arcade(POSITION_ARCADE_1)

// Breakout atari
const atariGameTransform = new Entity()
atariGameTransform.addComponent(new Transform({ position: new Vector3(-0.48, 1.38, -0.195) }))
atariGameTransform.getComponent(Transform).scale.setAll(0.03)
atariGameTransform.getComponent(Transform).rotate(Vector3.Left(), 75)
atariGameTransform.setParent(arcadeCabinetAtari)
let arcadeCabinetAtariTrigger = new utils.TriggerBoxShape(new Vector3(6, 4, 6), new Vector3(0, 2, 0))
loadAtariLevel(atariGameTransform)

arcadeCabinetAtari.addComponent(
  new utils.TriggerComponent(arcadeCabinetAtariTrigger, {
    onCameraEnter: () => {
      if (!GameManager.hasGameLoaded) {
        loadAtariBricks(atariGameTransform)
        loadPlayer(atariGameTransform, arcadeCabinetAtari)
      }
    },
    onCameraExit: () => {
      if (GameManager.hasGameLoaded) {
        unloadAtariBricks()
        unloadPlayer()
      }
    },
    enableDebug: false
  })
)

// Bitcoin arcade cabinet
const arcadeCabinetBitcoin = new Arcade(POSITION_ARCADE_2)

// Breakout bitcoin
const bitcoinGameTransform = new Entity()
bitcoinGameTransform.addComponent(new Transform({ position: new Vector3(-0.48, 1.38, -0.195) }))
bitcoinGameTransform.getComponent(Transform).scale.setAll(0.03)
bitcoinGameTransform.getComponent(Transform).rotate(Vector3.Left(), 75)
bitcoinGameTransform.setParent(arcadeCabinetBitcoin)
let arcadeCabinetBitcoinTrigger = new utils.TriggerBoxShape(new Vector3(6, 4, 6), new Vector3(0, 2, 0))
loadBitcoinLevel(bitcoinGameTransform)

arcadeCabinetBitcoin.addComponent(
  new utils.TriggerComponent(arcadeCabinetBitcoinTrigger, {
    onCameraEnter: () => {
      if (!GameManager.hasGameLoaded) {
        loadBitcoinBricks(bitcoinGameTransform)
        loadPlayer(bitcoinGameTransform, arcadeCabinetBitcoin)
      }
    },
    onCameraExit: () => {
      if (GameManager.hasGameLoaded) {
        unloadBitcoinBricks()
        unloadPlayer()
      }
    },
    enableDebug: false
  })
)

// Ethereum arcade cabinet
const arcadeCabinetEthereum = new Arcade(POSITION_ARCADE_3)

// Breakout ethereum
const ethereumGameTransform = new Entity()
ethereumGameTransform.addComponent(new Transform({ position: new Vector3(-0.48, 1.38, -0.195) }))
ethereumGameTransform.getComponent(Transform).scale.setAll(0.03)
ethereumGameTransform.getComponent(Transform).rotate(Vector3.Left(), 75)
ethereumGameTransform.setParent(arcadeCabinetEthereum)
let arcadeCabinetEthereumTrigger = new utils.TriggerBoxShape(new Vector3(6, 4, 6), new Vector3(0, 2, 0))
loadEthereumLevel(ethereumGameTransform)

arcadeCabinetEthereum.addComponent(
  new utils.TriggerComponent(arcadeCabinetEthereumTrigger, {
    onCameraEnter: () => {
      if (!GameManager.hasGameLoaded) {
        loadEthereumBricks(ethereumGameTransform)
        loadPlayer(ethereumGameTransform, arcadeCabinetEthereum)
      }
    },
    onCameraExit: () => {
      if (GameManager.hasGameLoaded) {
        unloadEthereumBricks()
        unloadPlayer()
      }
    },
    enableDebug: false
  })
)

// Decentraland arcade cabinet
const arcadeCabinetDecentraland = new Arcade(POSITION_ARCADE_4)

// Breakout decentraland
const decentralandGameTransform = new Entity()
decentralandGameTransform.addComponent(new Transform({ position: new Vector3(-0.48, 1.38, -0.195) }))
decentralandGameTransform.getComponent(Transform).scale.setAll(0.03)
decentralandGameTransform.getComponent(Transform).rotate(Vector3.Left(), 75)
decentralandGameTransform.setParent(arcadeCabinetDecentraland)
let arcadeCabinetDecentralandTrigger = new utils.TriggerBoxShape(new Vector3(6, 4, 6), new Vector3(0, 2, 0))
loadDecentralandLevel(decentralandGameTransform)

arcadeCabinetDecentraland.addComponent(
  new utils.TriggerComponent(arcadeCabinetDecentralandTrigger, {
    onCameraEnter: () => {
      if (!GameManager.hasGameLoaded) {
        loadDecentralandBricks(decentralandGameTransform)
        loadPlayer(decentralandGameTransform, arcadeCabinetDecentraland)
      }
    },
    onCameraExit: () => {
      if (GameManager.hasGameLoaded) {
        unloadDecentralandBricks()
        unloadPlayer()
      }
    },
    enableDebug: false
  })
)
