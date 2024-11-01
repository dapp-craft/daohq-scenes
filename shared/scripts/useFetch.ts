interface MyFetchProps extends RequestInit {
  url: string
}

export const useFetch = async (
  requestParams: MyFetchProps
): Promise<{
  resultReq: unknown
}> => {
  let { method, url, headers, body } = requestParams
  let resultReq: unknown = null

  const getCurrentRequestInit = (): RequestInit => {
    const init: RequestInit = {
      method: method ? method : 'GET'
    }
    const addInitData = () => {
      if (headers) init.headers = headers
      if (body) init.body = body
    }
    addInitData()
    return init
  }

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch(url, getCurrentRequestInit())
      if (response.ok) {
        resultReq = await response.json()
      } else {
        throw new Error(`There was an error code ${response.status}`)
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else if (typeof error === 'string') {
        throw new Error(error)
      } else {
        console.log('An untyped error occurred :>> ', error)
        throw new Error('An untyped fetch error occurred')
      }
    }
  }
  await fetchData()
  return { resultReq }
}
