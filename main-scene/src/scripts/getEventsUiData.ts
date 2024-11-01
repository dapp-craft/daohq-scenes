import { IBookingItem } from 'daohq-shared/Components/Screen/types'
import { base_url } from 'daohq-shared/globals'
import { useFetch } from 'daohq-shared/scripts'
import { eventsData, IBookingInUiList } from '../states/states'

export const getEventsUiData = async () => {
  const liveBookings = await useFetch({ url: `${base_url}/all/bookings/live` })
  if (liveBookings && liveBookings.resultReq && Array.isArray(liveBookings.resultReq)) {
    let tempEvents: IBookingInUiList[] = []
    if (liveBookings.resultReq.length) {
      const bookingsPromises = liveBookings.resultReq.map(async (liveEvent: IBookingItem) => {
        const userProfile = await useFetch({
          url: `https://peer.decentraland.org/lambdas/profile/${liveEvent.owner}`,
          method: 'GET'
        })
        if (userProfile.resultReq && typeof userProfile.resultReq === 'object' && 'avatars' in userProfile.resultReq) {
          if (Array.isArray(userProfile.resultReq.avatars) && userProfile.resultReq.avatars.length) {
            tempEvents.push({ ...liveEvent, userData: userProfile.resultReq.avatars[0] })
          }
        }
      })
      await Promise.all(bookingsPromises)
      eventsData.liveEvents = tempEvents
    } else {
      eventsData.liveEvents = tempEvents
    }
  }
}
