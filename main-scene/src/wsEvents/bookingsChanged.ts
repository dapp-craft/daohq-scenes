import { IBookingItem } from 'daohq-shared/Components/Screen/types'
import { screenContentManager } from 'daohq-shared/globals'
import { connectToBookingsWs } from 'daohq-shared/scripts'
import { updateLocationData } from 'daohq-shared/setupFnc/setupScreens'
import { allEventPosters } from '../states/states'
import { getEventsUiData } from '../scripts/getEventsUiData'

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
      allEventPosters.forEach((eventPoster) => {
        console.log(`eventPoster bookings ${bookingStateType}!`, eventPoster)
        if (eventPoster.locationId === wsMessage.data.location) {
          eventPoster.updateContent()
        }
      })
    }
    if ('started' in wsMessage.data && Array.isArray(wsMessage.data.started)) {
      bookingProcessing(wsMessage.data.started)
      screenContentManager.getToProcessLiveBookingScreens()
      await updateLocationData(wsMessage.data.location, 'started')
      allEventPosters.forEach((eventPoster) => {
        console.log('eventPoster started!', eventPoster)
        if (eventPoster.locationId === wsMessage.data.location) {
          console.log('started', wsMessage.data)
          eventPoster.updateContent()
        }
      })
    }
    if ('finished' in wsMessage.data && Array.isArray(wsMessage.data.finished)) {
      bookingProcessing(wsMessage.data.finished)
      screenContentManager.getToProcessLiveBookingScreens()
      await updateLocationData(wsMessage.data.location, 'finished')
      allEventPosters.forEach((eventPoster) => {
        console.log('eventPoster finished!', eventPoster)
        if (eventPoster.locationId === wsMessage.data.location) {
          eventPoster.updateContent()
        }
      })
    }
    getEventsUiData()
  }
}
