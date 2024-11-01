import { screenContentManager } from '../globals'
import { startConnectionLoop } from './wsConnectionLoop'

export const connectToBookingsWs = async () => {
  const {
    contentState: { liveBookings }
  } = screenContentManager
  if (liveBookings.length) {
    liveBookings.forEach(async (booking) => {
      startConnectionLoop(`/ws/booking/${booking.bookingItem.id}/signed`, true)
    })
  }
}
