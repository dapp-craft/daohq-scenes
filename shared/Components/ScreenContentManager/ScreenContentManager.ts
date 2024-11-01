import { VideoPlayer, VideoState, videoEventsSystem } from '@dcl/sdk/ecs'
import { base_url, musicState, screensInstances } from '../../globals'
import { useFetch } from '../../scripts'
import { ISlotStateItem, LOCATIONS_ID_ENUM } from '../../types'
import { Screen } from '../Screen/Screen'
import { IBookingItem, ICreatedScreen, ScreenFormatEnum } from '../Screen/types'
import { timers } from '@dcl-sdk/utils'

export interface ISceneContentState {
  screenFromTrigger: Screen | null
  screenInFocus: Screen | null
  screensQueue: Screen[]
  userInLocation: string | null
  liveBookings: ILiveBookingStateItem[]
  liveEventContentState: Partial<ISlotStateItem>
}

interface ILiveBookingStateItem {
  bookingItem: IBookingItem
  bookingScreens: ICreatedScreen[]
}

export class ScreenContentManager {
  public contentState: ISceneContentState
  private checkingDuration: number
  private checkingTimeoutId: number | null

  constructor(defaultState?: ISceneContentState) {
    this.contentState = {
      screenFromTrigger: null,
      screensQueue: [],
      screenInFocus: null,
      userInLocation: null,
      liveBookings: [],
      liveEventContentState: { booking: undefined, content_index: undefined, is_paused: undefined, slot: undefined }
    }
    if (defaultState) this.contentState = defaultState
    this.checkingDuration = 1000
    this.checkingTimeoutId = null
  }

  async updateSceneContentState(newState: ISceneContentState, contentSwitchingType: 'on' | 'off' | 'no switch') {
    this.contentState.screenFromTrigger = newState.screenFromTrigger
    if (contentSwitchingType === 'on' && newState.screenFromTrigger) {
      await this.cancelVideoPlayingMode()
      if (this.contentState.screenInFocus) this.clearScreensQueue()

      if (this.contentState.screenFromTrigger) this.contentState.screensQueue.push(newState.screenFromTrigger)
      this.contentState.screenInFocus = this.contentState.screensQueue[this.contentState.screensQueue.length - 1]
      this.runVideoPlayingMode()
    }
    if (contentSwitchingType === 'off' && newState.screenFromTrigger) {
      if (newState.screenFromTrigger?.name === this.contentState.screenInFocus?.name) {
        await this.cancelVideoPlayingMode()
        this.clearScreensQueue()
        this.contentState.screenInFocus = null
      } else {
        await this.cancelVideoPlayingMode(newState.screenFromTrigger)
        this.clearScreensQueue(newState.screenFromTrigger)
      }
    }
    if (contentSwitchingType === 'no switch') this.contentState = newState
  }

  async clearScreensQueue(screenToRemove?: Screen) {
    const screenToManage = screenToRemove || this.contentState.screenInFocus

    const stopScreenInQueue = async (screenInQueue: Screen) => {
      if (
        screenInQueue &&
        screenInQueue.resource &&
        screenInQueue.resource[screenInQueue.counter] &&
        screenInQueue.resource[screenInQueue.counter].type === 'video'
      ) {
        const state = videoEventsSystem.getVideoState(screenInQueue.screenEntity)?.state
        const player = VideoPlayer.getOrNull(screenInQueue.screenEntity)
        if ((player?.playing || state === VideoState.VS_PLAYING) && !screenInQueue.isUserInTriggerZone) {
          await this.cancelVideoPlayingMode(screenInQueue)
        }
      }
    }

    if (this.contentState.screensQueue.length && screenToManage) {
      const index = this.contentState.screensQueue.indexOf(screenToManage)
      await stopScreenInQueue(this.contentState.screensQueue[index])
      this.contentState.screensQueue.splice(index, 1)
    }
  }

  runVideoPlayingMode(screen?: Screen) {
    const screenToManage = screen || this.contentState.screenInFocus
    if (screenToManage) {
      const { counter } = screenToManage
      if (
        screenToManage.resource?.length &&
        (screenToManage.resource[counter].type === ScreenFormatEnum.video ||
          screenToManage.resource[counter].type === ScreenFormatEnum.cast_stream) &&
        screenToManage.isUserInTriggerZone
      ) {
        musicState.isPlay = false
        screenToManage.clearIntervalTimer()
        if (this.isScreenBooked(screenToManage)) {
          screenToManage.startVideoPlaying(!this.isBookingVideoOnPause(this.contentState.screenInFocus?.slotId))
        } else {
          screenToManage.startVideoPlaying()
        }
      } else if (screenToManage.isUserInTriggerZone) {
        this.checkingTimeoutId = timers.setTimeout(() => this.runVideoPlayingMode(screen), this.checkingDuration)
      }
    }
  }

  async cancelVideoPlayingMode(screen?: Screen) {
    if (this.checkingTimeoutId) timers.clearTimeout(this.checkingTimeoutId)
    const screenToManage = screen || this.contentState.screenInFocus
    if (screenToManage) {
      const { counter } = screenToManage
      if (screenToManage.resource?.length && screenToManage.resource[counter].type === ScreenFormatEnum.video) {
        musicState.isPlay = true
        screenToManage.clearIntervalTimer()
        await screenToManage.stopVideoPlaying()
        if (screenToManage && screenToManage.isRunScreenIntervalMode && !this.isScreenBooked(screenToManage)) {
          screenToManage.runScreenInIntervalMode()
        }
      }
    }
  }

  isScreenBooked(screen: Screen) {
    return this.contentState.liveBookings.some((booking) => {
      if (screen) {
        return booking.bookingItem.location === screen.locationId
      } else {
        return false
      }
    })
  }

  async getLiveBookings() {
    const liveBookings = await useFetch({ url: `${base_url}/all/bookings/live` })
    if (liveBookings.resultReq && Array.isArray(liveBookings.resultReq) && liveBookings.resultReq.length) {
      liveBookings.resultReq.forEach((booking: IBookingItem) => {
        this.contentState.liveBookings.push({
          bookingItem: booking,
          bookingScreens: []
        })
      })
      this.getToProcessLiveBookingScreens()
    }
  }

  getToProcessLiveBookingScreens() {
    if (this.contentState.liveBookings.length) {
      this.contentState.liveBookings.forEach((booking) => {
        const screensForBooking = screensInstances.screens.filter(
          (screenItem) => screenItem.screen.locationId === booking.bookingItem.location
        )
        booking.bookingScreens = screensForBooking
      })
    }
  }

  isBookingVideoOnPause(slotId: number | string | undefined): boolean {
    if (
      this.contentState.liveEventContentState.is_paused !== undefined &&
      slotId &&
      +slotId === this.contentState.liveEventContentState.slot
    ) {
      return Boolean(this.contentState.liveEventContentState.is_paused)
    } else return false
  }
}
