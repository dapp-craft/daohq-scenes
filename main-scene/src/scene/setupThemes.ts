import { getLocationThemeBatch } from 'daohq-shared/scripts'
import { areaTriggersModels } from './constants/areaConfig'
import { SOUND_MANAGER } from '../states/states'

export async function setupThemes() {
  const themes: { [key: string]: string[] } = {}

  let areas = areaTriggersModels.map((area) => area.area)
  let response = await getLocationThemeBatch(areas)

  areas.forEach((area) => {
    let themes_ = response[area].map((obj: any) => obj.s3_urn)
    if (themes_[0] == undefined) themes_ = ['']
    themes[area] = themes_
  })

  console.log('Stream themes successfully set', themes)

  SOUND_MANAGER.setStreamThemes(themes)
}
