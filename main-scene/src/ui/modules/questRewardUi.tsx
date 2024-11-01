import { getRewards, pickUpReward } from '../../quests/src/backend'
import { rewardList } from '../../quests/src/questConfig'
import { updateRewardModel } from '../../quests/src/backendHandler'
import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, UiEntity } from '@dcl/sdk/react-ecs'
import { questReward } from '../../quests/src/questState'
import { Sizer } from 'daohq-shared/Components/UiSizer/Sizer'

export const questRewardUi = () => {
  const ratio = 1 / 0.865
  const sizer = new Sizer(ratio)
  const prefix = 'reward_claim_ui'
  let uiKeyCounter: number = 1

  return (
    <UiEntity
      key={`${prefix}${uiKeyCounter++}`}
      uiTransform={{
        positionType: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        display: questReward.rewardUi ? 'flex' : 'none'
      }}
    >
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{
          positionType: 'relative',
          width: sizer.viewportHeightSize(0.52),
          height: sizer.viewportHeightSize(0.24),
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: sizer.viewportHeightSize(0.025),
          pointerFilter: 'block',
          display: !questReward.claimedWindow ? 'flex' : 'none'
        }}
        uiBackground={{
          textureMode: 'nine-slices',
          texture: { src: 'images/ui/templates/rounded_window_template.png' },
          textureSlices: { top: 0.12, right: 0.12, bottom: 0.12, left: 0.12 }
        }}
      >
        <Button
          key={`${prefix}${uiKeyCounter++}`}
          value=""
          variant="secondary"
          uiTransform={{
            positionType: 'absolute',
            position: { top: sizer.viewportHeightSize(0.025), right: sizer.viewportHeightSize(0.025) },
            width: sizer.viewportHeightSize(0.035),
            height: sizer.viewportHeightSize(0.035)
          }}
          textAlign="middle-center"
          disabled={!questReward.closeButtonReady}
          onMouseDown={() => (questReward.rewardUi = !questReward.rewardUi)}
          uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/templates/btn_close.png' } }}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            flexDirection: 'column',
            padding: { left: sizer.viewportHeightSize(0.01) }
          }}
        >
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiText={{
              value: `<b>${
                rewardList.get(questReward.rewardNumber)?.name
                  ? rewardList.get(questReward.rewardNumber)?.name
                  : 'No Name'
              }</b>`,
              fontSize: sizer.viewportHeightSize(0.028),
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
              width: '90%',
              height: sizer.viewportHeightSize(0.003),
              margin: { top: -sizer.viewportHeightSize(0.004) }
            }}
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiText={{
              value: `Price: ${
                rewardList.get(questReward.rewardNumber)?.price
                  ? rewardList.get(questReward.rewardNumber)?.price
                  : 'No Price'
              }`,
              fontSize: sizer.viewportHeightSize(0.02),
              color: Color4.Black()
            }}
          />
        </UiEntity>
        <Button
          key={`${prefix}${uiKeyCounter++}`}
          value={questReward.rewardReady ? 'Claim' : questReward.claimUIStatus ? 'Claimed' : 'Claim'}
          variant="secondary"
          disabled={!questReward.rewardReady}
          uiTransform={{
            width: '100%',
            height: sizer.viewportHeightSize(0.05),
            margin: { bottom: sizer.viewportHeightSize(0.005) }
          }}
          textAlign="middle-center"
          fontSize={sizer.viewportHeightSize(0.025)}
          color={Color4.White()}
          uiBackground={{
            textureMode: 'nine-slices',
            texture: { src: 'images/ui/templates/red_rectangle_template.png' },
            textureSlices: {
              top: 0.12,
              bottom: 0.12,
              left: 0.12,
              right: 0.12
            }
          }}
          onMouseDown={async () => {
            questReward.rewardPending = true
            if (!questReward.rewardReady) return (questReward.claimUIStatus = false)
            questReward.rewardReady = false
            // console.log('Claim is: ', questReward.rewardReady)
            questReward.closeButtonReady = false
            const pickUpResponse = await pickUpReward(questReward.rewardNumber)
            questReward.closeButtonReady = true
            questReward.text = pickUpResponse.data.status ? pickUpResponse.data.status : pickUpResponse.data.detail
            if (!pickUpResponse.success) {
              questReward.claimUIStatus = false
              questReward.claimedWindow = !questReward.claimedWindow
              questReward.rewardPending = false
              return
            }
            const getRewardResponse = await getRewards()
            if (!getRewardResponse.success) {
              questReward.rewardPending = false
              return (questReward.claimUIStatus = false)
            }
            questReward.rewardPending = false
            questReward.userRewards = getRewardResponse.data
            questReward.claimedWindow = !questReward.claimedWindow
            questReward.claimUIStatus = true
            await updateRewardModel(true)
          }}
        />
      </UiEntity>
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{
          positionType: 'relative',
          width: sizer.viewportHeightSize(0.52),
          height: sizer.viewportHeightSize(0.24),
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: sizer.viewportHeightSize(0.025),
          pointerFilter: 'block',
          display: questReward.claimedWindow ? 'flex' : 'none'
        }}
        uiBackground={{
          textureMode: 'nine-slices',
          texture: { src: 'images/ui/templates/rounded_window_template.png' },
          textureSlices: { top: 0.12, right: 0.12, bottom: 0.12, left: 0.12 }
        }}
      >
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            flexDirection: 'column',
            padding: { left: sizer.viewportHeightSize(0.01) }
          }}
        >
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiText={{
              value: questReward.claimUIStatus ? '<b>Reward was claimed</b>' : '<b>Reward was NOT claimed</b>',
              fontSize: sizer.viewportHeightSize(0.028),
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
              width: '90%',
              height: sizer.viewportHeightSize(0.003),
              margin: { top: -sizer.viewportHeightSize(0.004) }
            }}
          />
        </UiEntity>
        <Button
          key={`${prefix}${uiKeyCounter++}`}
          value=""
          variant="secondary"
          uiTransform={{
            positionType: 'absolute',
            position: { top: sizer.viewportHeightSize(0.025), right: sizer.viewportHeightSize(0.025) },
            width: sizer.viewportHeightSize(0.035),
            height: sizer.viewportHeightSize(0.035)
          }}
          textAlign="middle-center"
          onMouseDown={() => {
            questReward.claimedWindow = !questReward.claimedWindow
            questReward.rewardUi = !questReward.rewardUi
          }}
          uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/templates/btn_close.png' } }}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiText={{
            value: questReward.text ? questReward.text : 'Unknown error',
            fontSize: sizer.viewportHeightSize(0.02),
            color: Color4.Black()
          }}
          uiTransform={{ alignSelf: 'center' }}
        />
        <Button
          key={`${prefix}${uiKeyCounter++}`}
          value="OK"
          variant="secondary"
          uiTransform={{
            width: '100%',
            height: sizer.viewportHeightSize(0.05),
            margin: { bottom: sizer.viewportHeightSize(0.005) }
          }}
          textAlign="middle-center"
          fontSize={sizer.viewportHeightSize(0.025)}
          color={Color4.White()}
          uiBackground={{
            textureMode: 'nine-slices',
            texture: { src: 'images/ui/templates/red_rectangle_template.png' },
            textureSlices: {
              top: 0.12,
              bottom: 0.12,
              left: 0.12,
              right: 0.12
            }
          }}
          onMouseDown={() => {
            questReward.claimedWindow = !questReward.claimedWindow
            questReward.rewardUi = !questReward.rewardUi
          }}
        />
      </UiEntity>
    </UiEntity>
  )
}
