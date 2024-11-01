import { updateMetricsScreenRes } from '../scene/setupMetrics'

export function eventMetricsUpdated(event: MessageEvent) {
  const wsMessage = JSON.parse(event.data)
  if (wsMessage.data instanceof Object) {
    const update = Object.entries(wsMessage.data).map(([id, s3_urn]) => {
      return { id, s3_urn: s3_urn as string }
    })
    updateMetricsScreenRes(update)
  }
}
