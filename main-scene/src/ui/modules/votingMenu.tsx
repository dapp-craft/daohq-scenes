import ReactEcs, { Button, Dropdown, Label, PositionUnit, UiEntity } from '@dcl/sdk/react-ecs'
import { votingData, isVisible, proposalFilterParams } from '../../states/states'
import { sendVote } from '../../scripts/votingProcessing'
import { Color4 } from '@dcl/sdk/math'
import { getVotingData } from '../../scripts/getVotingData'
import { Marked } from 'marked'
import { convert } from 'html-to-text'
import { openExternalUrl } from '~system/RestrictedActions'
import { Sizer } from 'daohq-shared/Components/UiSizer/Sizer'

interface IDropdownItem {
  isActive: boolean
  selectIndex: undefined | number
  currentValues: {
    loading: string[]
    select: string[]
  }
}

interface IByCategoryDropdownState {
  mainCategories: IDropdownItem
  governance: IDropdownItem
  grants: IDropdownItem
  binding: IDropdownItem
}

interface IByStatusDropdownState {
  status: IDropdownItem
}

interface ITimeFrameDropdownState {
  timeFrame: IDropdownItem
}

interface ISizesProps {
  width: PositionUnit
  height: PositionUnit
}

const marked = new Marked()

const loadingValue: string[] = ['loading...']

const mainCategoriesFilterValues: string[] = [
  'All Proposals',
  'Point of Interest',
  'Catalyst Node',
  'Name Ban',
  'Linked Wearables',
  'Hiring'
]

const governanceFilterValues: string[] = ['All Governance', 'Poll', 'Draft', 'Governance']

const grantFilterValues: string[] = [
  'Not selected',
  'All Grants',
  'Accelerator',
  'Core Unit',
  'Documentation',
  'In-World Content',
  'Platform',
  'Social Media',
  'Sponsorship',
  'Legacy'
]

const biddingFilterValues: string[] = ['All B&T', 'Pitch', 'Tender', 'Bid']

const statusFilterValues: string[] = [
  'All Outcomes',
  'Pending',
  'Active',
  'Finished',
  'Rejected',
  'Passed',
  'Out Of Budget',
  'Enacted'
]

const timeFrameValues: string[] = ['All Time', 'Last Week', 'Last Month', 'Last 90 Days']

let dropdownByCategoryVal: IByCategoryDropdownState = {
  mainCategories: {
    isActive: true,
    selectIndex: 0,
    currentValues: { select: mainCategoriesFilterValues, loading: loadingValue }
  },
  governance: {
    isActive: true,
    selectIndex: 0,
    currentValues: { select: governanceFilterValues, loading: loadingValue }
  },
  grants: { isActive: true, selectIndex: 0, currentValues: { select: grantFilterValues, loading: loadingValue } },
  binding: { isActive: true, selectIndex: 0, currentValues: { select: biddingFilterValues, loading: loadingValue } }
}

let dropdownByStatusVal: IByStatusDropdownState = {
  status: { isActive: true, selectIndex: 0, currentValues: { select: statusFilterValues, loading: loadingValue } }
}

let dropdownByTimeFrameVal: ITimeFrameDropdownState = {
  timeFrame: { isActive: true, selectIndex: 0, currentValues: { select: timeFrameValues, loading: loadingValue } }
}

const parseMdText = async (mdText: string) => {
  const html = await marked.parse(mdText)
  return convert(html)
}

export const makeAllDropdownsActive = (): void => {
  let key: keyof typeof dropdownByCategoryVal
  for (key in dropdownByCategoryVal) dropdownByCategoryVal[key].isActive = true
  dropdownByStatusVal.status.isActive = true
  dropdownByTimeFrameVal.timeFrame.isActive = true
}
const updateDropdownByCategoryVal = (exception: string, index: number): void => {
  let key: keyof typeof dropdownByCategoryVal
  for (key in dropdownByCategoryVal) {
    dropdownByCategoryVal[key].isActive = key === exception
    dropdownByCategoryVal[key].selectIndex = key === exception ? index : 0
  }
}

const updateDropdownByStatusVal = (index: number): void => {
  dropdownByStatusVal.status.isActive = votingData.isBoardPageLoaded
  dropdownByStatusVal.status.selectIndex = index
}

const updateDropdownByTimeFrameVal = (index: number): void => {
  dropdownByTimeFrameVal.timeFrame.isActive = votingData.isBoardPageLoaded
  dropdownByTimeFrameVal.timeFrame.selectIndex = index
}

const updateProposals = async (): Promise<void> => {
  if (votingData.isBoardPageLoaded) proposalFilterParams.offset = 0
  await getVotingData('board')
  if (votingData.isBoardPageLoaded) makeAllDropdownsActive()
}

const mainCategoriesFilterOptions = (index: number): void => {
  if (votingData.isBoardPageLoaded) {
    updateDropdownByCategoryVal('mainCategories', index)
    switch (index) {
      case 0:
        proposalFilterParams.type = undefined
        updateProposals()
        break
      case 1:
        proposalFilterParams.type = 'poi'
        updateProposals()
        break
      case 2:
        proposalFilterParams.type = 'catalyst'
        updateProposals()
        break
      case 3:
        proposalFilterParams.type = 'ban_name'
        updateProposals()
        break
      case 4:
        proposalFilterParams.type = 'linked_wearables'
        updateProposals()
        break
      case 5:
        proposalFilterParams.type = 'hiring'
        updateProposals()
        break
      default:
        proposalFilterParams.type = undefined
        updateProposals()
    }
  } else {
    dropdownByCategoryVal.mainCategories.isActive = false
    isVisible.paginationMsgInBoard = true
  }
}

const governanceFilterOptions = (index: number): void => {
  if (votingData.isBoardPageLoaded) {
    updateDropdownByCategoryVal('governance', index)
    switch (index) {
      case 0:
        proposalFilterParams.type = undefined
        updateProposals()
        break
      case 1:
        proposalFilterParams.type = 'poll'
        updateProposals()
        break
      case 2:
        proposalFilterParams.type = 'draft'
        updateProposals()
        break
      case 3:
        proposalFilterParams.type = 'governance'
        updateProposals()
        break
      default:
        proposalFilterParams.type = undefined
        updateProposals()
    }
  } else {
    dropdownByCategoryVal.governance.isActive = false
    isVisible.paginationMsgInBoard = true
  }
}

