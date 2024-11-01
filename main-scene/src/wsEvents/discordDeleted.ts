import { IDiscordResource, deleteDiscordResource } from '../scene/setupDiscord'

export function eventDiscordDeleted(event: MessageEvent) {
  const wsMessage = JSON.parse(event.data)
  if (Array.isArray(wsMessage.data)) {
    for (const data of wsMessage.data) deleteDiscordResource(data as IDiscordResource)
  }
}
