import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Sizer } from 'daohq-shared/Components/UiSizer/Sizer'
import { isVisible } from '../../states/states'
import { Color4 } from '@dcl/sdk/math'
import { switchTeleportMapVisibility } from './teleportMap'
import { switchProposalsAndEventsVisibility } from './proposalsAndEventsPanel'
import { coinState, dialogState } from '../../quests/src/questState'

export const controlsAndQuestsPanel = (): ReactEcs.JSX.Element => {
  const ratio = 6 / 1
  const sizer = new Sizer(ratio)
  const prefix = 'controls_panel'
  let uiKeyCounter: number = 1
  return (
    <UiEntity
      key={`${prefix}${uiKeyCounter++}`}
      uiTransform={{
        width: sizer.viewportHeightSize(0.43),
        height: sizer.viewportHeightSize(0.15),
        positionType: 'absolute',
        flexDirection: 'column',
        position: { top: sizer.viewportHeightSize(0.015), right: sizer.viewportHeightSize(0.065) },
        justifyContent: 'space-between',
        pointerFilter: 'block'
      }}
    >
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{ justifyContent: 'flex-end', height: '38%', width: '100%' }}
      >
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{ positionType: 'absolute', position: { top: 0, left: 0 }, width: '100%', height: '100%' }}
        >
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '11.5%',
              height: '87%',
              margin: { right: '3.7%' }
            }}
            uiBackground={{ texture: { src: 'images/ui/controlButtons/map_control_icon.png' }, textureMode: 'stretch' }}
            onMouseDown={switchTeleportMapVisibility}
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '11.5%',
              height: '87%',
              margin: { right: '3.7%' }
            }}
            uiBackground={{
              texture: { src: 'images/ui/controlButtons/quests_control_icon.png' },
              textureMode: 'stretch'
            }}
            onMouseDown={switchQuestMenuVisibility}
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '11.5%',
              height: '87%'
            }}
            uiBackground={{
              texture: { src: 'images/ui/controlButtons/proposals_control_icon.png' },
              textureMode: 'stretch'
            }}
            onMouseDown={switchProposalsAndEventsVisibility}
          />
        </UiEntity>
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            flexDirection: 'column',
            alignItems: 'center',
            height: '87%',
            width: '50%',
            margin: { right: '4%' },
            justifyContent: 'center'
          }}
          uiBackground={{
            textureMode: 'nine-slices',
            texture: { src: 'images/ui/templates/window_template.png' },
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
              width: '100%',
              justifyContent: 'space-between',
              padding: { right: '4%', left: '6%' },
              margin: { top: '-4%' }
            }}
          >
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiText={{
                value: `<b>XP</b>`,
                color: Color4.Black(),
                fontSize: sizer.viewportHeightSize(0.01955)
              }}
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiText={{
                value: `<b>${getCoinStringValue(coinState.uiCouter)}</b>`,
                color: Color4.Black(),
                fontSize: sizer.viewportHeightSize(0.01955)
              }}
            />
          </UiEntity>
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiBackground={{
              textureMode: 'stretch',
              texture: { src: 'images/ui/templates/red_line.png' }
            }}
            uiTransform={{
              width: '90%',
              height: '5%',
              margin: { top: -sizer.viewportHeightSize(0.006) }
            }}
          />
        </UiEntity>
        <UiEntity />
      </UiEntity>
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{
          width: '113%',
          minHeight: '60%',
          display: isVisible.controlsAndQuestsPanel ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { bottom: '3%' }
        }}
        uiBackground={{
          textureMode: 'nine-slices',
          texture: { src: 'images/ui/templates/window_template.png' },
          textureSlices: {
            top: 0.12,
            bottom: 0.12,
            left: 0.12,
            right: 0.12
          }
        }}
      >
        <UiEntity key={`${prefix}${uiKeyCounter++}`} uiTransform={{ width: '100%', justifyContent: 'space-between' }}>
          <UiEntity
            key={`${prefix}quest_msg${uiKeyCounter++}`}
            uiTransform={{ margin: { left: sizer.viewportHeightSize(0.022) } }}
            uiText={{
              value: `<b>${
                dialogState.questUiHudVisible ? dialogState.uiText.text : 'There are currently no active quests'
              }</b>`,
              fontSize: sizer.viewportHeightSize(0.018),
              color: Color4.Black()
            }}
          />
          <UiEntity
            key={`${prefix}quest_counter${uiKeyCounter++}`}
            uiTransform={{
              margin: { right: sizer.viewportHeightSize(0.015) },
              display: dialogState.uiText.counter || dialogState.uiText.amount ? 'flex' : 'none'
            }}
            uiText={{
              value: `<b>${dialogState.uiText.counter}/${dialogState.uiText.amount}</b>`,
              fontSize: sizer.viewportHeightSize(0.018),
              color: Color4.Black()
            }}
          />
        </UiEntity>
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{ width: '90%', height: '3%', margin: { top: '-1%' } }}
          uiBackground={{
            textureMode: 'stretch',
            texture: { src: 'images/ui/templates/red_line.png' }
          }}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            positionType: 'absolute',
            position: { left: sizer.viewportHeightSize(0.023), bottom: -sizer.viewportHeightSize(0.0379) },
            width: '100%',
            height: sizer.viewportHeightSize(0.038),
            justifyContent: 'space-between'
          }}
        >
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: sizer.viewportHeightSize(0.125),
              justifyContent: 'center'
            }}
            uiBackground={{
              texture: { src: 'images/ui/templates/quests_menu_white_action_template.png' },
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
                margin: {
                  left: '4.5%',
                  bottom: '6%'
                }
              }}
              uiText={{ value: '<b>QUESTS</b>', fontSize: sizer.viewportHeightSize(0.018), color: Color4.Black() }}
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                positionType: 'absolute',
                position: { left: sizer.viewportHeightSize(0.003), top: -sizer.viewportHeightSize(0.006) },
                width: '95.5%',
                height: sizer.viewportHeightSize(0.008)
              }}
              uiBackground={{ color: Color4.White() }}
            />
          </UiEntity>
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: sizer.viewportHeightSize(0.048),
              height: sizer.viewportHeightSize(0.038),
              margin: { bottom: -sizer.viewportHeightSize(0.0379), right: sizer.viewportHeightSize(0.046) },
              justifyContent: 'center',
              alignItems: 'center'
            }}
            uiBackground={{
              texture: { src: 'images/ui/templates/quests_menu_red_action_template.png' },
              textureMode: 'nine-slices',
              textureSlices: {
                top: 0.12,
                bottom: 0.12,
                left: 0.12,
                right: 0.12
              }
            }}
            onMouseDown={switchQuestMenuVisibility}
          >
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: sizer.viewportHeightSize(0.0145),
                height: sizer.viewportHeightSize(0.015)
              }}
              uiBackground={{ texture: { src: 'images/ui/templates/cross.png' }, textureMode: 'stretch' }}
            />
          </UiEntity>
        </UiEntity>
      </UiEntity>
    </UiEntity>
  )
}

const switchQuestMenuVisibility = () => {
  isVisible.controlsAndQuestsPanel = !isVisible.controlsAndQuestsPanel
}

const getCoinStringValue = (coins: number): string => {
  let coinsString: string = ''
  const zeroCount = 7 - coins.toString().length
  for (let i = 0; i < zeroCount; i++) {
    coinsString = coinsString.concat('0')
  }
  return `${coinsString}${coins}`
}
