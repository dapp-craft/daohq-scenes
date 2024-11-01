import { musicState, screenContentManager } from 'daohq-shared/globals'
import { SOUND_MANAGER } from '../states/states'

let isMusicTurnOff: boolean = false

export const musicStateSystem = () => {
  if (!musicState.isPlay && !isMusicTurnOff) {
    isMusicTurnOff = true
    SOUND_MANAGER.setTheme(undefined)
  }

  if (musicState.isPlay && isMusicTurnOff) {
    isMusicTurnOff = false
    const {
      contentState: { userInLocation }
    } = screenContentManager
    if (userInLocation) {
      SOUND_MANAGER.setTheme(userInLocation)
    } else {
      throw new Error('Cannot find the required location ID for the theme music after the video is turned off')
    }
  }
}
