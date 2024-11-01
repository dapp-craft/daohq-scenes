import { allEventPosters } from '../states/states'

export const eventClosesBookingUpdate = async (event: MessageEvent) => {
  const wsMessage = JSON.parse(event.data)
  if (
    'data' in wsMessage &&
    typeof wsMessage.data === 'object' &&
    'location' in wsMessage.data &&
    typeof wsMessage.data.location === 'string'
  ) {
    allEventPosters.forEach((eventPoster) => {
      console.log('eventPoster!', eventPoster)
      if (eventPoster.locationId === wsMessage.data.location) {
        eventPoster.updateContent()
      }
    })
  }
}
