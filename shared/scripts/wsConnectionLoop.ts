import { timers } from '@dcl-sdk/utils'
import { wsHandler, base_url } from '../globals'
import { signedFetch } from '~system/SignedFetch'

const getAuthWsToken = async (): Promise<string | undefined> => {
  try {
    const response = await signedFetch({ url: `${base_url}/signed/ws-token` })
    if (response.ok) {
      if ('body' in response) {
        return JSON.parse(response.body) as string
      }
    } else {
      throw new Error(`There was an error ${response.status}`)
    }
  } catch (error) {
    console.log('Error on connection to booking WS :>> ', error)
  }
}

const runConnectionLoop = async (baseEndpoint: string, baseWsUrl: string, fullWsUrl?: string) => {
  const reconnectionStartDelay = 300
  const reconnectionDelayStep = 300
  const maxReconnectionDelay = 1500

  let urlToConnect: string = fullWsUrl ? fullWsUrl : baseWsUrl

  let reconnectDelay = reconnectionStartDelay

  while (true) {
    let socket: WebSocket

    try {
      socket = new WebSocket(urlToConnect)
    } catch (error: unknown) {
      console.error(`websocket fatal "${baseEndpoint}"`, error)
      break
    }

    try {
      socket.onopen = function () {
        console.log(`websocket opened "${baseEndpoint}"`)
        reconnectDelay = reconnectionStartDelay
      }

      socket.onmessage = wsHandler.fire.bind(wsHandler)

      const closeResult = await new Promise<CloseEvent>((res, rej) => {
        socket.onclose = res
        socket.onerror = rej
      })

      console.log(`websocket event onclose "${baseEndpoint}" :>> `, closeResult)
    } catch (error: any) {
      console.error(`websocket exception "${baseEndpoint}" :>>`, error)
      reconnectDelay = Math.max(maxReconnectionDelay, reconnectDelay + reconnectionDelayStep)
    }
    const token = await getAuthWsToken()
    if (token) {
      urlToConnect = baseWsUrl.concat(`?token=${token}`)
    }
    console.log(`websocket reconnecting to "${baseEndpoint}"`)
    await new Promise<void>((res) => timers.setTimeout(res, reconnectDelay))
  }
}

export const startConnectionLoop = async (endpoint: string, isAuth?: boolean) => {
  let baseWsUrl: string = `${base_url.replace(/^(https?|http):\/\//, 'wss://')}${endpoint}`
  if (isAuth) {
    const token = await getAuthWsToken()
    if (token) {
      const fullWsUrl = baseWsUrl.concat(`?token=${token}`)
      runConnectionLoop(endpoint, baseWsUrl, fullWsUrl)
    }
  } else {
    runConnectionLoop(endpoint, baseWsUrl)
  }
}