const grantsFilterOptions = (index: number): void => {
  if (votingData.isBoardPageLoaded) {
    updateDropdownByCategoryVal('grants', index)
    switch (index) {
      case 0:
        proposalFilterParams.type = undefined
        updateProposals()
        break
      case 1:
        proposalFilterParams.type = 'grant'
        updateProposals()
        break
      case 2:
        proposalFilterParams.type = 'Accelerator'
        updateProposals()
        break
      case 3:
        proposalFilterParams.type = 'Core+Unit'
        updateProposals()
        break
      case 4:
        proposalFilterParams.type = 'Documentation'
        updateProposals()
        break
      case 5:
        proposalFilterParams.type = 'In-World+Content'
        updateProposals()
        break
      case 6:
        proposalFilterParams.type = 'Platform'
        updateProposals()
        break
      case 7:
        proposalFilterParams.type = 'Social+Media+Content'
        updateProposals()
        break
      case 8:
        proposalFilterParams.type = 'Sponsorship'
        updateProposals()
        break
      case 9:
        proposalFilterParams.type = 'legacy'
        updateProposals()
        break
      default:
        proposalFilterParams.type = undefined
        updateProposals()
    }
  } else {
    dropdownByCategoryVal.grants.isActive = false
    isVisible.paginationMsgInBoard = true
  }
}

const governanceBindingOptions = async (index: number): Promise<void> => {
  if (votingData.isBoardPageLoaded) {
    updateDropdownByCategoryVal('binding', index)
    switch (index) {
      case 0:
        proposalFilterParams.type = undefined
        updateProposals()
        break
      case 1:
        proposalFilterParams.type = 'pitch'
        updateProposals()
        break
      case 2:
        proposalFilterParams.type = 'tender'
        updateProposals()
        break
      case 3:
        proposalFilterParams.type = 'bid'
        updateProposals()
        break
      default:
        proposalFilterParams.type = undefined
        updateProposals()
    }
  } else {
    dropdownByCategoryVal.binding.isActive = false
    isVisible.paginationMsgInBoard = true
  }
}

const statusFilterOptions = async (index: number): Promise<void> => {
  if (votingData.isBoardPageLoaded) {
    updateDropdownByStatusVal(index)
    switch (index) {
      case 0:
        proposalFilterParams.status = undefined
        updateProposals()
        break
      case 1:
        proposalFilterParams.status = 'pending'
        updateProposals()
        break
      case 2:
        proposalFilterParams.status = 'active'
        updateProposals()
        break
      case 3:
        proposalFilterParams.status = 'finished'
        updateProposals()
        break
      case 4:
        proposalFilterParams.status = 'rejected'
        updateProposals()
        break
      case 5:
        proposalFilterParams.status = 'passed'
        updateProposals()
        break
      case 6:
        proposalFilterParams.status = 'out_of_budget'
        updateProposals()
        break
      case 7:
        proposalFilterParams.status = 'enacted'
        updateProposals()
        break
      default:
        proposalFilterParams.status = undefined
        updateProposals()
    }
  } else {
    dropdownByStatusVal.status.isActive = false
    isVisible.paginationMsgInBoard = true
  }
}

const timeFrameOptions = async (index: number): Promise<void> => {
  if (votingData.isBoardPageLoaded) {
    updateDropdownByTimeFrameVal(index)
    switch (index) {
      case 0:
        proposalFilterParams.timeFrame = undefined
        updateProposals()
        break
      case 1:
        proposalFilterParams.timeFrame = 'week'
        updateProposals()
        break
      case 2:
        proposalFilterParams.timeFrame = 'month'
        updateProposals()
        break
      case 3:
        proposalFilterParams.timeFrame = '3months'
        updateProposals()
        break
      default:
        proposalFilterParams.timeFrame = undefined
        updateProposals()
    }
  } else {
    dropdownByTimeFrameVal.timeFrame.isActive = false
    isVisible.paginationMsgInBoard = true
  }
}

const getProposalDetails = async () => {
  if (votingData.selectedProposal) {
    const { configuration, type } = votingData.selectedProposal
    switch (type) {
      case 'poi':
      case 'catalyst':
      case 'ban_name':
        if ('description' in configuration && typeof configuration.description === 'string') {
          votingData.selectedProposalDetails = {
            text: await parseMdText(configuration.description)
          }
        }
        break
      case 'grant':
      case 'draft':
      case 'governance':
        if ('abstract' in configuration && typeof configuration.abstract === 'string') {
          votingData.selectedProposalDetails = {
            text: await parseMdText(configuration.abstract)
          }
        }
        break
      case 'tender':
        if ('summary' in configuration && typeof configuration.summary === 'string') {
          votingData.selectedProposalDetails = {
            text: await parseMdText(configuration.summary)
          }
        }
        break
      default:
        votingData.selectedProposalDetails = {
          text: await parseMdText(votingData.selectedProposal.description)
        }
        break
    }
  }
}

