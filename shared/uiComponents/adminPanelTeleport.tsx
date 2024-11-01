import ReactEcs, { Button, UiEntity } from '@dcl/sdk/react-ecs'
import { teleportToScreenData } from '../globals'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'
import { movePlayerTo } from '~system/RestrictedActions'
import { Sizer } from '../Components/UiSizer/Sizer'

export const adminPanelTeleport = (): ReactEcs.JSX.Element => {
  const ratio = 4 / 1
  const sizer = new Sizer(ratio)
  const prefix = 'adm_pan_tel'
  let uiKeyCounter: number = 1
  return (
    <UiEntity
      key={`${prefix}${uiKeyCounter++}`}
      uiTransform={{
        width: sizer.width(0.2),
        positionType: 'absolute',
        position: { top: sizer.viewportSize(0.006), left: sizer.viewportSize(0.14) },
        flexDirection: 'column',
        display: teleportToScreenData.isVisible ? 'flex' : 'none'
      }}
    >
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{
          width: '100%',
          flexDirection: 'column',
          padding: { top: '2%', right: '3%', left: '4%', bottom: '2%' },
          pointerFilter: 'block'
        }}
        uiBackground={{
          textureMode: 'nine-slices',
          texture: { src: 'images/ui/templates/window_template.png' },
          textureSlices: { top: 0.12, right: 0.12, bottom: 0.12, left: 0.12 }
        }}
      >
        <Button
          key={`${prefix}${uiKeyCounter++}`}
          value=""
          variant="secondary"
          uiTransform={{
            width: sizer.viewportSize(0.015),
            height: sizer.viewportSize(0.015),
            positionType: 'absolute',
            position: { right: sizer.viewportSize(0.005), top: sizer.viewportSize(0.005) }
          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: { src: 'images/ui/templates/btn_close.png' }
          }}
          color={Color4.White()}
          onMouseDown={() => {
            switchAdminTeleportMenu()
          }}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiText={{
            value: '<b>Teleport to selected screens:</b>',
            fontSize: sizer.fontSize(5 * 1.1),
            color: Color4.Black()
          }}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiBackground={{
            textureMode: 'stretch',
            texture: { src: 'images/ui/templates/red_line.png' }
          }}
          uiTransform={{
            width: '88%',
            height: sizer.viewportHeightSize(0.003),
            margin: { top: -sizer.viewportHeightSize(0.004) }
          }}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            margin: { top: sizer.viewportSize(0.005), bottom: sizer.viewportSize(0.003) },
            flexDirection: 'column'
          }}
        >
          {teleportToScreenData.screens.map((screen) => (
            <UiEntity
              key={`${prefix}${uiKeyCounter++}${screen.locationId}${screen.slotId}`}
              uiTransform={{
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: { top: sizer.viewportSize(0.0025) }
              }}
            >
              <UiEntity
                key={`${prefix}${uiKeyCounter++}${screen.locationId}`}
                uiTransform={{
                  margin: { top: sizer.viewportHeightSize(0.003), bottom: sizer.viewportHeightSize(0.003) },
                  flexDirection: 'column'
                }}
              >
                <UiEntity
                  uiTransform={{ height: sizer.viewportHeightSize(0.025) }}
                  key={`${prefix}${uiKeyCounter++}location${screen.locationId}`}
                  uiText={{
                    value: `<b>Location ID:</b> "${screen.locationId}"`,
                    color: Color4.Black(),
                    fontSize: sizer.fontSize(4.15 * 1.1)
                  }}
                />
                <UiEntity
                  uiTransform={{ height: sizer.viewportHeightSize(0.025) }}
                  key={`${prefix}${uiKeyCounter++}slot${screen.slotId}`}
                  uiText={{
                    value: `<b>Name:</b> "${screen.name}"`,
                    color: Color4.Black(),
                    fontSize: sizer.fontSize(4.15 * 1.1)
                  }}
                />
              </UiEntity>
              <Button
                key={`${prefix}${uiKeyCounter++}${screen.slotId}`}
                value="Jump"
                variant="secondary"
                fontSize={sizer.fontSize(4.5 * 1.1)}
                textAlign="middle-center"
                uiTransform={{
                  width: sizer.viewportSize(0.04),
                  height: sizer.viewportSize(0.02),
                  margin: { right: sizer.viewportSize(0.003) }
                }}
                uiBackground={{
                  textureMode: 'nine-slices',
                  texture: { src: 'images/ui/templates/red_rectangle_template.png' },
                  textureSlices: { top: 0.12, right: 0.12, bottom: 0.12, left: 0.12 }
                }}
                color={Color4.White()}
                onMouseDown={() => {
                  const { x, y, z } = screen.transform.position
                  const radius: number = 5
                  const screenRot = Quaternion.toEulerAngles(screen.transform.rotation)
                  const playerX: number = x + radius * Math.sin((Math.PI / 180) * screenRot.y)
                  const playerZ: number = z + radius * Math.cos((Math.PI / 180) * screenRot.y)
                  const playerPosition: Vector3 = { x: playerX, y, z: playerZ }
                  movePlayerTo({ newRelativePosition: playerPosition, cameraTarget: screen.transform.position })
                }}
              />
            </UiEntity>
          ))}
        </UiEntity>
      </UiEntity>
    </UiEntity>
  )
}

export const switchAdminTeleportMenu = () => {
  teleportToScreenData.isVisible = !teleportToScreenData.isVisible
}
