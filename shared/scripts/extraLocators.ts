import { Quaternion, Vector3 } from '@dcl/sdk/math'
import { getTransfFromLocNode } from './getTransfFromLocNode'
import { IScreenConfig } from '../Components/Screen/types'
import { IExtraLocatorData, ILocationSchema, ILocatorNode, locationTypes, SCREEN_FORMATS } from '../types'

const defaultPosition: Vector3 = Vector3.Zero()
const defaultScale: Vector3 = { x: 1, y: 1, z: 1 }
const defaultRotation = Quaternion.Identity()

const getIdFromName = (fullName: string): { locationId?: string; slotId?: string } | undefined => {
  const joinedIds = fullName.replace('screen_', '')
  let index: number = joinedIds.search(/\d/)
  return { locationId: joinedIds.slice(0, index), slotId: joinedIds.slice(index, joinedIds.search(/\.|$/)) }
}

const getPosterLocId = (fullName: string) => {
  let tempLocId: string = fullName.replace('poster_', '')
  let index: number = tempLocId.search(/\./g)
  if (index < 0) {
    return tempLocId
  } else return tempLocId.slice(0, index)
}

export function parseLocatorsNodes(nodes: ILocatorNode[]): IExtraLocatorData[] {
  const configs = nodes.map((node) => {
    const { name, extras } = node
    const transform = getTransfFromLocNode(node)

    const config: IExtraLocatorData = {
      name,
      transform
    }

    if (extras) {
      if (!config.extras) config.extras = {}
      Object.keys(extras).forEach((key) => {
        config.extras![key] = extras[key as keyof object]
      })
    }

    if (config.name.startsWith('screen_')) {
      const locSlotId: { locationId?: string; slotId?: string } | undefined = getIdFromName(name)
      if (locSlotId && locSlotId.locationId && locSlotId.slotId) {
        if (!config.extras) config.extras = {}
        config.extras.locationId = locSlotId.locationId
        config.extras.slotId = locSlotId.slotId
      }
    }
    if (config.name.startsWith('poster_')) {
      const locationId = getPosterLocId(name)
      if (locationId) {
        if (!config.extras) config.extras = {}
        config.extras.locationId = locationId
      }
    }

    return config
  })
  return configs
}

export const mergeConfigs = (target: IExtraLocatorData[], source: IExtraLocatorData[]): IExtraLocatorData[] => {
  source.forEach((screenConfig) => {
    const duplicatedConfig = target.find((c) => c.name === screenConfig.name)
    if (duplicatedConfig) {
      if (screenConfig.transform) {
        Object.keys(screenConfig.transform).forEach((param) => {
          if (!duplicatedConfig.transform) duplicatedConfig.transform = {}
          duplicatedConfig.transform[param as keyof object] = screenConfig.transform![param as keyof object]
        })
      }
      if (screenConfig.extras) {
        if (!duplicatedConfig.extras) duplicatedConfig.extras = {}
        Object.assign(duplicatedConfig.extras, screenConfig.extras)
      }
    } else if (screenConfig) {
      const locSlotId: { locationId?: string; slotId?: string } | undefined = getIdFromName(screenConfig.name)
      if (locSlotId && locSlotId.locationId && locSlotId.slotId && screenConfig.name.startsWith('screen_')) {
        if (!screenConfig.extras) screenConfig.extras = {}
        screenConfig.extras.locationId = locSlotId.locationId
        screenConfig.extras.slotId = locSlotId.slotId
      }
      target.push(screenConfig)
    }
  })

  return target
}

