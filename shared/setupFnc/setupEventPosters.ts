import { EventPoster, setPosterInfoProps } from '../Components/EventPoster/EventPoster'
import { getPosterInfoProps } from '../scripts'
import { IExtraLocatorData } from '../types'

export const setupEventPosters = (posterConfigs: IExtraLocatorData[], eventPosters: EventPoster[]) => {
  setPosterInfoProps(getPosterInfoProps)

  posterConfigs.forEach(async (posterItem) => {
    if (posterItem.extras && posterItem.extras.locationId) {
      console.log('Creating poster for locationId', posterItem.extras.locationId)
      if (posterItem.transform)
        eventPosters.push(new EventPoster(posterItem.extras.locationId as string, posterItem.transform))
    }
  })
}
