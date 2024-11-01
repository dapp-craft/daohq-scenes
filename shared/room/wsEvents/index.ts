import { eventBookingsChanged } from './bookingsChanged'
import { initBookingsState } from './initBookingsState'
import { eventSlotChange } from './slotChange'
import { switchContent } from './switchContent'

export const WS_EVENTS: { [key: string]: (event: MessageEvent) => void } = {
  'slot-changed': eventSlotChange,
  bookings_started: eventBookingsChanged,
  bookings_finished: eventBookingsChanged,
  bookings_replaced: eventBookingsChanged,
  'switch-content': switchContent,
  init_booking_states: initBookingsState
}
