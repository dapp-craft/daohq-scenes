import { IExtraLocatorData, LOCATIONS_ID_ENUM } from 'daohq-shared/types'

export const discordScreenConfigs: IExtraLocatorData[] = [
  {
    name: 'discord_screen.001',
    transform: {
      scale: { x: 1.71, y: 2.37, z: 1 }
    },
    extras: {
      locationId: LOCATIONS_ID_ENUM.OUTSIDE,
      discord_id: 'discord_announcements',
      description: 'Discord Announcements chanel'
    }
  },
  {
    name: 'discord_screen.002',
    transform: {
      scale: { x: 1.71, y: 2.37, z: 1 }
    },
    extras: {
      locationId: LOCATIONS_ID_ENUM.OUTSIDE,
      discord_id: 'discord_governance_notifications',
      description: 'Discord Governance Notifications channel'
    }
  }
]
