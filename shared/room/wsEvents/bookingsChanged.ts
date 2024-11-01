import { IBookingItem } from '../../Components/Screen/types'
import { screenContentManager } from '../../globals'
import { connectToBookingsWs } from '../../scripts'
import { updateLocationData } from '../../setupFnc/setupScreens'

export async function eventBookingsChanged(event: MessageEvent) {
  const wsMessage = JSON.parse(event.data)
  if (
    'data' in wsMessage &&
    typeof wsMessage.data === 'object' &&
    'location' in wsMessage.data &&
    typeof wsMessage.data.location === 'string'
  ) {
    const bookingProcessing = (bookings: IBookingItem[]) => {
      bookings.forEach((booking: IBookingItem) => {
        const liveBookingState = screenContentManager.contentState.liveBookings.find(
          (liveBooking) => liveBooking.bookingItem.id === booking.id
        )
        if (liveBookingState) {
          const index = screenContentManager.contentState.liveBookings.indexOf(liveBookingState)
          screenContentManager.contentState.liveBookings.splice(index, 1)
        } else {
          screenContentManager.contentState.liveBookings.push({
            bookingItem: booking,
            bookingScreens: []
          })
          connectToBookingsWs()
        }
      })
    }
    if ('bookings' in wsMessage.data && Array.isArray(wsMessage.data.bookings)) {
      let bookingStateType: 'started' | 'finished' | null = null
      if ('type' in wsMessage) {
        if (wsMessage.type === 'bookings_finished') bookingStateType = 'finished'
        if (wsMessage.type === 'bookings_started') bookingStateType = 'started'
      }
      if (bookingStateType === 'started') {
        bookingProcessing(wsMessage.data.bookings)
        screenContentManager.getToProcessLiveBookingScreens()
      }
      await updateLocationData(wsMessage.data.location, bookingStateType ? bookingStateType : 'started')
    }
    if ('started' in wsMessage.data && Array.isArray(wsMessage.data.started)) {
      bookingProcessing(wsMessage.data.started)
      screenContentManager.getToProcessLiveBookingScreens()
      await updateLocationData(wsMessage.data.location, 'started')
    }
    if ('finished' in wsMessage.data && Array.isArray(wsMessage.data.finished)) {
      bookingProcessing(wsMessage.data.finished)
      screenContentManager.getToProcessLiveBookingScreens()
      await updateLocationData(wsMessage.data.location, 'finished')
    }
  }
}
