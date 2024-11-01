import { IBookingItem } from '../Components/Screen/types'
import { base_url } from '../globals'
import { IPosterInfo, ISceneInfo } from '../types'
import { useFetch } from './useFetch'

export const getPosterInfoProps = async (locationId: string): Promise<IPosterInfo> => {
  let posterInformation: IPosterInfo = { closestBooking: null, sceneInfo: null }
  const closestBooking = await getClosestBooking(locationId)
  if (closestBooking) posterInformation.closestBooking = closestBooking

  const sceneInfo = await getSceneInfo(locationId)
  if (sceneInfo) posterInformation.sceneInfo = sceneInfo
  return posterInformation
}

const getClosestBooking = async (locationId: string) => {
  const closestBookings = await useFetch({ url: `${base_url}/bookings/closest/${locationId}` })
  if (
    closestBookings &&
    closestBookings.resultReq &&
    typeof closestBookings.resultReq === 'object' &&
    'active_bookings' in closestBookings.resultReq &&
    Array.isArray(closestBookings.resultReq.active_bookings) &&
    closestBookings.resultReq.active_bookings.length
  ) {
    return closestBookings.resultReq.active_bookings[0] as IBookingItem
  }
}

const getSceneInfo = async (locationId: string) => {
  const sceneInfo = await useFetch({ url: `${base_url}/location/${locationId}` })
  if (sceneInfo && sceneInfo.resultReq && typeof sceneInfo.resultReq === 'object') {
    return sceneInfo.resultReq as ISceneInfo
  }
}
