import { getExplorerConfiguration } from '~system/EnvironmentApi'

export const initialConfigSet = async (
  config: { [key: string]: any },
  endPoint: string,
  configVariablePath: string,
  status: string
) => {
  try {
    const explorerInf = await getExplorerConfiguration({})
    const questIndex = explorerInf.clientUri.indexOf(`${endPoint}`)
    const indexEqual = explorerInf.clientUri.slice(questIndex).split('&')
    if (indexEqual[0].split('=')[1].toLowerCase() === status.toLowerCase()) config[configVariablePath] = true
  } catch (error) {
    console.log('Error occurred while setting initial configuration:', error)
  }
}