export const distributionBySpecies = (mergedInterimConfigs: IExtraLocatorData[]) => {
  const models: IExtraLocatorData[] = []
  const mannequins: IExtraLocatorData[] = []
  const screens: IScreenConfig[] = []
  const discord: IExtraLocatorData[] = []
  const metrics: IExtraLocatorData[] = []
  const estates: IExtraLocatorData[] = []
  const posters: IExtraLocatorData[] = []
  const plazaMenus: IExtraLocatorData[] = []

  mergedInterimConfigs.forEach((config) => {
    if (!config.transform) config.transform = {}
    if (!config.transform.position) config.transform.position = defaultPosition
    if (!config.transform.rotation) config.transform.rotation = defaultRotation
    if (!config.transform.scale) config.transform.scale = defaultScale

    if (
      !config.name.startsWith('mann_') &&
      !config.name.startsWith('screen_') &&
      !config.name.startsWith('discord_') &&
      !config.name.startsWith('estate_') &&
      !config.name.startsWith('poster_')
    ) {
      models.push(config)
    }
    if (config.name.startsWith('mann_')) mannequins.push(config)
    if (config.name.startsWith('screen_') && config.extras?.metrics) {
      metrics.push({
        name: config.name,
        transform: config.transform,
        extras: config.extras
      })
    } else if (config.name.startsWith('screen_')) {
      const screenConfig: IScreenConfig = {
        name: config.name,
        transform: config.transform,
        forBooking: false,
        supportsStreaming: false,
        defaultResources: [],
        isRunScreenIntervalMode: false
      }
      if (config.extras) {
        screenConfig.locationId = config.extras.locationId?.toString()
        screenConfig.slotId = typeof config.extras.slotId !== 'boolean' ? config.extras.slotId?.toString() : undefined
        screenConfig.format = config.extras.format?.toString()
        screenConfig.isButtons = typeof config.extras.isButtons === 'boolean' ? config.extras.isButtons : undefined
        screenConfig.description = config.extras.description?.toString()
        if (config.extras.concaveRadius && config.extras.concaveSectionsQuantity) {
          screenConfig.concaveConfig = {
            radius: +config.extras.concaveRadius,
            sectionsQuantity: +config.extras.concaveSectionsQuantity
          }
        }
        if (config.extras.for_booking && typeof config.extras.for_booking === 'boolean') {
          screenConfig.forBooking = config.extras.for_booking
        } else {
          screenConfig.forBooking = false
        }
        if (config.extras.supports_streaming && typeof config.extras.supports_streaming === 'boolean') {
          screenConfig.supportsStreaming = config.extras.supports_streaming
        } else {
          screenConfig.supportsStreaming = false
        }
        if (config.extras.isRunScreenIntervalMode && typeof config.extras.isRunScreenIntervalMode === 'boolean') {
          screenConfig.isRunScreenIntervalMode = config.extras.isRunScreenIntervalMode
        } else {
          screenConfig.isRunScreenIntervalMode = true
        }
        if (config.extras.trigger && typeof config.extras.trigger === 'object') {
          let zoneLength: number = 4
          let zoneWidth: number = config.transform.scale.x
          let expansionAngle: number = 0
          let groundLevel: number = 0
          if ('zoneLength' in config.extras.trigger) zoneLength = Number(config.extras.trigger.zoneLength)
          if ('zoneWidth' in config.extras.trigger) zoneWidth = Number(config.extras.trigger.zoneWidth)
          if ('expansionAngle' in config.extras.trigger) expansionAngle = Number(config.extras.trigger.expansionAngle)
          if ('groundLevel' in config.extras.trigger) groundLevel = Number(config.extras.trigger.groundLevel)
          if ('area' in config.extras.trigger) {
            screenConfig.trigger = { area: `${config.extras.trigger.area}` }
          } else {
            screenConfig.trigger = { zoneLength, zoneWidth, expansionAngle, groundLevel }
          }
        }
      }
      screens.push(screenConfig)
    }
    if (config.name.startsWith('discord_')) discord.push(config)
    if (config.name.startsWith('estate_')) estates.push(config)
    if (config.name.startsWith('poster_')) posters.push(config)
    if (config.name.startsWith('plazaMenu_')) plazaMenus.push(config)
  })

  return { screens, mannequins, models, discord, estates, posters, metrics, plazaMenus }
}

export function extractLocators(locatorNodes: ILocatorNode[][], extraConfigs: IExtraLocatorData[][]) {
  const locatorConfigs = locatorNodes.map(parseLocatorsNodes)

  let mergedInterimConfigs: IExtraLocatorData[] = []
  for (const config of locatorConfigs.concat(extraConfigs)) {
    mergedInterimConfigs = mergeConfigs(mergedInterimConfigs, config)
  }
  return distributionBySpecies(mergedInterimConfigs)
}

export function fillLocationScheme(screens: IScreenConfig[], sceneLocationsSchema: ILocationSchema) {
  screens.forEach((screenConfig) => {
    const { locationId, slotId, name, forBooking, supportsStreaming } = screenConfig
    if (locationId && slotId)
      addItemToSchema(sceneLocationsSchema, { locationId, slotId, slotName: name, forBooking, supportsStreaming })
  })
}

export const addItemToSchema = (
  locationsSchema: ILocationSchema,
  screenConfig: {
    locationId: string
    forBooking: boolean
    format?: string
    supportsStreaming?: boolean
    slotId?: string | number
    slotName?: string
    discordDescription?: string
    discordId?: string
    trigger?: boolean
  }
) => {
  const {
    locationId,
    slotId,
    slotName,
    forBooking,
    supportsStreaming,
    discordDescription,
    discordId,
    format,
    trigger
  } = screenConfig

  if (slotId && slotName) {
    if (!(locationId in locationsSchema)) {
      locationsSchema[locationId] = {
        type: locationTypes[locationId as keyof object] || 'outdoor',
        for_booking: forBooking
      }
    }

    if (!Array.isArray(locationsSchema[locationId].slots)) {
      locationsSchema[locationId].slots = []
    }

    const isDuplicate = locationsSchema[locationId].slots!.some((s) => s.id == slotId)
    if (!isDuplicate) {
      locationsSchema[locationId].slots!.push({
        id: slotId,
        name: slotName,
        supports_streaming: typeof supportsStreaming === 'boolean' ? supportsStreaming : false,
        format: format ? format : SCREEN_FORMATS.STANDARD_WIDE,
        trigger: trigger ? trigger : false
      })
    }
  }

  if (discordDescription && discordId) {
    if (!(locationId in locationsSchema)) {
      locationsSchema[locationId] = {
        type: locationTypes[locationId as keyof object] || 'outdoor',
        for_booking: forBooking
      }
    }

    if (!Array.isArray(locationsSchema[locationId].discord_screens)) {
      locationsSchema[locationId].discord_screens = []
    }

    const isDuplicate = locationsSchema[locationId].discord_screens!.some((ds) => ds.id == discordId)
    if (!isDuplicate) {
      locationsSchema[locationId].discord_screens!.push({
        id: discordId,
        description: discordDescription
      })
    }
  }
}
