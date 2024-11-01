import { updateSlotData } from '../../setupFnc/setupScreens'

export function eventSlotChange(event: MessageEvent) {
  const wsMessage = JSON.parse(event.data)
  if ('data' in wsMessage && Array.isArray(wsMessage.data)) {
    wsMessage.data.forEach((slotItem: { booking: number | null; slot: number }) => {
      updateSlotData(slotItem.slot)
    })
  }
}
