import { BASE_URL } from '../../deployConfig'
import { Screen } from 'daohq-shared/Components/Screen/Screen'
import { IExtraLocatorData, IResource } from 'daohq-shared/types'
import { ScreenFormatEnum } from 'daohq-shared/Components/Screen/types'
import { useFetch } from 'daohq-shared/scripts/useFetch'
import { metricsScreensInstances } from '../states/states'

export interface IMetricsResource {
  s3_urn: string
  id: string
}

export const setupMetrics = async (configs: IExtraLocatorData[]) => {
  const metricsContent = await useFetch({ url: `${BASE_URL}/metrics/images` })
  const metricsResources = Array.isArray(metricsContent.resultReq) && (metricsContent.resultReq as IMetricsResource[])

  configs.forEach((config) => {
    if (config.transform) {
      const metricsId = config.extras?.metrics as string
      const link = config.extras!.link as string

      const screenInst = new Screen({
        name: config.name,
        forBooking: false,
        supportsStreaming: false,
        transform: config.transform,
        isRunScreenIntervalMode: false
      })
      screenInst.setClickableLinkToFlatScreen('custom', { text: 'OPEN GOVERNANCE', url: link })
      metricsScreensInstances.screens.push({
        screen: screenInst,
        id: metricsId
      })
    } else {
      console.error(`[METRICS] no transform for ${config.name}`)
    }
  })

  if (metricsResources) updateMetricsScreenRes(metricsResources)
}

export const updateMetricsScreenRes = (metricsUpdate: IMetricsResource[]) => {
  for (const metric of metricsUpdate) {
    const screensToUpdate = metricsScreensInstances.screens.filter((s) => s.id == metric.id)
    screensToUpdate.forEach(async (screenItem) => {
      const timestamp = new Date().getTime()
      const resouce: IResource = {
        type: ScreenFormatEnum.image,
        s3_urn: `${metric.s3_urn}?rnd=${timestamp}`
      }
      screenItem.screen.setContent([resouce])
    })
  }
}
