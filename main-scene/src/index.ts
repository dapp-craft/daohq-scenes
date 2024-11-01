import { setupScene } from './scene/setupScene'
import { setupUi } from './ui'
import { votingDataInit } from './scripts/getVotingData'
import { questSystem } from './quests/src'
import { initialConfigParams } from './debug'
import { getTeleportToScreenData } from 'daohq-shared/scripts/getTeleportToScreenData'
import { getEventsUiData } from './scripts/getEventsUiData'
import { setupTeleports } from './scene/setupTeleports'
import { engine, Entity, Schemas } from '@dcl/sdk/ecs'

// ERRATA: This component and system are used to track and block entity id reuse,
// because sometimes it causes wierd problems like 'Transform already exists',
// even tho the entity id was obtained literally in previous line of code
const RewrittenID = engine.defineComponent('rewrittenID', {
  isNew: Schemas.Boolean,
  timestamp: Schemas.Number,
  originalID: Schemas.Number
})
const addEntity = engine.addEntity
const STATE_NAMES = ['Unknown', 'UsedEntity', 'Removed', 'Reserved']

function logEntityData(id: Entity) {
  const data = [...engine.componentsIter()].reduce(
    (a, c) => (c.has(id) ? { ...a, [c.componentName]: c.get(id) } : a),
    {}
  )
  console.log(`Entity ${id} (${STATE_NAMES[engine.getEntityState(id)]})`, data)
}

engine.addEntity = () => {
  let id = addEntity()
  if (id > 65535) {
    const trashed = [id]
    while ((id = addEntity()) > 65535) trashed.push(id)
    RewrittenID.create(id, { isNew: true, timestamp: Date.now(), originalID: trashed[0] })
    console.log(`Trashed ids:`, trashed)
  }
  return id
}

engine.addSystem(() => {
  for (let [entity, {isNew, originalID}] of engine.getEntitiesWith(RewrittenID)) {
    if (!isNew) continue
    console.error(`NEW REWRITTEN ENTITY, id=${originalID}, corrected=${entity}`)
    logEntityData(entity)
    RewrittenID.getMutable(entity).isNew = false
  }
}, 0)

export async function main() {
  setupUi()
  votingDataInit()
  await initialConfigParams()
  await setupScene()
  await Promise.all([setupTeleports(), getEventsUiData(), questSystem()])
  await getTeleportToScreenData()
}
