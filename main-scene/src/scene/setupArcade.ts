import { Entity, InputAction, pointerEventsSystem } from '@dcl/sdk/ecs'
import { BASE_URL } from '../../deployConfig'
import { allSavedEntity } from '../states/states'
import { getPortableExperiencesLoaded, spawn } from '~system/PortableExperiences'

const arcades = ['obj_arcade02.001', 'obj_arcade01.001', 'obj_arcade02.002', 'obj_arcade01.002']

export async function setupArcade() {
  arcades.forEach((arcade) => {
    pointerEventsSystem.onPointerDown(
      {
        entity: allSavedEntity.get(arcade) as Entity,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'ACTIVATE'
        }
      },
      () => {
        spawnArcade()
      }
    )
  })
}

async function spawnArcade() {
  const arcadePortableEns = `arcade.${BASE_URL.match(/daohq-testing/) ? 'testing' : 'staging'}.daohq.dappcraft.eth`

  const { loaded } = await getPortableExperiencesLoaded({})
  let isSpawned = false
  for (const portableExperience of loaded) {
    const { ens } = portableExperience
    if (ens == arcadePortableEns) {
      isSpawned = true
      deleteArcadePointers()
    }
  }
  if (!isSpawned) {
    spawn({ ens: arcadePortableEns }).catch(() => console.error('Error spawning arcade'))
    deleteArcadePointers()
  }
}

async function deleteArcadePointers() {
  arcades.forEach((arcade) => {
    pointerEventsSystem.removeOnPointerDown(allSavedEntity.get(arcade) as Entity)
  })
}
