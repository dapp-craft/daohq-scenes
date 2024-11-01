import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Input, Label, UiEntity } from '@dcl/sdk/react-ecs'
import { config } from '../../debugConfig'
import { getRandomDailyQuests, resetQuestLine, setQuestPointer } from '../quests/src/questHandler'
import { dialogState, questDayMap, questReward, testQuestDayMap } from '../quests/src/questState'
import { backEndConfig, questDialogDay2Map, questDialogMap, testDailyQuestDialogMap } from '../quests/src/questConfig'
import {
  deleteCoinsProgress,
  deleteDailyQuestProgress,
  deleteQuestProgress,
  deleteRewards,
  getRewards
} from '../quests/src/backend'
import { coinsSpawn } from '../quests/src/coins'
import { setUserData } from '../quests/src/backendHandler'
import { screensInstances } from 'daohq-shared/globals'
import { VisibilityComponent } from '@dcl/sdk/ecs'
import { day1 } from '../quests/src/dayOneDialogs'
import { day2 } from '../quests/src/dayTwoDialogs'

let menuOpen: boolean = false

export const debugUi = () => {
  const prefix = 'debug_menu'
  let uiKeyCounter: number = 1

  return (
    <UiEntity
      key={`${prefix}${uiKeyCounter++}`}
      uiTransform={{
        positionType: 'absolute',
        height: '100%',
        width: '100%',
        position: { right: 10, bottom: 10 },
        margin: { right: 10, bottom: 10 },
        display: config.debugMenu ? 'flex' : 'none'
      }}
    >
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{
          positionType: 'absolute',
          height: 25,
          width: 25,
          position: { right: 10, bottom: 10 },
          margin: { right: 10, bottom: 10 }
        }}
        uiBackground={{
          color: Color4.Gray()
        }}
        onMouseDown={() => {
          menuOpen = !menuOpen
        }}
      ></UiEntity>

      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{
          positionType: 'absolute',
          height: 500,
          width: 350,
          position: { right: 10, bottom: 10 },
          margin: { right: 10, bottom: 10 },
          display: menuOpen ? 'flex' : 'none',
          flexDirection: 'column'
        }}
        uiBackground={{
          color: Color4.Gray()
        }}
      >
        <Label
          key={`${prefix}${uiKeyCounter++}`}
          value="Debug menu"
          uiTransform={{
            height: 30,
            position: { left: '27%' }
          }}
          fontSize={24}
        ></Label>

        <Input
          key={`${prefix}${uiKeyCounter++}`}
          onSubmit={async (value) => {
            await resetQuestLine()
            if (dialogState.dialog == day1) setQuestPointer(questDialogMap.get(+value))
            else if (dialogState.dialog == day2) setQuestPointer(questDialogDay2Map.get(+value))
            else setQuestPointer(testDailyQuestDialogMap.get(+value))
          }}
          fontSize={18}
          placeholderColor={Color4.Black()}
          placeholder="Quest number"
          uiTransform={{
            width: 'auto',
            height: '50px',
            display: config.quests ? 'flex' : 'none',
            margin: { left: 10, right: 10, top: 10 }
          }}
        ></Input>
        <Input
          key={`${prefix}${uiKeyCounter++}`}
          onSubmit={(value) => {
            console.log('Active day is', value, 'now')
            dialogState.dialog = testQuestDayMap.get(+value)
          }}
          fontSize={18}
          placeholderColor={Color4.Black()}
          placeholder="Quest day"
          uiTransform={{
            width: 'auto',
            height: '50px',
            display: config.quests ? 'flex' : 'none',
            margin: { left: 10, right: 10, top: 10 }
          }}
        ></Input>
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            width: '100%'
          }}
        >
          <Button
            key={`${prefix}${uiKeyCounter++}`}
            value="Reset quest system"
            variant="primary"
            uiTransform={{
              width: '100%',
              height: 40,
              margin: { left: 10, right: 10, top: 10 },
              display: config.quests ? 'flex' : 'none'
            }}
            textAlign="middle-center"
            onMouseDown={async () => {
              dialogState.dialog = questDayMap.get(1)
              resetQuestLine()
            }}
          />
          <Button
            key={`${prefix}${uiKeyCounter++}`}
            value="Reset quest tree"
            variant="secondary"
            uiTransform={{
              width: '100%',
              height: 40,
              margin: { left: 10, right: 10, top: 10 },
              display: config.quests ? 'flex' : 'none'
            }}
            textAlign="middle-center"
            onMouseDown={async () => {
              await resetQuestLine()
            }}
          />
        </UiEntity>
        <Button
          key={`${prefix}${uiKeyCounter++}`}
          value="BackEnd Switch"
          variant="secondary"
          uiTransform={{
            width: 'auto',
            height: 40,
            margin: { left: 10, right: 10, top: 10 },
            display: config.quests ? 'flex' : 'none'
          }}
          textAlign="middle-center"
          onMouseDown={async () => {
            backEndConfig.active = !backEndConfig.active
            await setUserData()
          }}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            width: 'auto',
            height: '3',
            margin: { left: 10, right: 10 }
          }}
          uiBackground={{
            color: backEndConfig.active ? Color4.Green() : Color4.Red()
          }}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            width: '100%'
          }}
        >
          <Button
            key={`${prefix}${uiKeyCounter++}`}
            value="Delete backend progress"
            variant="primary"
            uiTransform={{
              width: '100%',
              height: 40,
              margin: { left: 10, right: 10, top: 10 },
              display: config.quests ? 'flex' : 'none'
            }}
            textAlign="middle-center"
            uiBackground={{ color: backEndConfig.active ? Color4.Red() : Color4.Black() }}
            onMouseDown={async () => {
              dialogState.dialog = questDayMap.get(1)
              await deleteQuestProgress()
              await setUserData()
              await resetQuestLine()
            }}
          />
          <Button
            key={`${prefix}${uiKeyCounter++}`}
            value="Delete daily backend progress"
            variant="primary"
            uiTransform={{
              width: '100%',
              height: 40,
              margin: { left: 10, right: 10, top: 10 },
              display: config.quests ? 'flex' : 'none'
            }}
            textAlign="middle-center"
            uiBackground={{ color: backEndConfig.active ? Color4.Red() : Color4.Black() }}
            onMouseDown={async () => {
              await deleteDailyQuestProgress()
              await setUserData()
              await resetQuestLine()
            }}
          />
        </UiEntity>
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            width: '100%'
          }}
        >
          <Button
            key={`${prefix}${uiKeyCounter++}`}
            value="Reset Coins"
            variant="secondary"
            uiTransform={{
              width: '100%',
              height: 40,
              margin: { left: 10, right: 10, top: 10 },
              display: config.quests ? 'flex' : 'none'
            }}
            textAlign="middle-center"
            onMouseDown={async () => {
              await deleteCoinsProgress()
              await coinsSpawn()
            }}
          />
          <Button
            key={`${prefix}${uiKeyCounter++}`}
            value="Test daily random"
            variant="secondary"
            uiTransform={{
              width: '100%',
              height: 40,
              margin: { left: 10, right: 10, top: 10 },
              display: config.quests ? 'flex' : 'none'
            }}
            textAlign="middle-center"
            onMouseDown={async () => {
              dialogState.dialog = questDayMap.get(0)
              getRandomDailyQuests()
            }}
          />

          <Button
            key={`${prefix}${uiKeyCounter++}`}
            value="Delete reward"
            variant="secondary"
            uiTransform={{
              width: '100%',
              height: 40,
              margin: { left: 10, right: 10, top: 10 },
              display: config.quests ? 'flex' : 'none'
            }}
            textAlign="middle-center"
            onMouseDown={async () => {
              await deleteRewards()
              const response = await getRewards()
              questReward.userRewards = response.data
            }}
          />
        </UiEntity>
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            width: '100%'
          }}
        >
          <Button
            key={`${prefix}${uiKeyCounter++}`}
            value="Log VERSION"
            variant="secondary"
            uiTransform={{
              width: '100%',
              height: 40,
              margin: { left: 10, right: 10, top: 10 },
              display: config.quests ? 'flex' : 'none'
            }}
            textAlign="middle-center"
            onMouseDown={() => {
              console.log('\n\n Version \n\n', 'Scene: ', config.testVersion, '\n BackEnd: ', config.backendVersion)
            }}
          />
        </UiEntity>
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            width: '100%'
          }}
        >
          <Button
            key={`${prefix}${uiKeyCounter++}`}
            value="Switch triggers visibility"
            variant={config.triggersVisibility ? 'primary' : 'secondary'}
            uiTransform={{
              width: 'auto',
              height: 40,
              margin: { left: 10, right: 10, top: 10 }
            }}
            textAlign="middle-center"
            onMouseDown={() => {
              const screensWithTriggers = screensInstances.screens.filter(
                (screenItem) => screenItem.screen.videoTrigger
              )
              if (screensWithTriggers.length) {
                config.triggersVisibility = !config.triggersVisibility
                screensWithTriggers.forEach((screenItem) => {
                  if (screenItem.screen.videoTrigger && screenItem.screen.videoTrigger.entity) {
                    VisibilityComponent.createOrReplace(screenItem.screen.videoTrigger.entity, {
                      visible: config.triggersVisibility
                    })
                  }
                })
              }
            }}
          />
        </UiEntity>

        <Label
          key={`${prefix}${uiKeyCounter++}`}
          value="X"
          uiTransform={{
            positionType: 'absolute',
            position: { right: 0, bottom: 0 }
          }}
          fontSize={21}
        ></Label>
      </UiEntity>
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{
          positionType: 'absolute',
          width: 400,
          height: 'auto',
          position: { bottom: 70 },
          display: 'flex',
          flexDirection: 'column',
          padding: 5
        }}
        uiBackground={{
          color: { r: 0, g: 0, b: 0, a: 0.5 }
        }}
      >
        <Label
          key={`${prefix}${uiKeyCounter++}`}
          value={`Scene: ${config.testVersion}`}
          uiTransform={{
            width: 400,
            height: 30
          }}
          fontSize={12}
        ></Label>
        <Label
          key={`${prefix}${uiKeyCounter++}`}
          value={`Backend: ${config.backendVersion}`}
          uiTransform={{
            width: 400,
            height: 30
          }}
          fontSize={12}
        ></Label>
      </UiEntity>
    </UiEntity>
  )
}
