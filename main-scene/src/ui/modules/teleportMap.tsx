import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { isVisible, teleportsData } from '../../states/states'
import { Sizer } from 'daohq-shared/Components/UiSizer/Sizer'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { movePlayerTo } from '~system/RestrictedActions'

export const teleportMap = () => {
  const ratio = 1 / 0.865
  const sizer = new Sizer(ratio)
  const prefix = 'teleport_map'
  let uiKeyCounter: number = 1
  return (
    <UiEntity
      key={`${prefix}${uiKeyCounter++}`}
      uiTransform={{
        display: isVisible.teleportMap ? 'flex' : 'none',
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center'
      }}
    >
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{ padding: sizer.fontSize(2) }}
        uiBackground={{
          texture: { src: 'images/ui/templates/window_template.png' },
          textureMode: 'nine-slices',
          textureSlices: {
            top: 0.12,
            bottom: 0.12,
            left: 0.12,
            right: 0.12
          }
        }}
      >
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            minWidth: sizer.width(0.9),
            minHeight: sizer.height(0.9),
            flexDirection: 'column',
            alignItems: 'center',
            pointerFilter: 'block'
          }}
          uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/teleportMap/bg_map.png' } }}
        >
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              positionType: 'absolute',
              position: { top: -sizer.viewportSize(0.034), right: sizer.viewportSize(0.02) }
            }}
          >
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: sizer.viewportSize(0.15),
                height: sizer.viewportSize(0.032),
                margin: { top: sizer.viewportSize(0.001) }
              }}
              uiBackground={{
                texture: { src: 'images/ui/templates/short_menu_white_action_template.png' },
                textureMode: 'nine-slices',
                textureSlices: {
                  top: 0.12,
                  bottom: 0.12,
                  left: 0.12,
                  right: 0.12
                }
              }}
            >
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{ margin: { left: sizer.viewportSize(0.018) } }}
                uiText={{ value: '<b>DAO HQ MAP</b>', color: Color4.Black(), fontSize: sizer.fontSize(9 * 1.1) }}
              />
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{
                  positionType: 'absolute',
                  position: { left: sizer.viewportSize(0.003), bottom: -sizer.viewportSize(0.0035) },
                  width: '96.5%',
                  height: sizer.viewportSize(0.008)
                }}
                uiBackground={{ color: Color4.White() }}
              />
            </UiEntity>
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: sizer.viewportSize(0.041),
                height: sizer.viewportSize(0.032),
                margin: { left: sizer.viewportSize(0.012), top: -sizer.viewportSize(0.001) },
                justifyContent: 'center',
                alignItems: 'center'
              }}
              uiBackground={{
                texture: { src: 'images/ui/templates/short_menu_red_action_template.png' },
                textureMode: 'nine-slices',
                textureSlices: {
                  top: 0.12,
                  bottom: 0.12,
                  left: 0.12,
                  right: 0.12
                }
              }}
              onMouseDown={switchTeleportMapVisibility}
            >
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{
                  width: sizer.fontSize(6.5 * 1.1),
                  height: sizer.fontSize(7 * 1.1),
                  margin: { top: sizer.viewportSize(0.002) }
                }}
                uiBackground={{ texture: { src: 'images/ui/templates/cross.png' }, textureMode: 'stretch' }}
              />
            </UiEntity>
          </UiEntity>
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: sizer.viewportSize(0.731),
              height: sizer.viewportSize(0.58),
              margin: { top: sizer.viewportSize(0.11) }
            }}
            uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/teleportMap/map.png' } }}
          >
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{ positionType: 'absolute', position: { top: '9.5%', left: '0.4%' } }}
              uiText={{ value: '<b>GEAR SPACE</b>', color: Color4.White(), fontSize: sizer.fontSize(8.15) }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.gearSpace.coords.roomPoint,
                  lookAt: teleportsData.gearSpace.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                positionType: 'absolute',
                position: { top: '15.5%', left: '16%' },
                width: sizer.viewportSize(0.05),
                height: sizer.viewportSize(0.05)
              }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.gearSpace.coords.roomPoint,
                  lookAt: teleportsData.gearSpace.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{ positionType: 'absolute', position: { top: '-4.3%', left: '54.8%' } }}
              uiText={{ value: '<b>MUSEUM</b>', color: Color4.White(), fontSize: sizer.fontSize(8.15) }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.museum.coords.roomPoint,
                  lookAt: teleportsData.museum.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                positionType: 'absolute',
                position: { top: '8.5%', left: '32.1%' },
                width: sizer.viewportSize(0.133),
                height: sizer.viewportSize(0.133)
              }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.museum.coords.roomPoint,
                  lookAt: teleportsData.museum.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{ positionType: 'absolute', position: { top: '5.8%', left: '70.3%' } }}
              uiText={{ value: '<b>COFFEE SPACE</b>', color: Color4.White(), fontSize: sizer.fontSize(8.15) }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.coffeeSpace.coords.roomPoint,
                  lookAt: teleportsData.coffeeSpace.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                positionType: 'absolute',
                position: { top: '13.7%', left: '57.7%' },
                width: sizer.viewportSize(0.073),
                height: sizer.viewportSize(0.073)
              }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.coffeeSpace.coords.roomPoint,
                  lookAt: teleportsData.coffeeSpace.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{ positionType: 'absolute', position: { top: '31.5%', left: '-0.1%' } }}
              uiText={{ value: '<b>CREATOR HALL</b>', color: Color4.White(), fontSize: sizer.fontSize(8.15) }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.creatorHall.coords.roomPoint,
                  lookAt: teleportsData.creatorHall.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                positionType: 'absolute',
                position: { top: '36.2%', left: '26.1%' },
                width: sizer.viewportSize(0.075),
                height: sizer.viewportSize(0.075)
              }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.creatorHall.coords.roomPoint,
                  lookAt: teleportsData.creatorHall.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{ positionType: 'absolute', position: { top: '55.1%', left: '58.8%' } }}
              uiText={{ value: '<b>SPAWN POINT</b>', color: Color4.White(), fontSize: sizer.fontSize(8.15) }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.spawnPoint.coords.roomPoint,
                  lookAt: teleportsData.spawnPoint.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                positionType: 'absolute',
                position: { top: '48.2%', left: '46.8%' },
                width: sizer.viewportSize(0.047),
                height: sizer.viewportSize(0.047)
              }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.spawnPoint.coords.roomPoint,
                  lookAt: teleportsData.spawnPoint.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{ positionType: 'absolute', position: { top: '26.3%', left: '88.1%' } }}
              uiText={{ value: '<b>WAR ROOM</b>', color: Color4.White(), fontSize: sizer.fontSize(8.15) }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.warRoom.coords.roomPoint,
                  lookAt: teleportsData.warRoom.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                positionType: 'absolute',
                position: { top: '36.15%', left: '68.3%' },
                width: sizer.viewportSize(0.098),
                height: sizer.viewportSize(0.098)
              }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.warRoom.coords.roomPoint,
                  lookAt: teleportsData.warRoom.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{ positionType: 'absolute', position: { top: '47.7%', left: '0.5%' } }}
              uiText={{ value: '<b>STAR SPACE</b>', color: Color4.White(), fontSize: sizer.fontSize(8.15) }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.starSpace.coords.roomPoint,
                  lookAt: teleportsData.starSpace.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                positionType: 'absolute',
                position: { top: '54.7%', left: '16.1%' },
                width: sizer.viewportSize(0.048),
                height: sizer.viewportSize(0.048)
              }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.starSpace.coords.roomPoint,
                  lookAt: teleportsData.starSpace.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{ positionType: 'absolute', position: { top: '67.2%', left: '39.2%' } }}
              uiText={{ value: '<b>WORLDS</b>', color: Color4.White(), fontSize: sizer.fontSize(8.15) }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.worlds.coords.roomPoint,
                  lookAt: teleportsData.worlds.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                positionType: 'absolute',
                position: { top: '60.7%', left: '32.7%' },
                width: sizer.viewportSize(0.048),
                height: sizer.viewportSize(0.048)
              }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.worlds.coords.roomPoint,
                  lookAt: teleportsData.worlds.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{ positionType: 'absolute', position: { top: '87.1%', left: 0 } }}
              uiText={{ value: '<b>ATOM SPACE</b>', color: Color4.White(), fontSize: sizer.fontSize(8.15) }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.atomSpace.coords.roomPoint,
                  lookAt: teleportsData.atomSpace.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                positionType: 'absolute',
                position: { top: '72.1%', left: '17%' },
                width: sizer.viewportSize(0.098),
                height: sizer.viewportSize(0.098)
              }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.atomSpace.coords.roomPoint,
                  lookAt: teleportsData.atomSpace.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{ positionType: 'absolute', position: { top: '94.5%', left: '49.9%' } }}
              uiText={{ value: '<b>HELP CENTER</b>', color: Color4.White(), fontSize: sizer.fontSize(8.15) }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.helpCenter.coords.roomPoint,
                  lookAt: teleportsData.helpCenter.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                positionType: 'absolute',
                position: { top: '78.2%', left: '40.1%' },
                width: sizer.viewportSize(0.0755),
                height: sizer.viewportSize(0.0755)
              }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.helpCenter.coords.roomPoint,
                  lookAt: teleportsData.helpCenter.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{ positionType: 'absolute', position: { top: '85.4%', left: '81.8%' } }}
              uiText={{ value: '<b>TOWN HALL</b>', color: Color4.White(), fontSize: sizer.fontSize(8.15) }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.townHall.coords.roomPoint,
                  lookAt: teleportsData.townHall.coords.lookAt
                })
              }
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                positionType: 'absolute',
                position: { top: '64.2%', left: '57%' },
                width: sizer.viewportSize(0.148),
                height: sizer.viewportSize(0.148)
              }}
              onMouseDown={() =>
                teleportUserToRoom({
                  teleportTo: teleportsData.townHall.coords.roomPoint,
                  lookAt: teleportsData.townHall.coords.lookAt
                })
              }
            />
          </UiEntity>
        </UiEntity>
      </UiEntity>
    </UiEntity>
  )
}

export const switchTeleportMapVisibility = () => {
  isVisible.teleportMap = !isVisible.teleportMap
  if (isVisible.proposalBoard) isVisible.proposalBoard = false
  if (isVisible.proposalModal) isVisible.proposalModal = false
}

const teleportUserToRoom = ({ teleportTo, lookAt }: { teleportTo: Vector3 | null; lookAt: Vector3 | null }) => {
  if (teleportTo && lookAt) {
    movePlayerTo({
      newRelativePosition: teleportTo,
      cameraTarget: lookAt
    })
  }
  switchTeleportMapVisibility()
}
