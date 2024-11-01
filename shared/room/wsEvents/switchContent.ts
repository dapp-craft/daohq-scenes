import { switchContentOnScreen } from '../../setupFnc/setupScreens'
import { ISlotStateItem } from '../../types'

export const switchContent = (event: MessageEvent) => {
  const wsMessage = JSON.parse(event.data)
  if ('data' in wsMessage && typeof wsMessage.data === 'object') {
    switchContentOnScreen(wsMessage.data as ISlotStateItem)
  }
}
