import ReactEcs, { UiEntity, Label, Button } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { Sizer } from '../Components/UiSizer/Sizer'
import { teleportToRealmState } from '../globals'
import { changeRealm } from '~system/RestrictedActions'

export const teleportToRealmConfirm = () => {
  const ratio = 2 / 1
  const sizer = new Sizer(ratio)
  const prefix = 'teleport_confirm_modal'
  let uiKeyCounter: number = 1

  return (
    <UiEntity
      key={`${prefix}${uiKeyCounter++}`}
      uiTransform={{
        positionType: 'absolute',
        position: { top: 0, right: 0, bottom: 0, left: 0 },
        alignItems: 'center',
        justifyContent: 'center',
        display: teleportToRealmState.isModalVisible ? 'flex' : 'none'
      }}
    >
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{
          width: sizer.viewportHeightSize(0.48),
          height: sizer.viewportHeightSize(0.615),
          pointerFilter: 'block'
        }}
        uiBackground={{
          textureMode: 'nine-slices',
          texture: { src: 'images/ui/templates/window_template_rounded_bottom.png' },
          textureSlices: { top: 0.12, right: 0.12, bottom: 0.12, left: 0.12 }
        }}
      >
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            positionType: 'absolute',
            position: { top: 0, left: 0, right: 0, bottom: '50%' }
          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: {
              src: `${
                teleportToRealmState.sceneInfo?.preview
                  ? teleportToRealmState.sceneInfo.preview
                  : 'images/scene-thumbnail.png'
              }`
            }
          }}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            padding: {
              top: sizer.viewportHeightSize(0.037),
              right: sizer.viewportHeightSize(0.025),
              bottom: sizer.viewportHeightSize(0.037),
              left: sizer.viewportHeightSize(0.025)
            },
            width: '100%',
            margin: { top: '60%' },
            flexDirection: 'column'
          }}
        >
          <Label
            key={`${prefix}${uiKeyCounter++}`}
            value={`<b>DAO-HQ ${
              teleportToRealmState.sceneInfo?.id ? teleportToRealmState.sceneInfo.id.toUpperCase() : 'LOCATION'
            }</b>`}
            color={Color4.Black()}
            fontSize={sizer.viewportHeightSize(0.021)}
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{ margin: { top: -sizer.viewportHeightSize(0.01) } }}
          >
            <Label
              key={`${prefix}${uiKeyCounter++}`}
              value="<color #808080><b>created by</b></color>"
              fontSize={sizer.viewportHeightSize(0.0165)}
            />
            <Label
              key={`${prefix}${uiKeyCounter++}`}
              value="<b>DAPPCRAFT</b>"
              color={Color4.Black()}
              fontSize={sizer.viewportHeightSize(0.018)}
            />
          </UiEntity>
          <Label
            key={`${prefix}${uiKeyCounter++}`}
            value={`<color #808080><b>WORLDS REALM</b></color>`}
            fontSize={sizer.viewportHeightSize(0.0165)}
            uiTransform={{ margin: { top: sizer.viewportHeightSize(0.01) } }}
          />
          <Label
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{ margin: { top: -sizer.viewportHeightSize(0.01) } }}
            value={`<b>${
              teleportToRealmState.realmToTeleport ? teleportToRealmState.realmToTeleport : 'realm address error'
            }</b>`}
            color={Color4.Black()}
            fontSize={sizer.viewportHeightSize(0.0165)}
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              positionType: 'absolute',
              position: {
                left: sizer.viewportHeightSize(0.025),
                bottom: sizer.viewportHeightSize(0.037),
                right: sizer.viewportHeightSize(0.025)
              },
              justifyContent: 'space-between',
              width: '89%'
            }}
          >
            <Button
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{ width: '48%', height: sizer.viewportHeightSize(0.05) }}
              variant="secondary"
              value="<b>CANCEL</b>"
              uiBackground={{
                textureMode: 'nine-slices',
                texture: { src: 'images/ui/templates/black_square_template.png' },
                textureSlices: { top: 0.12, right: 0.12, bottom: 0.12, left: 0.12 }
              }}
              fontSize={sizer.viewportHeightSize(0.015)}
              color={Color4.White()}
              onMouseDown={toggleTeleportToRealmConfirm}
            />
            <Button
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{ width: '48%', height: sizer.viewportHeightSize(0.05) }}
              variant="secondary"
              uiBackground={{
                textureMode: 'nine-slices',
                texture: { src: 'images/ui/templates/red_rectangle_template.png' },
                textureSlices: { top: 0.12, right: 0.12, bottom: 0.12, left: 0.12 }
              }}
              fontSize={sizer.viewportHeightSize(0.015)}
              color={Color4.White()}
              value="<b>JUMP IN</b>"
              onMouseDown={() => {
                if (teleportToRealmState.realmToTeleport) {
                  changeRealm({ realm: teleportToRealmState.realmToTeleport })
                } else {
                  throw new Error('teleportToRealmState does not have a valid realm address')
                }
              }}
            />
          </UiEntity>
        </UiEntity>
      </UiEntity>
    </UiEntity>
  )
}

export const toggleTeleportToRealmConfirm = () => {
  teleportToRealmState.isModalVisible = !teleportToRealmState.isModalVisible
}
