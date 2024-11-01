import { eventBookingsChanged } from './bookingsChanged'
import { eventDiscordAdded } from './discordAdded'
import { eventDiscordDeleted } from './discordDeleted'
import { eventDiscordUpdated } from './discordUpdated'
import { initBookingsState } from './initBookingsState'
import { eventSlotChange } from './slotChange'
import { switchContent } from './switchContent'
import { eventClosesBookingUpdate } from './closestBookingUpdate'
import { eventMetricsUpdated } from './metricsUpdated'

export const WS_EVENTS: { [key: string]: (event: MessageEvent) => void } = {
  'slot-changed': eventSlotChange,
  'bookings_started': eventBookingsChanged,
  'bookings_finished': eventBookingsChanged,
  'bookings_replaced': eventBookingsChanged,
  'discord-added': eventDiscordAdded,
  'discord-updated': eventDiscordUpdated,
  'discord-deleted': eventDiscordDeleted,
  'switch-content': switchContent,
  'init_booking_states': initBookingsState,
  'closest-booking-updated': eventClosesBookingUpdate,
  'metrics-updated': eventMetricsUpdated,
}