import { IDiscordResource, updateDiscordScreenRes } from '../scene/setupDiscord'

export function eventDiscordUpdated(event: MessageEvent) {
  const wsMessage = JSON.parse(event.data)
  if (Array.isArray(wsMessage.data)) {
    for (const data of wsMessage.data) updateDiscordScreenRes(data as IDiscordResource)
  }
}
