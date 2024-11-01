import { Brick } from '../gameObjects/brick'
import { Wall } from '../gameObjects/wall'
import { Background } from '../gameObjects/background'
import { GameManager } from '../gameManager'

// Ready player one
const readyPlayerOne = new Entity()
readyPlayerOne.addComponent(new GLTFShape('models/readyPlayerOne.glb'))
readyPlayerOne.addComponent(new Transform({ position: new Vector3(16, 1, 16) }))

// Setup
const gameElements: Entity[] = []
const colorOrange = Color3.FromInts(247, 147, 26)
const brickOffsetX = 7
const brickOffsetZ = 28.75
const brickSize = 0.55
const bricks = [
  // Row 1
  { position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ), color: colorOrange },
  { position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ), color: colorOrange },
  { position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ), color: colorOrange },
  { position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ), color: colorOrange },
  { position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ), color: colorOrange },
  { position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ), color: colorOrange },
  { position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ), color: colorOrange },
  { position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ), color: colorOrange },
  // Row 2
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize),
    color: colorOrange
  },
  // Row 3
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 2),
    color: colorOrange
  },
  // Row 4
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 3),
    color: colorOrange
  },
  // Row 5
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 4),
    color: colorOrange
  },
  // Row 6
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 5),
    color: colorOrange
  },
  // Row 7
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 6),
    color: colorOrange
  },
  // Row 8
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 7),
    color: colorOrange
  },
  // Row 9
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 8),
    color: colorOrange
  },
  // Row 10
  {
    position: new Vector3(brickOffsetX + brickSize * 2, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 31, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 9),
    color: colorOrange
  },
  // Row 11
  {
    position: new Vector3(brickOffsetX + brickSize * 2, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 31, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 10),
    color: colorOrange
  },
  // Row 12
  {
    position: new Vector3(brickOffsetX + brickSize * 2, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 31, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 11),
    color: colorOrange
  },
  // Row 13
  {
    position: new Vector3(brickOffsetX + brickSize, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 2, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 31, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 32, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 12),
    color: colorOrange
  },
  // Row 14
  {
    position: new Vector3(brickOffsetX + brickSize, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 2, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 31, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 32, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 13),
    color: colorOrange
  },
  // Row 15
  {
    position: new Vector3(brickOffsetX + brickSize, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 2, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 31, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 32, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 14),
    color: colorOrange
  },
  // Row 16
  {
    position: new Vector3(brickOffsetX + brickSize, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 2, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 31, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 32, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 15),
    color: colorOrange
  },
  // Row 17
  {
    position: new Vector3(brickOffsetX + brickSize, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 2, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 31, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 32, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 16),
    color: colorOrange
  },
  // Row 18
  {
    position: new Vector3(brickOffsetX + brickSize, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 2, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 31, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 32, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 17),
    color: colorOrange
  },
  // Row 19
  {
    position: new Vector3(brickOffsetX + brickSize, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 2, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 31, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 32, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 18),
    color: colorOrange
  },
  // Row 20
  {
    position: new Vector3(brickOffsetX + brickSize, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 2, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 31, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 32, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 19),
    color: colorOrange
  },
  // Row 21
  {
    position: new Vector3(brickOffsetX + brickSize * 2, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 31, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 20),
    color: colorOrange
  },
  // Row 22
  {
    position: new Vector3(brickOffsetX + brickSize * 2, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 31, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 21),
    color: colorOrange
  },
  // Row 23
  {
    position: new Vector3(brickOffsetX + brickSize * 2, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 31, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 22),
    color: colorOrange
  },
  // Row 24
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 23),
    color: colorOrange
  },
  // Row 25
  {
    position: new Vector3(brickOffsetX + brickSize * 3, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 30, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 24),
    color: colorOrange
  },
  // Row 26
  {
    position: new Vector3(brickOffsetX + brickSize * 4, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 29, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 25),
    color: colorOrange
  },
  // Row 27
  {
    position: new Vector3(brickOffsetX + brickSize * 5, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: Color3.White()
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 28, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 26),
    color: colorOrange
  },
  // Row 28
  {
    position: new Vector3(brickOffsetX + brickSize * 6, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 27, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 27),
    color: colorOrange
  },
  // Row 29
  {
    position: new Vector3(brickOffsetX + brickSize * 7, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 26, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 28),
    color: colorOrange
  },
  // Row 30
  {
    position: new Vector3(brickOffsetX + brickSize * 8, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 9, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 24, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 25, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 29),
    color: colorOrange
  },
  // Row 31
  {
    position: new Vector3(brickOffsetX + brickSize * 10, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 11, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 12, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 21, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 22, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 23, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 30),
    color: colorOrange
  },
  // Row 32
  {
    position: new Vector3(brickOffsetX + brickSize * 13, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 31),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 14, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 31),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 15, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 31),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 16, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 31),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 17, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 31),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 18, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 31),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 19, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 31),
    color: colorOrange
  },
  {
    position: new Vector3(brickOffsetX + brickSize * 20, GameManager.PLANE_HEIGHT, brickOffsetZ - brickSize * 31),
    color: colorOrange
  }
]

// Load level
export function loadBitcoinLevel(parent: Entity): void {
  readyPlayerOne.setParent(parent)

  // Wall
  const wallLeft = new Wall(
    new Transform({ position: new Vector3(3.5, GameManager.PLANE_HEIGHT + 0.1, 16), scale: new Vector3(2, 0.1, 32) }),
    new Vector3(1, 0, 0),
    Color3.White(),
    parent
  )
  const wallTop = new Wall(
    new Transform({ position: new Vector3(16, GameManager.PLANE_HEIGHT + 0.1, 31.5), scale: new Vector3(27, 0.1, 2) }),
    new Vector3(0, 0, -1),
    Color3.White(),
    parent
  )
  const wallRight = new Wall(
    new Transform({ position: new Vector3(28.5, GameManager.PLANE_HEIGHT + 0.1, 16), scale: new Vector3(2, 0.1, 32) }),
    new Vector3(-1, 0, 0),
    Color3.White(),
    parent
  )

  // Background
  const background = new Background(
    new Transform({ position: new Vector3(16, GameManager.PLANE_HEIGHT - 0.1, 16), scale: new Vector3(26, 0.01, 32) }),
    parent
  )
}

export function loadBitcoinBricks(parent: Entity): void {
  readyPlayerOne.getComponent(GLTFShape).visible = false
  for (let i = 0; i < bricks.length; i++) {
    const brick = new Brick(
      new Transform({ position: bricks[i].position, scale: new Vector3(brickSize - 0.1, 0.1, brickSize - 0.1) }),
      bricks[i].color,
      parent
    )
    gameElements.push(brick)
  }
}

export function unloadBitcoinBricks(): void {
  readyPlayerOne.getComponent(GLTFShape).visible = true
  while (gameElements.length) {
    let gameElement = gameElements.pop()
    engine.removeEntity(gameElement as any)
  }
}