export const proposalInformation = (): ReactEcs.JSX.Element => {
  const ratio = 0.9 / 1
  const sizer = new Sizer(ratio)
  const prefix = 'proposal_info'
  let uiKeyCounter: number = 1
  return (
    <UiEntity
      key={`${prefix}${uiKeyCounter++}`}
      uiTransform={{
        display: isVisible.proposalModal ? 'flex' : 'none',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center'
      }}
    >
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{
          width: sizer.width(0.9),
          height: sizer.height(0.9),
          alignSelf: 'center',
          padding: sizer.viewportSize(0.038),
          pointerFilter: 'block'
        }}
        uiBackground={{
          textureMode: 'nine-slices',
          texture: { src: 'images/ui/templates/rounded_window_template.png' },
          textureSlices: {
            top: 0.12,
            bottom: 0.12,
            left: 0.12,
            right: 0.12
          }
        }}
      >
        <Button
          key={`${prefix}${uiKeyCounter++}`}
          value=""
          variant="secondary"
          uiTransform={{
            width: sizer.viewportSize(0.04),
            height: sizer.viewportSize(0.039),
            positionType: 'absolute',
            position: { right: sizer.viewportSize(0.04), top: sizer.viewportSize(0.035) }
          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: { src: 'images/ui/templates/btn_close.png' }
          }}
          color={Color4.White()}
          onMouseDown={closeProposalModal}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            width: '100%',
            height: 'auto',
            flexDirection: 'column',
            display: votingData.selectedProposal !== null ? 'flex' : 'none'
          }}
        >
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              alignSelf: 'flex-start',
              alignItems: 'flex-end',
              width: '100%',
              height: 'auto',
              margin: { top: sizer.viewportSize(0.02) }
            }}
          >
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: sizer.fontSize(110),
                height: sizer.fontSize(110),
                margin: { top: sizer.viewportSize(0.06), right: sizer.viewportSize(0.03) }
              }}
              uiBackground={{
                textureMode: 'stretch',
                texture: {
                  src:
                    typeof votingData.selectedProposal?.userData === 'object' &&
                    votingData.selectedProposal.userData !== null &&
                    'avatar' in votingData.selectedProposal.userData
                      ? votingData.selectedProposal.userData.avatar.snapshots.face256
                      : 'https://decentraland.org/images/male.png'
                }
              }}
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{ flexDirection: 'column', justifyContent: 'flex-end' }}
            >
              <UiEntity key={`${prefix}${uiKeyCounter++}`} uiTransform={{ height: sizer.viewportSize(0.026) }}>
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: sizer.viewportSize(0.13),
                    height: 'auto'
                  }}
                  uiText={{
                    value: `<color #777777><b>Author</b></color>`,
                    fontSize: sizer.fontSize(8 * 1.1),
                    color: Color4.Black(),
                    textAlign: 'middle-left'
                  }}
                />
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: 'auto',
                    height: 'auto'
                  }}
                  uiText={{
                    value: `<b>${
                      votingData.selectedProposal?.userData
                        ? votingData.selectedProposal.userData.name
                        : votingData.selectedProposal
                        ? `${votingData.selectedProposal.user.slice(0, 6)}...${votingData.selectedProposal.user.slice(
                            votingData.selectedProposal.user.length - 4
                          )}`
                        : '...'
                    }</b>`,
                    fontSize: sizer.fontSize(8 * 1.1),
                    color: Color4.Black(),
                    textAlign: 'middle-left'
                  }}
                />
              </UiEntity>
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{ width: '100%', height: sizer.viewportSize(0.003) }}
                uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/templates/gray_line.png' } }}
              />
              <UiEntity key={`${prefix}${uiKeyCounter++}`} uiTransform={{ height: sizer.viewportSize(0.026) }}>
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: sizer.viewportSize(0.13),
                    height: 'auto'
                  }}
                  uiText={{
                    value: `<color #777777><b>Address</b></color>`,
                    fontSize: sizer.fontSize(8 * 1.1),
                    color: Color4.Black(),
                    textAlign: 'middle-left'
                  }}
                />
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: 'auto',
                    height: 'auto'
                  }}
                  uiText={{
                    value: `<b>${votingData.selectedProposal?.user}</b>`,
                    fontSize: sizer.fontSize(8 * 1.1),
                    color: Color4.Black(),
                    textAlign: 'middle-left'
                  }}
                />
              </UiEntity>
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{ width: '100%', height: sizer.viewportSize(0.003) }}
                uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/templates/gray_line.png' } }}
              />
              <UiEntity key={`${prefix}${uiKeyCounter++}`} uiTransform={{ height: sizer.viewportSize(0.026) }}>
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: sizer.viewportSize(0.13),
                    height: 'auto'
                  }}
                  uiText={{
                    value: `<color #777777><b>Voting Begins</b></color>`,
                    fontSize: sizer.fontSize(8 * 1.1),
                    color: Color4.Black(),
                    textAlign: 'middle-left'
                  }}
                />
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: 'auto',
                    height: 'auto'
                  }}
                  uiText={{
                    value: `<b>${votingData.selectedProposal?.created_at.slice(0, 10)}</b>`,
                    fontSize: sizer.fontSize(8 * 1.1),
                    color: Color4.Black(),
                    textAlign: 'middle-left'
                  }}
                />
              </UiEntity>
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{ width: '100%', height: sizer.viewportSize(0.003) }}
                uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/templates/gray_line.png' } }}
              />
              <UiEntity key={`${prefix}${uiKeyCounter++}`} uiTransform={{ height: sizer.viewportSize(0.026) }}>
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: sizer.viewportSize(0.13),
                    height: 'auto'
                  }}
                  uiText={{
                    value: `<color #777777><b>Voting Ends</b></color>`,
                    fontSize: sizer.fontSize(8 * 1.1),
                    color: Color4.Black(),
                    textAlign: 'middle-left'
                  }}
                />
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: 'auto',
                    height: 'auto'
                  }}
                  uiText={{
                    value: `<b>${votingData.selectedProposal?.finish_at.slice(0, 10)}</b>`,
                    fontSize: sizer.fontSize(8 * 1.1),
                    color: Color4.Black(),
                    textAlign: 'middle-left'
                  }}
                />
              </UiEntity>
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{ width: '100%', height: sizer.viewportSize(0.003) }}
                uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/templates/gray_line.png' } }}
              />
              <UiEntity key={`${prefix}${uiKeyCounter++}`} uiTransform={{ height: sizer.viewportSize(0.026) }}>
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: sizer.viewportSize(0.13),
                    height: 'auto'
                  }}
                  uiText={{
                    value: `<color #777777><b>Status</b></color>`,
                    fontSize: sizer.fontSize(8 * 1.1),
                    color: Color4.Black(),
                    textAlign: 'middle-left'
                  }}
                />
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: 'auto',
                    height: 'auto'
                  }}
                  uiText={{
                    value: `<b>${votingData.selectedProposal?.status}</b>`,
                    fontSize: sizer.fontSize(8 * 1.1),
                    color: Color4.Black(),
                    textAlign: 'middle-left'
                  }}
                />
              </UiEntity>
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{ width: '100%', height: sizer.viewportSize(0.003) }}
                uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/templates/gray_line.png' } }}
              />
              <UiEntity key={`${prefix}${uiKeyCounter++}`} uiTransform={{ height: sizer.viewportSize(0.026) }}>
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: sizer.viewportSize(0.13),
                    height: 'auto'
                  }}
                  uiText={{
                    value: `<color #777777><b>Type</b></color>`,
                    fontSize: sizer.fontSize(8 * 1.1),
                    color: Color4.Black(),
                    textAlign: 'middle-left'
                  }}
                />
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: 'auto',
                    height: 'auto'
                  }}
                  uiText={{
                    value: `<b>${votingData.selectedProposal?.type}</b>`,
                    fontSize: sizer.fontSize(8 * 1.1),
                    color: Color4.Black(),
                    textAlign: 'middle-left'
                  }}
                />
              </UiEntity>
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{ width: '100%', height: sizer.viewportSize(0.003) }}
                uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/templates/gray_line.png' } }}
              />
              <UiEntity key={`${prefix}${uiKeyCounter++}`} uiTransform={{ height: sizer.viewportSize(0.026) }}>
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: sizer.viewportSize(0.13),
                    height: 'auto'
                  }}
                  uiText={{
                    value: `<color #777777><b>Votes</b></color>`,
                    fontSize: sizer.fontSize(8 * 1.1),
                    color: Color4.Black(),
                    textAlign: 'middle-left'
                  }}
                />
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: 'auto',
                    height: 'auto'
                  }}
                  uiText={{
                    value: votingData.selectedProposal?.votes
                      ? `<b>${Object.keys(votingData.selectedProposal.votes).length}</b>`
                      : 'Loading votes count...',
                    fontSize: sizer.fontSize(8 * 1.1),
                    color: Color4.Black(),
                    textAlign: 'middle-left'
                  }}
                />
              </UiEntity>
            </UiEntity>
          </UiEntity>
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '100%',
              height: 'auto',
              alignSelf: 'center',
              margin: { top: sizer.viewportSize(0.04) }
            }}
            uiText={{
              value: `<b>${votingData.selectedProposal?.title}</b>`,
              fontSize: sizer.fontSize(16 * 1),
              color: Color4.Black(),
              textAlign: 'middle-left'
            }}
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              height: sizer.viewportSize(0.003),
              width: '100%',
              margin: { top: sizer.viewportSize(0.02), bottom: sizer.viewportSize(0.02) }
            }}
            uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/templates/red_line.png' } }}
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '100%',
              height: sizer.viewportSize(0.8),
              overflow: 'hidden',
              flexDirection: 'column',
              margin: {
                bottom: sizer.viewportSize(0.08)
              }
            }}
          >
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: '100%',
                height: '100%',
                positionType: 'absolute',
                position: { top: 0 }
              }}
              uiText={{
                value: votingData.selectedProposalDetails.text
                  ? `${votingData.selectedProposalDetails.text}`
                  : 'LOADING...',
                fontSize: sizer.fontSize(12.5 * 1),
                color: Color4.Black(),
                textAlign: 'top-left',
                textWrap: 'wrap'
              }}
            />
          </UiEntity>
        </UiEntity>
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            display: votingData.selectedProposal === null ? 'flex' : 'none'
          }}
          uiText={{
            value: `Error! No data to render for this proposal`,
            fontSize: sizer.fontSize(15),
            color: Color4.Black(),
            textAlign: 'top-center'
          }}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            width: '100%',
            height: sizer.viewportSize(0.4),
            positionType: 'absolute',
            position: { bottom: sizer.viewportSize(0.002), left: 0 }
          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: { src: 'images/ui/templates/white_line.png' }
          }}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            alignSelf: 'center',
            width: '100%',
            padding: { top: '1.5%', bottom: '4%' },
            justifyContent: 'space-between',
            positionType: 'absolute',
            position: { bottom: 0, left: 0 }
          }}
        >
          <Button
            key={`${prefix}${uiKeyCounter++}`}
            value="<b>VOTE</b>"
            variant="secondary"
            fontSize={sizer.fontSize(10 * 1.1)}
            textAlign="middle-center"
            uiTransform={{
              margin: { top: sizer.viewportSize(0.01), left: sizer.viewportSize(0.04) },
              minWidth: sizer.viewportSize(0.15),
              height: '100%',
              justifyContent: 'center',
              alignSelf: 'center',
              padding: { left: sizer.viewportSize(0.015), right: sizer.viewportSize(0.015) }
            }}
            uiBackground={{
              textureMode: 'nine-slices',
              texture: {
                src: 'images/ui/templates/red_rectangle_template.png'
              },
              textureSlices: {
                top: 0.12,
                bottom: 0.12,
                left: 0.12,
                right: 0.12
              }
            }}
            color={Color4.White()}
            onMouseDown={toggleVotingChoiceModal}
          />
          <Button
            key={`${prefix}${uiKeyCounter++}`}
            value="<color #FA2B54><b>VIEW MORE</b></color>"
            variant="secondary"
            fontSize={sizer.fontSize(9 * 1.1)}
            uiTransform={{
              padding: { left: sizer.viewportSize(0.015), right: sizer.viewportSize(0.015) },
              width: sizer.viewportSize(0.15),
              alignSelf: 'flex-end',
              margin: { top: sizer.viewportSize(0.008), right: sizer.viewportSize(0.045) },
              height: '100%'
            }}
            uiBackground={{
              textureMode: 'nine-slices',
              texture: { src: 'images/ui/templates/red_transparent_rectangle_template.png' },
              textureSlices: { top: 0.12, right: 0.12, bottom: 0.12, left: 0.12 }
            }}
            onMouseDown={() => {
              if (isVisible.votingChoiceModal) isVisible.votingChoiceModal = false
              openExternalUrl({
                url: `https://decentraland.org/governance/proposal/?id=${votingData.selectedProposal?.id}`
              })
            }}
          />
        </UiEntity>
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            positionType: 'absolute',
            position: { top: 0, right: 0, left: 0, bottom: 0 },
            justifyContent: 'center',
            alignItems: 'center',
            display: isVisible.votingChoiceModal ? 'flex' : 'none'
          }}
        >
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              flexDirection: 'column',
              padding: {
                top: sizer.viewportSize(0.02),
                right: sizer.viewportSize(0.04),
                bottom: sizer.viewportSize(0.04),
                left: sizer.viewportSize(0.04)
              },
              width: '45%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            uiBackground={{
              texture: { src: 'images/ui/templates/rounded_window_template.png' },
              textureMode: 'nine-slices',
              textureSlices: {
                top: 0.12,
                bottom: 0.12,
                left: 0.12,
                right: 0.12
              },
              color: Color4.White()
            }}
          >
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiText={{ value: '<b>Your choice</b>', fontSize: sizer.fontSize(12 * 1.1), color: Color4.Black() }}
            />
            {votingData.selectedProposal?.configuration.choices.map((choiceItem, index) => (
              <Button
                key={`${prefix}${choiceItem}${uiKeyCounter++}`}
                value={choiceItem.toUpperCase()}
                variant="secondary"
                fontSize={sizer.fontSize(10 * 1.1)}
                textAlign="middle-center"
                uiTransform={{
                  margin: { top: sizer.viewportSize(0.01) },
                  minWidth: sizer.viewportSize(0.065),
                  width: '100%',
                  minHeight: sizer.viewportSize(0.042),
                  height: 'auto',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  padding: { left: sizer.viewportSize(0.015), right: sizer.viewportSize(0.015) }
                }}
                uiBackground={{
                  textureMode: 'nine-slices',
                  texture: {
                    src: 'images/ui/templates/red_rectangle_template.png'
                  },
                  textureSlices: {
                    top: 0.12,
                    bottom: 0.12,
                    left: 0.12,
                    right: 0.12
                  }
                }}
                color={Color4.White()}
                onMouseDown={() => {
                  votingData.voteValue = index + 1
                  toggleVotingConfirmModal()
                }}
              />
            ))}
          </UiEntity>
        </UiEntity>
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            width: '63%',
            minHeight: sizer.viewportSize(0.23),
            height: 'auto',
            positionType: 'absolute',
            flexDirection: 'column',
            position: { top: '30%', left: '21%' },
            padding: sizer.viewportSize(0.02),
            display: isVisible.votingConfirmModal ? 'flex' : 'none'
          }}
          uiBackground={{
            textureMode: 'nine-slices',
            texture: { src: 'images/ui/templates/rounded_window_template.png' },
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
              alignSelf: 'center',
              width: 'auto',
              height: 'auto',
              margin: { top: sizer.viewportSize(0.02) }
            }}
            uiText={{
              value: `${
                votingData.selectedProposal?.configuration?.choices && votingData.voteValue
                  ? `Your choice is <b>${
                      votingData.selectedProposal.configuration.choices[votingData.voteValue - 1]
                    }</b>`
                  : ''
              } \nDo you confirm your vote?`,
              color: Color4.Black(),
              fontSize: sizer.fontSize(11 * 1.1),
              textAlign: 'top-center'
            }}
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '100%',
              height: sizer.viewportSize(0.055),
              alignSelf: 'center',
              justifyContent: 'center',
              margin: { top: sizer.viewportSize(0.02) }
            }}
          >
            <Button
              key={`${prefix}${uiKeyCounter++}`}
              value="YES"
              variant="secondary"
              fontSize={sizer.fontSize(10 * 1.1)}
              uiTransform={{
                width: sizer.viewportSize(0.065),
                height: '100%',
                margin: { right: sizer.viewportSize(0.03) }
              }}
              uiBackground={{
                textureMode: 'nine-slices',
                texture: { src: 'images/ui/templates/green_rectangle_template.png' },
                textureSlices: {
                  top: 0.12,
                  bottom: 0.12,
                  left: 0.12,
                  right: 0.12
                }
              }}
              onMouseDown={() => {
                sendVote()
                toggleVotingConfirmModal()
                toggleVotingChoiceModal()
              }}
              color={Color4.White()}
            />
            <Button
              key={`${prefix}${uiKeyCounter++}`}
              value="NO"
              variant="secondary"
              fontSize={sizer.fontSize(10 * 1.1)}
              uiTransform={{ width: sizer.viewportSize(0.065), height: '100%' }}
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
                votingData.voteValue = null
                toggleVotingConfirmModal()
                toggleVotingChoiceModal()
              }}
              color={Color4.White()}
            />
          </UiEntity>
        </UiEntity>
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            minWidth: '40%',
            maxHeight: sizer.viewportSize(votingData.votingResult ? 0.22 : 0.25),
            positionType: 'absolute',
            flexDirection: 'column',
            position: { top: '30%', left: '32%' },
            justifyContent: 'flex-start',
            display: isVisible.votingResultModal ? 'flex' : 'none'
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
              height: '100%',
              flexDirection: 'column',
              margin: { top: sizer.viewportSize(0.04) },
              alignItems: 'center'
            }}
          >
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{ width: sizer.fontSize(28 * 1.1), height: sizer.fontSize(28 * 1.1) }}
                uiBackground={{
                  textureMode: 'stretch',
                  texture: {
                    src: `${
                      typeof votingData.votingResult === 'boolean' && votingData.votingResult
                        ? 'images/ui/templates/success.png'
                        : typeof votingData.votingResult === 'boolean' && !votingData.votingResult
                        ? 'images/ui/templates/error.png'
                        : ''
                    }`
                  }
                }}
              />
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiText={{
                  value:
                    typeof votingData.votingResult === 'boolean' && votingData.votingResult
                      ? `<b>You have successfully voted!</b>`
                      : typeof votingData.votingResult === 'boolean' && !votingData.votingResult
                      ? `<b>Error! You could not vote.</b>`
                      : '',
                  color: Color4.Black(),
                  fontSize: sizer.fontSize(10 * 1.1)
                }}
              />
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{
                  display: typeof votingData.votingResult === 'boolean' && !votingData.votingResult ? 'flex' : 'none',
                  margin: { top: -sizer.viewportSize(0.01) }
                }}
                uiText={{
                  value: `<color #777777><b>Check your vote power and try again later.</b></color>`,
                  color: Color4.Black(),
                  fontSize: sizer.fontSize(7 * 1.1)
                }}
              />
            </UiEntity>
          </UiEntity>
          <Button
            key={`${prefix}${uiKeyCounter++}`}
            value="OK"
            variant="secondary"
            fontSize={sizer.fontSize(10 * 1.1)}
            uiTransform={{
              width: '45%',
              height: sizer.viewportSize(0.085),
              margin: { bottom: sizer.viewportSize(0.03) },
              alignSelf: 'center'
            }}
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
            color={Color4.White()}
            onMouseDown={() => {
              toggleVotingResultModal()
              closeProposalModal()
            }}
          />
        </UiEntity>
      </UiEntity>
    </UiEntity>
  )
}

