import { BASE_URL } from '../../deployConfig'
import { Screen } from 'daohq-shared/Components/Screen/Screen'
import { IExtraLocatorData, IResource } from 'daohq-shared/types'
import { ICreatedDiscordScreen, ScreenFormatEnum } from 'daohq-shared/Components/Screen/types'
import { useFetch } from 'daohq-shared/scripts/useFetch'
import { discordScreensInstances } from '../states/states'
import { timers } from '@dcl-sdk/utils'

export interface IDiscordResource {
  channel: string
  guild: string | number
  message_link: string
  s3_urn: string
  screen_id: string
}

export const setupDiscord = async (configs: IExtraLocatorData[]) => {
  configs.forEach((config) => {
    if (config.transform) {
      const screenInst = new Screen({
        name: config.extras && config.extras.discord_id ? config.extras.discord_id.toString() : 'invalid_discord_id',
        forBooking: false,
        supportsStreaming: false,
        transform: config.transform,
        locationId:
          config.extras && config.extras.location_id ? config.extras.location_id.toString() : 'invalid_location_id',
        isRunScreenIntervalMode: false
      })
      screenInst.setClickableLinkToFlatScreen('discord')
      discordScreensInstances.screens.push({ screen: screenInst })
    } else {
      console.error(`[DISCORD] no transform for ${config.name}`)
    }
  })

  return Promise.all(discordScreensInstances.screens.map(setContentToDiscordScreen))
}

const setContentToDiscordScreen = async (screenItem: ICreatedDiscordScreen) => {
  const discordContent = await useFetch({ url: `${BASE_URL}/discord/screens/${screenItem.screen.name}/images` })
  if (Array.isArray(discordContent.resultReq)) {
    const discordResources = discordContent.resultReq as IDiscordResource[]
    const screenResources: IResource[] = discordResources.map((resource) => ({
      s3_urn: resource.s3_urn,
      type: ScreenFormatEnum.image,
      discord_message_link: resource.message_link
    }))

    screenItem.screen.setContent(screenResources)

    resetContentInterval(screenItem, (s) => s.setNextContent())
  }
}

export const addDiscordScreenRes = (discordResource: IDiscordResource) => {
  const screensToAdd = discordScreensInstances.screens.filter(
    (screenItem) => screenItem.screen.name === discordResource.screen_id
  )
  screensToAdd.forEach(async (screenItem) => {
    screenItem.screen.counter = 0
    await setContentToDiscordScreen(screenItem)
  })
}

export const updateDiscordScreenRes = (discordResource: IDiscordResource) => {
  const screensToUpdate = discordScreensInstances.screens.filter(
    (screenItem) => screenItem.screen.name === discordResource.screen_id
  )
  screensToUpdate.forEach(async (screenItem) => {
    const timestamp = new Date().getTime()
    if (screenItem.screen.resource) {
      const findResource = screenItem.screen.resource.find(
        (screenItem) => screenItem.discord_message_link === discordResource.message_link
      )
      if (findResource) {
        const index = screenItem.screen.resource.indexOf(findResource)
        screenItem.screen.resource[index] = {
          s3_urn: `${discordResource.s3_urn}?rnd=${timestamp}`,
          type: ScreenFormatEnum.image,
          discord_message_link: discordResource.message_link
        }
        screenItem.screen.setContent(screenItem.screen.resource)
      }
    }
  })
}

export const deleteDiscordResource = (discordResource: IDiscordResource) => {
  const screensWithDeletedRes = discordScreensInstances.screens.filter(
    (screenItem) => screenItem.screen.name === discordResource.screen_id
  )
  screensWithDeletedRes.forEach((screenItem) => {
    if (screenItem.screen.resource) {
      const findResource = screenItem.screen.resource.find(
        (screenItem) => screenItem.discord_message_link === discordResource.message_link
      )
      if (findResource) {
        const index = screenItem.screen.resource.indexOf(findResource)
        if (index > -1) {
          if (index == screenItem.screen.counter) resetContentInterval(screenItem, (s) => s.setNextContent())

          screenItem.screen.resource.splice(index, 1)
          screenItem.screen.setContent(screenItem.screen.resource)
        }
      }
    }
  })
}

function resetContentInterval(
  screenItem: ICreatedDiscordScreen,
  func: (screen: Screen) => void,
  milliseconds?: number
) {
  if (screenItem.nextContentInterval) timers.clearInterval(screenItem.nextContentInterval)
  screenItem.nextContentInterval = timers.setInterval(() => {
    func(screenItem.screen)
  }, milliseconds || 15000)
}
