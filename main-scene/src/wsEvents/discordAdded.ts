import { IDiscordResource, addDiscordScreenRes } from '../scene/setupDiscord'

export function eventDiscordAdded(event: MessageEvent) {
  const wsMessage = JSON.parse(event.data)
  if (Array.isArray(wsMessage.data)) for (const data of wsMessage.data) addDiscordScreenRes(data as IDiscordResource)
}
