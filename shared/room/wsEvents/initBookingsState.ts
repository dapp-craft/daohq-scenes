import { screenContentManager } from '../../globals'
import { ISlotStateItem } from '../../types'

export const initBookingsState = (event: MessageEvent) => {
  const wsMessage = JSON.parse(event.data)
  if (wsMessage && 'data' in wsMessage && Array.isArray(wsMessage.data) && wsMessage.data.length) {
    wsMessage.data.forEach((slotState: ISlotStateItem) => {
      const bookingToUpdate = screenContentManager.contentState.liveBookings.find(
        (liveBookingItem) => liveBookingItem.bookingItem.id === slotState.booking
      )
      if (bookingToUpdate) {
        screenContentManager.contentState.liveEventContentState = slotState
        const screensToUpdate = bookingToUpdate.bookingScreens.filter((bookedScreenItem) => {
          if (bookedScreenItem.screen.slotId) {
            return +bookedScreenItem.screen.slotId === +slotState.slot
          } else return false
        })
        screensToUpdate.forEach((screenItem) => {
          screenItem.screen.counter = slotState.content_index
          if (
            slotState.is_paused &&
            screenItem.screen.resource &&
            screenItem.screen.resource.length &&
            screenItem.screen.resource[screenItem.screen.counter].type === 'video'
          ) {
            screenItem.screen.stopVideoPlaying()
          } else if (
            screenItem.screen.resource &&
            screenItem.screen.resource.length &&
            screenItem.screen.resource[screenItem.screen.counter].type === 'video' &&
            screenItem.screen.isUserInTriggerZone
          ) {
            screenItem.screen.startVideoPlaying()
          } else {
            screenItem.screen.setContent()
          }
        })
      }
    })
  }
}
