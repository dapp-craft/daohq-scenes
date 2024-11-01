import {
  Entity,
  GltfContainer,
  InputAction,
  Transform,
  TransformType,
  engine,
  pointerEventsSystem,
  VideoPlayer
} from '@dcl/sdk/ecs'
import { Screen } from '../Components/Screen/Screen'
import { IResource, ISlotStateItem, SceneTransform } from '../types'
import { useFetch } from '../scripts/useFetch'
import { sceneLocationsSchema, screensInstances, base_url, screenContentManager } from '../globals'
import {
  IScreenConfig,
  ICreatedScreen,
  ISlotsContent,
  ILocationsContent,
  ScreenFormatEnum
} from '../Components/Screen/types'
import { startConnectionLoop } from '../scripts/wsConnectionLoop'
import { connectToBookingsWs } from '../scripts'

export const setupScreens = async (configs: IScreenConfig[], triggersVisibility?: boolean): Promise<void> => {
  configs.forEach((config) => {
    const createdScreen: ICreatedScreen = {
      screen: new Screen(config, triggersVisibility)
    }
    if (config.isButtons) createdScreen.buttons = addButtonsToScreen(config.transform, createdScreen.screen)
    if (config.description === 'Pboard Screen') createdScreen.screen.setClickableLinkToFlatScreen('proposal')
    screensInstances.screens.push(createdScreen)
  })
  await screenContentManager.getLiveBookings()
  await setScreensContent()
  await startConnectionLoop('/ws/scene')
  await connectToBookingsWs()
}

export const addButtonsToScreen = (
  transform: SceneTransform,
  screen: Screen
):
  | {
      nextButton: Entity
      prevButton: Entity
    }
  | undefined => {
  const { position, rotation } = transform
  if (position && rotation) {
    const { x, y, z } = position
    const nextButton = createButton(
      'SHOW NEXT',
      {
        position: { x: x + 2, y: y - 1.5, z: z - 2 },
        rotation,
        scale: { x: 0.5, y: 0.5, z: 0.5 }
      },
      () => screen.setNextContent()
    )

    const prevButton = createButton(
      'SHOW PREV',
      {
        position: { x: x - 2.5, y: y - 1.5, z: z - 1.8 },
        rotation,
        scale: { x: 0.5, y: 0.5, z: 0.5 }
      },
      () => {
        screen.setPrevContent()
      }
    )

    return { nextButton, prevButton }
  }
}

const createButton = (name: string, transform: TransformType, onClick: () => void): Entity => {
  const button = engine.addEntity()

  Transform.create(button, transform)
  GltfContainer.create(button, { src: 'models/objects/teleportCube.glb' })
  pointerEventsSystem.onPointerDown(
    {
      entity: button,
      opts: { button: InputAction.IA_POINTER, hoverText: name }
    },
    onClick
  )

  return button
}

const checkIsScreenIsBooked = (screen: Screen) => {
  return screenContentManager.contentState.liveBookings.some(
    (booking) => booking.bookingItem.location === screen.locationId
  )
}

export const updateSlotData = async (slot: number) => {
  let isSlotInLocation: boolean = false
  for (let locationId in sceneLocationsSchema) {
    if (sceneLocationsSchema[locationId]) {
      if ('slots' in sceneLocationsSchema[locationId] && sceneLocationsSchema[locationId].slots) {
        const isIncludeSlot: boolean = sceneLocationsSchema[locationId].slots!.some((slotItem) => +slotItem.id === slot)
        if (isIncludeSlot) isSlotInLocation = isIncludeSlot
      }
    }
  }
  if (isSlotInLocation) {
    const screensToUpdate = screensInstances.screens.filter((item) => {
      if (item.screen.slotId) {
        return item.screen.slotId.toString() === slot.toString()
      } else return false
    })
    let url: string = `${base_url}/contents/slot/live?slot_id=${slot}`
    const newResources = await useFetch({ url })
    if (newResources.resultReq && typeof newResources.resultReq === 'object') {
      for (let slotId in newResources.resultReq) {
        const slotResources: IResource[] = newResources.resultReq[slotId as keyof object]

        screensToUpdate.forEach((instScreen) => {
          if (VideoPlayer.getOrNull(instScreen.screen.screenEntity)) {
            VideoPlayer.deleteFrom(instScreen.screen.screenEntity)
          }
          instScreen.screen.setContent(slotResources)
          const isResourceIsVideo =
            instScreen.screen.resource !== undefined &&
            instScreen.screen.resource.length > 0 &&
            (instScreen.screen.resource[instScreen.screen.counter].type === ScreenFormatEnum.video ||
              instScreen.screen.resource[instScreen.screen.counter].type === ScreenFormatEnum.cast_stream)
          if (instScreen.screen.isUserInTriggerZone && isResourceIsVideo && !checkIsScreenIsBooked(instScreen.screen)) {
            instScreen.screen.startVideoPlaying()
          }
          if (
            checkIsScreenIsBooked(instScreen.screen) &&
            instScreen.screen.slotId &&
            !screenContentManager.isBookingVideoOnPause(instScreen.screen.slotId)
          ) {
            instScreen.screen.startVideoPlaying()
          }
        })
      }
    }
  }
}

