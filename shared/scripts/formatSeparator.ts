import { readFile } from '~system/Runtime'

export const formatSeparator = async (itemName: string) => {
  let fileName = `models/${itemName}.gltf`
  try {
    await readFile({ fileName })
  } catch (e) {
    fileName = `models/${itemName}.glb`
  }
  return fileName
}