export const proposalsBoard = (): ReactEcs.JSX.Element => {
  const ratio = 1 / 0.815
  const sizer = new Sizer(ratio)
  const prefix = 'proposal_board'
  let uiKeyCounter: number = 1
  return (
    <UiEntity
      key={`${prefix}${uiKeyCounter++}`}
      uiTransform={{
        positionType: 'absolute',
        position: { top: 0, right: 0, bottom: 0, left: 0 },
        justifyContent: 'center',
        alignItems: 'center',
        display: isVisible.proposalBoard ? 'flex' : 'none'
      }}
    >
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{
          width: sizer.width(0.85),
          height: sizer.height(0.85),
          padding: { top: sizer.viewportSize(0.02) },
          pointerFilter: 'block'
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
        <Button
          key={`${prefix}${uiKeyCounter++}`}
          value=""
          variant="secondary"
          uiTransform={{
            width: sizer.viewportSize(0.027),
            height: sizer.viewportSize(0.027),
            positionType: 'absolute',
            position: { right: sizer.viewportSize(0.02), top: sizer.viewportSize(0.02) }
          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: { src: 'images/ui/templates/btn_close.png' }
          }}
          color={Color4.White()}
          onMouseDown={() => toggleProposalBoard()}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            width: '35%',
            height: 'auto',
            flexDirection: 'column',
            padding: { top: '4%', right: '2%', left: '3%' }
          }}
        >
          <Label
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '100%',
              height: sizer.viewportSize(0.03)
            }}
            value="<b>By category</b>"
            color={Color4.Black()}
            fontSize={sizer.fontSize(9 * 1.1)}
            textAlign="middle-left"
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              height: sizer.viewportSize(0.002),
              width: '100%'
            }}
            uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/templates/red_line.png' } }}
          />
          <Label
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '100%',
              height: sizer.viewportSize(0.02),
              margin: { top: sizer.viewportSize(0.007), bottom: sizer.viewportSize(0.005) }
            }}
            value="Main categories"
            color={Color4.Black()}
            fontSize={sizer.fontSize(7 * 1.1)}
            textAlign="middle-left"
          />
          <Dropdown
            key={`${prefix}${uiKeyCounter++}`}
            fontSize={sizer.fontSize(8 * 1.1)}
            disabled={!dropdownByCategoryVal.mainCategories.isActive}
            selectedIndex={dropdownByCategoryVal.mainCategories.selectIndex}
            options={
              dropdownByCategoryVal.mainCategories.isActive
                ? dropdownByCategoryVal.mainCategories.currentValues.select
                : dropdownByCategoryVal.mainCategories.currentValues.loading
            }
            onChange={mainCategoriesFilterOptions}
            uiTransform={{
              width: '100%',
              height: sizer.viewportSize(0.038)
            }}
            uiBackground={{ color: Color4.White() }}
            color={Color4.Black()}
            textAlign="middle-left"
          />
          <Label
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '100%',
              height: sizer.viewportSize(0.02),
              margin: { top: sizer.viewportSize(0.005), bottom: sizer.viewportSize(0.005) }
            }}
            value="Governance"
            color={Color4.Black()}
            fontSize={sizer.fontSize(7 * 1.1)}
            textAlign="middle-left"
          />
          <Dropdown
            key={`${prefix}${uiKeyCounter++}`}
            fontSize={sizer.fontSize(8 * 1.1)}
            disabled={!dropdownByCategoryVal.governance.isActive}
            selectedIndex={dropdownByCategoryVal.governance.selectIndex}
            options={
              dropdownByCategoryVal.governance.isActive
                ? dropdownByCategoryVal.governance.currentValues.select
                : dropdownByCategoryVal.governance.currentValues.loading
            }
            onChange={governanceFilterOptions}
            uiTransform={{
              width: '100%',
              height: sizer.viewportSize(0.038)
            }}
            uiBackground={{ color: Color4.White() }}
            color={Color4.Black()}
            textAlign="middle-left"
          />
          <Label
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '100%',
              height: sizer.viewportSize(0.02),
              margin: { top: sizer.viewportSize(0.005), bottom: sizer.viewportSize(0.005) }
            }}
            value="Grants"
            color={Color4.Black()}
            fontSize={sizer.fontSize(7 * 1.1)}
            textAlign="middle-left"
          />
          <Dropdown
            key={`${prefix}${uiKeyCounter++}`}
            fontSize={sizer.fontSize(8 * 1.1)}
            disabled={!dropdownByCategoryVal.grants.isActive}
            selectedIndex={dropdownByCategoryVal.grants.selectIndex}
            options={
              dropdownByCategoryVal.grants.isActive
                ? dropdownByCategoryVal.grants.currentValues.select
                : dropdownByCategoryVal.grants.currentValues.loading
            }
            onChange={grantsFilterOptions}
            uiTransform={{
              width: '100%',
              height: sizer.viewportSize(0.038)
            }}
            uiBackground={{ color: Color4.White() }}
            color={Color4.Black()}
            textAlign="middle-left"
          />
          <Label
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '100%',
              height: sizer.viewportSize(0.02),
              margin: { top: sizer.viewportSize(0.005), bottom: sizer.viewportSize(0.005) }
            }}
            value="Binding & Tendering"
            color={Color4.Black()}
            fontSize={sizer.fontSize(7 * 1.1)}
            textAlign="middle-left"
          />
          <Dropdown
            key={`${prefix}${uiKeyCounter++}`}
            fontSize={sizer.fontSize(8 * 1.1)}
            disabled={!dropdownByCategoryVal.binding.isActive}
            selectedIndex={dropdownByCategoryVal.binding.selectIndex}
            options={
              dropdownByCategoryVal.binding.isActive
                ? dropdownByCategoryVal.binding.currentValues.select
                : dropdownByCategoryVal.binding.currentValues.loading
            }
            onChange={governanceBindingOptions}
            uiTransform={{
              width: '100%',
              height: sizer.viewportSize(0.038)
            }}
            uiBackground={{ color: Color4.White() }}
            color={Color4.Black()}
            textAlign="middle-left"
          />
          <Label
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '100%',
              height: sizer.viewportSize(0.02),
              margin: { top: sizer.viewportSize(0.01), bottom: sizer.viewportSize(0.005) }
            }}
            value="<b>By status</b>"
            color={Color4.Black()}
            fontSize={sizer.fontSize(9 * 1.1)}
            textAlign="middle-left"
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              height: sizer.viewportSize(0.002),
              width: '100%'
            }}
            uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/templates/red_line.png' } }}
          />
          <Dropdown
            key={`${prefix}${uiKeyCounter++}`}
            disabled={!dropdownByStatusVal.status.isActive}
            selectedIndex={dropdownByStatusVal.status.selectIndex}
            options={
              dropdownByStatusVal.status.isActive
                ? dropdownByStatusVal.status.currentValues.select
                : dropdownByStatusVal.status.currentValues.loading
            }
            fontSize={sizer.fontSize(8 * 1.1)}
            onChange={statusFilterOptions}
            uiTransform={{
              width: '100%',
              height: sizer.viewportSize(0.038),
              margin: { top: sizer.viewportSize(0.012) }
            }}
            uiBackground={{ color: Color4.White() }}
            color={Color4.Black()}
            textAlign="middle-left"
          />
          <Label
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '100%',
              height: sizer.viewportSize(0.02),
              margin: { top: sizer.viewportSize(0.01), bottom: sizer.viewportSize(0.005) }
            }}
            value="<b>By Timeframe</b>"
            color={Color4.Black()}
            fontSize={sizer.fontSize(9 * 1.1)}
            textAlign="middle-left"
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              height: sizer.viewportSize(0.002),
              width: '100%'
            }}
            uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/templates/red_line.png' } }}
          />
          <Dropdown
            key={`${prefix}${uiKeyCounter++}`}
            fontSize={sizer.fontSize(8 * 1.1)}
            disabled={!dropdownByTimeFrameVal.timeFrame.isActive}
            selectedIndex={dropdownByTimeFrameVal.timeFrame.selectIndex}
            options={
              dropdownByTimeFrameVal.timeFrame.isActive
                ? dropdownByTimeFrameVal.timeFrame.currentValues.select
                : dropdownByTimeFrameVal.timeFrame.currentValues.loading
            }
            onChange={timeFrameOptions}
            uiTransform={{
              width: '100%',
              height: sizer.viewportSize(0.038),
              margin: { top: sizer.viewportSize(0.012) }
            }}
            uiBackground={{ color: Color4.White() }}
            color={Color4.Black()}
            textAlign="middle-left"
          />
        </UiEntity>
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            positionType: 'absolute',
            position: { top: 0, right: '75%', bottom: 0, left: 0 },
            pointerFilter: 'block',
            display: votingData.isBoardPageLoaded ? 'none' : 'flex'
          }}
          onMouseDown={switchPaginationMsg}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            padding: {
              right: sizer.viewportSize(0.015),
              bottom: sizer.viewportSize(0.01),
              left: sizer.viewportSize(0.01)
            }
          }}
        >
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '100%',
              height: 'auto',
              justifyContent: 'center',
              margin: { left: '-15%', bottom: sizer.viewportSize(0.01) }
            }}
            uiText={{
              value: '<b>Proposal board</b>',
              fontSize: sizer.fontSize(10.5 * 1.1),
              color: Color4.Black()
            }}
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              display: votingData.proposals === null ? 'flex' : 'none',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              margin: { top: '40%' }
            }}
            uiText={{ value: '<b>LOADING PROPOSALS...</b>', fontSize: sizer.fontSize(10 * 1.1), color: Color4.Black() }}
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              display: votingData.proposals !== null && votingData.proposals.length === 0 ? 'flex' : 'none',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              margin: { top: '40%' }
            }}
            uiText={{
              value: '<b>There are no proposals for these filter parameters</b>',
              fontSize: sizer.fontSize(9.5 * 1.1),
              color: Color4.Black()
            }}
          />
          {votingData.proposals?.map((proposal) => (
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                justifyContent: 'space-between',
                width: '100%',
                height: sizer.viewportSize(0.063),
                margin: { bottom: sizer.viewportSize(0.007) }
              }}
              onMouseDown={() => {
                votingData.selectedProposal = proposal
                toggleProposalModal()
              }}
            >
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{ height: '100%', minWidth: '74%', width: '100%' }}
              >
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{ width: sizer.viewportSize(0.0567), height: '90%', margin: { right: '2%' } }}
                  uiBackground={{
                    textureMode: 'stretch',
                    texture: {
                      src:
                        typeof proposal.userData === 'object' &&
                        proposal.userData !== null &&
                        'avatar' in proposal.userData
                          ? proposal.userData.avatar.snapshots.face256
                          : ''
                    }
                  }}
                />
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    flexDirection: 'column'
                  }}
                >
                  <UiEntity
                    key={`${prefix}${uiKeyCounter++}`}
                    uiTransform={{
                      width: 'auto',
                      height: 'auto'
                    }}
                    uiText={{
                      value: `<b>${proposal.title}</b>`,
                      fontSize: sizer.fontSize(7.5 * 1.1),
                      color: Color4.Black(),
                      textAlign: 'middle-left'
                    }}
                  />
                  <UiEntity
                    key={`${prefix}${uiKeyCounter++}`}
                    uiTransform={{
                      width: '100%',
                      height: 'auto'
                    }}
                  >
                    <UiEntity
                      key={`${prefix}${uiKeyCounter++}`}
                      uiTransform={{
                        width: 'auto'
                      }}
                      uiText={{
                        value: `By <color #FA2B54><b>${
                          proposal.userData ? proposal.userData.name : 'Loading ...'
                        }</b></color>`,
                        fontSize: sizer.fontSize(6 * 1.1),
                        color: Color4.Black()
                      }}
                    />
                    <UiEntity
                      key={`${prefix}${uiKeyCounter++}`}
                      uiTransform={{
                        width: 'auto'
                      }}
                      uiText={{
                        value: `Votes <color #FA2B54><b>${
                          proposal.votes && typeof proposal.votes === 'object'
                            ? Object.keys(proposal.votes).length
                            : '...'
                        }</b></color>`,
                        fontSize: sizer.fontSize(6 * 1.1),
                        color: Color4.Black()
                      }}
                    />
                    <UiEntity
                      key={`${prefix}${uiKeyCounter++}`}
                      uiTransform={{
                        width: 'auto'
                      }}
                      uiText={{
                        value: `Comments <color #FA2B54><b>${
                          proposal.comments ? proposal.comments.totalComments : '...'
                        }</b></color>`,
                        fontSize: sizer.fontSize(6 * 1.1),
                        color: Color4.Black()
                      }}
                    />
                    <UiEntity
                      key={`${prefix}${uiKeyCounter++}`}
                      uiTransform={{
                        width: 'auto'
                      }}
                      uiText={{
                        value: `End at <color #FA2B54><b>${
                          proposal.finish_at ? proposal.finish_at.slice(0, 10) : '...'
                        }</b></color>`,
                        fontSize: sizer.fontSize(6 * 1.1),
                        color: Color4.Black()
                      }}
                    />
                  </UiEntity>
                </UiEntity>
              </UiEntity>
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{
                  minWidth: '22%',
                  width: '100%'
                }}
              >
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: 'auto'
                  }}
                  uiText={{
                    value: `<color ${proposal.status === 'active' ? '#5CA263' : '#FA2B54'}><b>${
                      proposal.status ? proposal.status : '...'
                    }</b></color>`,
                    fontSize: sizer.fontSize(7 * 1.1)
                  }}
                />
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: 'auto',
                    margin: { left: '3%' }
                  }}
                  uiText={{
                    value: `<b>${proposal.type ? proposal.type : '...'}</b>`,
                    fontSize: sizer.fontSize(7 * 1.1),
                    color: Color4.Black()
                  }}
                />
              </UiEntity>
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{
                  height: sizer.viewportSize(0.002),
                  width: '96%',
                  positionType: 'absolute',
                  position: { bottom: -sizer.viewportSize(0.004), left: 0 }
                }}
                uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/templates/gray_line.png' } }}
              />
            </UiEntity>
          ))}
          <UiEntity
            key={`${prefix}controls_wrap${uiKeyCounter++}`}
            uiTransform={{
              width: '100%',
              height: '5%',
              alignItems: 'center',
              alignSelf: 'center',
              positionType: 'absolute',
              position: { bottom: sizer.viewportSize(0.02), left: 0 },
              justifyContent: 'center'
            }}
          >
            <UiEntity
              key={`${prefix}controls_prev_wrap${uiKeyCounter++}`}
              uiTransform={{
                width: sizer.viewportSize(0.03),
                height: sizer.viewportSize(0.03),
                margin: { right: sizer.viewportSize(0.011) },
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseDown={() => switchProposalsPage('prev')}
            >
              <UiEntity
                key={`${prefix}controls_prev${uiKeyCounter++}`}
                uiTransform={{
                  width: sizer.viewportSize(0.009),
                  height: sizer.viewportSize(0.012),
                  display: votingData.totalShortListProposals && proposalFilterParams.offset ? 'flex' : 'none'
                }}
                uiBackground={{ texture: { src: 'images/ui/shortMenu/prev.png' }, textureMode: 'stretch' }}
              />
            </UiEntity>
            <UiEntity
              key={`${prefix}controls_counter${uiKeyCounter++}`}
              uiTransform={{
                height: sizer.viewportSize(0.027),
                minWidth: sizer.viewportSize(0.027),
                alignItems: 'center',
                justifyContent: 'center',
                padding: { left: sizer.viewportSize(0.003), bottom: sizer.viewportSize(0.001) }
              }}
              uiText={{
                value: `<b>${Math.floor(proposalFilterParams.offset / proposalFilterParams.limit) + 1}</b>`,
                color: Color4.White(),
                fontSize: sizer.fontSize(8 * 1.1)
              }}
              uiBackground={{
                texture: { src: 'images/ui/templates/red_rectangle_template.png' },
                textureMode: 'nine-slices',
                textureSlices: { top: 0.12, right: 0.12, bottom: 0.12, left: 0.12 }
              }}
            />
            <UiEntity
              key={`${prefix}controls_next_wrap${uiKeyCounter++}`}
              uiTransform={{
                width: sizer.viewportSize(0.03),
                height: sizer.viewportSize(0.03),
                margin: { left: sizer.viewportSize(0.011) },
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseDown={() => switchProposalsPage('next')}
            >
              <UiEntity
                key={`${prefix}controls_next`}
                uiTransform={{
                  width: sizer.viewportSize(0.009),
                  height: sizer.viewportSize(0.012),
                  display:
                    votingData.totalProposals &&
                    votingData.totalProposals > proposalFilterParams.limit + proposalFilterParams.offset
                      ? 'flex'
                      : 'none'
                }}
                uiBackground={{
                  texture: { src: 'images/ui/shortMenu/next.png' },
                  textureMode: 'stretch'
                }}
              />
            </UiEntity>
          </UiEntity>
          <UiEntity
            key={`${prefix}pagination_msg_modal`}
            uiTransform={{
              positionType: 'absolute',
              position: { top: '35%', right: '25%', bottom: '35%', left: '25%' },
              flexDirection: 'column',
              alignItems: 'center',
              display: isVisible.paginationMsgInBoard ? 'flex' : 'none'
            }}
            uiBackground={{
              textureMode: 'nine-slices',
              texture: { src: 'images/ui/templates/red_border_rectangle_template.png' },
              textureSlices: {
                top: 0.12,
                bottom: 0.12,
                left: 0.12,
                right: 0.12
              }
            }}
          >
            <UiEntity
              key={`${prefix}pagination_msg_modal_msg_text`}
              uiText={{
                value: '<b>Wait for the previous page to load!</b>',
                color: Color4.Black(),
                fontSize: sizer.fontSize(10 * 1.1),
                textAlign: 'middle-center'
              }}
              uiTransform={{
                margin: { top: sizer.viewportSize(0.015) },
                padding: sizer.viewportSize(0.02)
              }}
            />
            <UiEntity
              key={`${prefix}pagination_msg_modal_button_ok`}
              uiTransform={{
                width: sizer.viewportSize(0.06),
                height: sizer.viewportSize(0.04),
                margin: { top: sizer.viewportSize(0.01) }
              }}
              uiText={{ value: '<b>OK</b>', fontSize: sizer.viewportSize(0.015), color: Color4.White() }}
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
              onMouseDown={switchPaginationMsg}
            />
          </UiEntity>
        </UiEntity>
      </UiEntity>
    </UiEntity>
  )
}

export const toggleProposalModal = () => {
  if (isVisible.votingChoiceModal) isVisible.votingChoiceModal = false
  if (isVisible.teleportMap) isVisible.teleportMap = false
  if (votingData.selectedProposalDetails?.text) {
    votingData.selectedProposalDetails = { text: null }
  }
  getProposalDetails()
  if (!isVisible.proposalModal) {
    isVisible.proposalModal = true
  }
}
export const toggleProposalBoard = () => {
  if (isVisible.teleportMap) isVisible.teleportMap = false
  isVisible.proposalBoard = !isVisible.proposalBoard
}
const toggleVotingConfirmModal = () => (isVisible.votingConfirmModal = !isVisible.votingConfirmModal)
export const toggleVotingResultModal = (votingResult?: { isSuccess: boolean }) => {
  if (typeof votingResult === 'object' && 'isSuccess' in votingResult) votingData.votingResult = votingResult.isSuccess
  isVisible.votingResultModal = !isVisible.votingResultModal
}

const toggleVotingChoiceModal = () => {
  isVisible.votingChoiceModal = !isVisible.votingChoiceModal
}

const switchProposalsPage = (pageType: 'next' | 'prev'): void => {
  const { limit } = proposalFilterParams
  if (
    pageType === 'next' &&
    votingData.totalProposals &&
    votingData.totalProposals > limit + proposalFilterParams.offset
  ) {
    if (votingData.isBoardPageLoaded) proposalFilterParams.offset += limit
    getVotingData('board')
  } else if (pageType === 'prev' && proposalFilterParams.offset >= limit) {
    if (votingData.isBoardPageLoaded) proposalFilterParams.offset -= limit
    getVotingData('board')
  }
}

const switchPaginationMsg = () => {
  isVisible.paginationMsgInBoard = !isVisible.paginationMsgInBoard
}

const closeProposalModal = () => {
  votingData.selectedProposalDetails = { text: null }
  isVisible.proposalModal = false
}
