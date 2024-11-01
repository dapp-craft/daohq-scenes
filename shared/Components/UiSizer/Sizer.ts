import { UiCanvasInformation, engine } from '@dcl/sdk/ecs'

export class Sizer {
  ratio: number
  screenRatio: number
  screenWidth: number
  screenHeight: number

  constructor(ratio: number) {
    this.ratio = ratio

    const { height, width } = UiCanvasInformation.get(engine.RootEntity)
    this.screenWidth = width
    this.screenHeight = height
    this.screenRatio = width / height
  }

  width(percent: number) {
    if (this.screenRatio > this.ratio) return percent * this.screenHeight * this.ratio
    else return percent * this.screenWidth
  }

  height(percent: number) {
    if (this.screenRatio > this.ratio) return percent * this.screenHeight
    else return (percent * this.screenWidth) / this.ratio
  }

  fontSize(sizePx: number) {
    if (this.screenRatio > this.ratio) {
      return (((sizePx / 10) * 1.7) / 100) * this.screenHeight * this.ratio
    } else {
      return (((sizePx / 10) * 1.7) / 100) * this.screenWidth
    }
  }

  viewportSize(percent: number) {
    if (this.screenRatio > this.ratio) {
      return percent * this.screenHeight * this.ratio
    } else {
      return percent * this.screenWidth
    }
  }

  viewportHeightSize(percent: number) {
    return percent * this.screenHeight
  }
}
