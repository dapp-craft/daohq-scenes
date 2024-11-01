import { Color3, Color4 } from '@dcl/sdk/math'
import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { loadingProgress } from '../states/states'

export const loadingUI = () => {
  const prefix = 'loading_ui'
  let uiKeyCounter: number = 1

  return (
    <UiEntity
      key={`${prefix}${uiKeyCounter++}`}
      uiTransform={{
        positionType: 'absolute',
        height: '40%',
        width: '15%',
        position: { left: 10, top: '28%' },
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        display: loadingProgress.some((v) => v != 1) ? 'flex' : 'none',
        padding: 5
      }}
      uiBackground={{
        color: { ...Color4.fromHexString('#fefefe'), a: 0.66 }
      }}
    >
      {loadingProgress.map((v) => (
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            height: '100%',
            width: `${100 * v}%`,
            margin: 1
          }}
          uiBackground={{
            color: { ...Color3.fromHexString('#ff004d'), a: 1 }
          }}
        />
      ))}
    </UiEntity>
  )
}
