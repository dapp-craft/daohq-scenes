import { readFile } from '~system/Runtime'
import { config } from '../../debugConfig'
import { useFetch, initialConfigSet } from 'daohq-shared/scripts'
import { BASE_URL } from '../../deployConfig'

export const initialConfigParams = async () => {
  await initialConfigSet(config, 'QUESTS', 'quests', 'enable')
  await initialConfigSet(config, 'DEBUG_MENU', 'debugMenu', 'true')
  await initialConfigSet(config, 'TRIGGERS_VISIBILITY', 'triggersVisibility', 'true')
  let readRes = await getVersion(`version.txt`)
  if (readRes) config.testVersion = readRes
  try {
    let fetchRes = await useFetch({
      url: `${BASE_URL}/version`,
      method: 'GET'
    })
    config.backendVersion = fetchRes.resultReq
  } catch (e) {
    console.error('Backend connectring error', e)
  }
}

const getVersion = async (fileName: string) => {
  try {
    const fileInfoAsUtf8 = await readFile({ fileName })

    function Utf8ArrayToStr(array: Uint8Array) {
      var out, i, len, c
      var char2, char3
      out = ''
      len = array.length
      i = 0
      while (i < len) {
        c = array[i++]
        switch (c >> 4) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            // 0xxxxxxx
            out += String.fromCharCode(c)
            break
          case 12:
          case 13:
            // 110x xxxx   10xx xxxx
            char2 = array[i++]
            out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f))
            break
          case 14:
            // 1110 xxxx  10xx xxxx  10xx xxxx
            char2 = array[i++]
            char3 = array[i++]
            out += String.fromCharCode(((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0))
            break
        }
      }

      return out
    }
    return Utf8ArrayToStr(fileInfoAsUtf8.content)
  } catch (e) {
    console.log(e)
  }
}
