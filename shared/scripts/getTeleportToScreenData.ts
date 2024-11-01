import { getExplorerConfiguration } from '~system/EnvironmentApi'
import { screensInstances, teleportToScreenData } from '../globals'
import { Entity, Transform } from '@dcl/sdk/ecs'
import { switchAdminTeleportMenu } from '../uiComponents/adminPanelTeleport'

export const getTeleportToScreenData = async () => {
  const explorerInf = await getExplorerConfiguration({})
  const startIndex = explorerInf.clientUri.indexOf('teleport_to')
  const queryParams = explorerInf.clientUri.slice(startIndex).split('=')
  let queryLocId: string | null = null
  let querySlotId: string | null = null
  if (queryParams.length > 1) {
    const queryValues: string = queryParams[1]
    let index: number = queryValues.search(/\d/)
    queryLocId = queryValues.slice(0, index)
    querySlotId = queryValues.slice(index)
    if (querySlotId.includes('&')) {
      querySlotId = querySlotId.split('&')[0]
    }
  }

  if (queryLocId && querySlotId) {
    const filteredScreens = screensInstances.screens.filter((inst) => {
      const instLocId = inst.screen.locationId?.toString()
      const instSlotId = inst.screen.slotId?.toString()
      return instLocId && instSlotId && instLocId === queryLocId && instSlotId === querySlotId
    })
    filteredScreens.forEach((inst) => {
      const simpleScreenEntity: Entity = inst.screen.screenEntity
      let concaveScreenEntity: Entity | undefined = undefined
      if (inst.screen.concaveSectionsEntities.length) {
        const index: number = Math.floor(inst.screen.concaveSectionsEntities.length / 2)
        concaveScreenEntity = inst.screen.concaveSectionsEntities[index]
      }

      const entityTransform = Transform.getMutableOrNull(concaveScreenEntity || simpleScreenEntity)
      if (entityTransform) {
        if (!entityTransform.parent) {
          teleportToScreenData.screens.push({
            locationId: queryLocId,
            slotId: querySlotId,
            transform: entityTransform,
            name: inst.screen.description
              ? inst.screen.description
              : inst.screen.slotId
              ? inst.screen.slotId.toString()
              : 'no name'
          })
        } else {
          const parentTransform = Transform.getMutableOrNull(entityTransform.parent)
          if (parentTransform) {
            const entPos = entityTransform.position
            const parPos = parentTransform.position
            const position = { x: parPos.x + entPos.x, y: parPos.y + entPos.y, z: parPos.z + entPos.z }
            teleportToScreenData.screens.push({
              locationId: queryLocId,
              slotId: querySlotId,
              transform: {
                position,
                rotation: entityTransform.rotation,
                scale: entityTransform.scale
              },
              name: inst.screen.description
                ? inst.screen.description
                : inst.screen.slotId
                ? inst.screen.slotId.toString()
                : 'no name'
            })
          }
        }
      }
    })
    if (teleportToScreenData.screens.length) switchAdminTeleportMenu()
  }
}
