import { config } from '../../debugConfig'
import { initialConfigSet } from 'daohq-shared/scripts'

export const initialConfigParams = async () => {
  await initialConfigSet(config, 'TRIGGERS_VISIBILITY', 'triggersVisibility', 'true')
}