export const updateLocationData = async (locationId: string, eventType: 'started' | 'finished') => {
  let isLocationInScene: boolean = false
  for (let schemaLocId in sceneLocationsSchema) {
    if (schemaLocId === locationId) {
      isLocationInScene = true
    }
  }
  if (isLocationInScene) {
    const currentContent = await useFetch({
      url: `${base_url}/contents/live?locations=${locationId}`,
      method: 'GET'
    })
    if (currentContent.resultReq && typeof currentContent.resultReq === 'object') {
      let slotsContent: ISlotsContent = {}
      for (let locId in currentContent.resultReq) {
        const locationContent: IResource[] = currentContent.resultReq[locId as keyof object]
        locationContent.forEach((contentItem) => {
          if (contentItem.slot && contentItem.slot in slotsContent) {
            slotsContent[contentItem.slot].push(contentItem)
          } else if (contentItem.slot) {
            slotsContent[contentItem.slot] = [contentItem]
          }
        })
      }
      const locScreensToUpdate = screensInstances.screens.filter((item) => {
        if (item.screen.locationId) {
          return item.screen.locationId === locationId
        } else return false
      })
      locScreensToUpdate.forEach((screenItem) => {
        screenItem.screen.clearIntervalTimer()
        screenItem.screen.counter = 0
        if (VideoPlayer.getOrNull(screenItem.screen.screenEntity)) {
          VideoPlayer.deleteFrom(screenItem.screen.screenEntity)
        }
        screenItem.screen.setContent([])
      })
      for (let slotId in slotsContent) {
        const screensForContent = locScreensToUpdate.filter((item) => {
          if (item.screen.slotId) {
            return item.screen.slotId === slotId
          } else return false
        })
        screensForContent.forEach((screenItem) => {
          if (VideoPlayer.getOrNull(screenItem.screen.screenEntity)) {
            VideoPlayer.deleteFrom(screenItem.screen.screenEntity)
          }
          screenItem.screen.setContent(slotsContent[slotId])
          if (!checkIsScreenIsBooked(screenItem.screen)) {
            if (screenItem.screen.isRunScreenIntervalMode) screenItem.screen.runScreenInIntervalMode()
          } else if (
            screenItem.screen.resource &&
            screenItem.screen.resource.length &&
            (screenItem.screen.resource[screenItem.screen.counter].type === ScreenFormatEnum.video ||
              screenItem.screen.resource[screenItem.screen.counter].type === ScreenFormatEnum.cast_stream)
          ) {
            if (eventType === 'started' && screenItem.screen.isUserInTriggerZone) {
              screenItem.screen.startVideoPlaying()
            }
            if (eventType === 'finished' && screenItem.screen.isUserInTriggerZone) {
              screenItem.screen.stopVideoPlaying()
            }
          }
        })
      }
    }
  }
}

async function setScreensContent() {
  let locationsContent: ILocationsContent = {}

  for (let locationId in sceneLocationsSchema) {
    if (sceneLocationsSchema[locationId].slots) {
      sceneLocationsSchema[locationId].slots!.forEach((slot) => {
        if (locationId in locationsContent) {
          locationsContent[locationId][slot.id] = []
        } else {
          locationsContent[locationId] = {}
          locationsContent[locationId][slot.id] = []
        }
      })
    }
  }

  let currentLocations = Object.keys(locationsContent)
    .map((id) => `locations=${id}`)
    .join('&')

  const currentContent = await useFetch({
    url: `${base_url}/contents/live?${currentLocations}`,
    method: 'GET'
  })
  if (currentContent.resultReq && typeof currentContent.resultReq === 'object') {
    for (let locId in currentContent.resultReq) {
      const locationContent: IResource[] = currentContent.resultReq[locId as keyof object]
      if (locationContent && Array.isArray(locationContent)) {
        locationContent.forEach((contentItem: IResource) => {
          if (Object.keys(contentItem).length && contentItem.slot && contentItem.slot in locationsContent[locId]) {
            locationsContent[locId][contentItem.slot].push(contentItem)
          }
        })
      }
    }
  }

  if (Object.keys(locationsContent).length) {
    for (let locKey in locationsContent) {
      if (Object.keys(locationsContent[locKey]).length) {
        for (let slotKey in locationsContent[locKey]) {
          const slotContent = locationsContent[locKey][slotKey]
          screensInstances.screens.forEach((inst) => {
            if (
              inst.screen.locationId &&
              locKey === inst.screen.locationId &&
              inst.screen.slotId &&
              inst.screen.slotId.toString() === slotKey.toString()
            ) {
              inst.screen.setContent(slotContent)
              if (!checkIsScreenIsBooked(inst.screen)) {
                if (inst.screen.isRunScreenIntervalMode) inst.screen.runScreenInIntervalMode()
              }
            }
          })
        }
      }
    }
  }
}

export const switchContentOnScreen = (currentContent: ISlotStateItem) => {
  screenContentManager.contentState.liveEventContentState = currentContent
  const screensToUpdate = screensInstances.screens.filter((item) => {
    if (item.screen.slotId) {
      return item.screen.slotId.toString() === currentContent.slot.toString()
    } else return false
  })
  screensToUpdate.forEach((screenItem) => {
    screenItem.screen.clearIntervalTimer()
    screenItem.screen.counter = currentContent.content_index
    if (
      screenItem.screen.resource &&
      screenItem.screen.resource.length &&
      screenItem.screen.resource[screenItem.screen.counter].type === ScreenFormatEnum.video &&
      currentContent.is_paused
    ) {
      screenItem.screen.stopVideoPlaying()
    } else if (
      screenItem.screen.resource &&
      screenItem.screen.resource.length &&
      (screenItem.screen.resource[screenItem.screen.counter].type === ScreenFormatEnum.video ||
        screenItem.screen.resource[screenItem.screen.counter].type === ScreenFormatEnum.cast_stream) &&
      screenItem.screen.isUserInTriggerZone
    ) {
      screenItem.screen.startVideoPlaying()
    } else {
      const player = VideoPlayer.getMutableOrNull(screenItem.screen.screenEntity)
      if (player) player.playing = false
      screenItem.screen.setContent()
    }
  })
}
