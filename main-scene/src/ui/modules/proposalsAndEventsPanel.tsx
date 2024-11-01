import ReactEcs, { Button, UiEntity } from '@dcl/sdk/react-ecs'
import { toggleProposalModal } from './votingMenu'
import { Sizer } from 'daohq-shared/Components/UiSizer/Sizer'
import {
  eventsData,
  IBookingInUiList,
  isVisible,
  proposalsAndEventsUiState,
  shortListFilterParams,
  teleportsData,
  votingData
} from '../../states/states'
import { getVotingData } from '../../scripts/getVotingData'
import { Color4 } from '@dcl/sdk/math'
import { movePlayerTo } from '~system/RestrictedActions'

export const proposalsAndEventsPanel = (): ReactEcs.JSX.Element => {
  const ratio = 6 / 1
  const sizer = new Sizer(ratio)
  const prefix = 'proposals_panel'
  let uiKeyCounter: number = 1
  return (
    <UiEntity
      key={`${prefix}${uiKeyCounter++}`}
      uiTransform={{
        width: sizer.viewportHeightSize(0.5),
        minHeight: sizer.viewportHeightSize(0.38),
        positionType: 'absolute',
        flexDirection: 'column',
        position: { bottom: sizer.viewportHeightSize(0.01), right: sizer.viewportHeightSize(0.01) },
        display: isVisible.proposalsAndEventsPanel ? 'flex' : 'none',
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
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{
          positionType: 'absolute',
          position: { top: 0, left: 0 },
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            width: '100%',
            height: sizer.viewportHeightSize(0.038),
            margin: { top: -sizer.viewportHeightSize(0.0378) }
          }}
        >
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '37%',
              height: '100%',
              margin: { left: '6%' }
            }}
            uiBackground={{
              textureMode: 'nine-slices',
              texture: {
                src: `images/ui/templates/${
                  proposalsAndEventsUiState.activeSection === 'proposals'
                    ? 'short_menu_white_action_template.png'
                    : 'short_menu_red_action_template.png'
                }`
              },
              textureSlices: {
                top: 0.12,
                bottom: 0.12,
                left: 0.12,
                right: 0.12
              }
            }}
            onMouseDown={() => switchActiveMenu('proposals')}
          >
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiText={{
                value: 'PROPOSALS',
                color: proposalsAndEventsUiState.activeSection === 'proposals' ? Color4.Black() : Color4.White(),
                fontSize: sizer.viewportHeightSize(0.018)
              }}
              uiTransform={{
                width: '100%',
                justifyContent: 'center',
                margin: { top: sizer.viewportHeightSize(0.008) }
              }}
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                positionType: 'absolute',
                position: { left: sizer.viewportHeightSize(0.003), bottom: -sizer.viewportHeightSize(0.004) },
                width: '96%',
                height: sizer.viewportHeightSize(0.008),
                display: proposalsAndEventsUiState.activeSection === 'proposals' ? 'flex' : 'none'
              }}
              uiBackground={{ color: Color4.White() }}
            />
          </UiEntity>
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '37%',
              height: '100%',
              margin: { left: '2%' }
            }}
            uiBackground={{
              textureMode: 'nine-slices',
              texture: {
                src: `images/ui/templates/${
                  proposalsAndEventsUiState.activeSection === 'events'
                    ? 'short_menu_white_action_template.png'
                    : 'short_menu_red_action_template.png'
                }`
              },
              textureSlices: {
                top: 0.12,
                bottom: 0.12,
                left: 0.12,
                right: 0.12
              }
            }}
            onMouseDown={() => switchActiveMenu('events')}
          >
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiText={{
                value: 'EVENTS',
                fontSize: sizer.viewportHeightSize(0.018),
                color: proposalsAndEventsUiState.activeSection === 'events' ? Color4.Black() : Color4.White()
              }}
              uiTransform={{
                width: '100%',
                height: 'auto',
                justifyContent: 'center',
                margin: { top: sizer.viewportHeightSize(0.008) }
              }}
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                positionType: 'absolute',
                position: { left: sizer.viewportHeightSize(0.003), bottom: -sizer.viewportHeightSize(0.004) },
                width: '96%',
                height: sizer.viewportHeightSize(0.008),
                display: proposalsAndEventsUiState.activeSection === 'events' ? 'flex' : 'none'
              }}
              uiBackground={{ color: Color4.White() }}
            />
          </UiEntity>
        </UiEntity>
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            width: sizer.viewportHeightSize(0.06),
            height: sizer.viewportHeightSize(0.038),
            margin: { top: -sizer.viewportHeightSize(0.0378), right: sizer.viewportHeightSize(0.024) },
            justifyContent: 'center',
            alignItems: 'center'
          }}
          uiBackground={{
            textureMode: 'nine-slices',
            texture: {
              src: 'images/ui/templates/short_menu_red_action_template.png'
            },
            textureSlices: {
              top: 0.12,
              bottom: 0.12,
              left: 0.12,
              right: 0.12
            }
          }}
          onMouseDown={switchProposalsAndEventsVisibility}
        >
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: sizer.viewportHeightSize(0.0145),
              height: sizer.viewportHeightSize(0.015)
            }}
            uiBackground={{
              textureMode: 'stretch',
              texture: {
                src: 'images/ui/templates/cross.png'
              }
            }}
          />
        </UiEntity>
      </UiEntity>
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{ flexDirection: 'column', margin: { top: sizer.viewportHeightSize(0.04) } }}
      >
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            display: proposalsAndEventsUiState.activeSection === 'proposals' ? 'flex' : 'none',
            flexDirection: 'column'
          }}
        >
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '94%',
              height: sizer.viewportHeightSize(0.0562),
              margin: {
                top: sizer.viewportHeightSize(0.005),
                right: sizer.viewportHeightSize(0.015),
                bottom: sizer.viewportHeightSize(0.005),
                left: sizer.viewportHeightSize(0.015)
              },
              padding: {
                top: 0,
                right: sizer.viewportHeightSize(0.005),
                bottom: sizer.viewportHeightSize(0.005),
                left: sizer.viewportHeightSize(0.015)
              },
              display: votingData.proposalsShortList === null ? 'flex' : 'none'
            }}
            uiText={{
              value: '<b>Loading Active Proposals...</b>',
              fontSize: sizer.viewportHeightSize(0.022),
              color: Color4.Black()
            }}
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '94%',
              height: sizer.viewportHeightSize(0.0562),
              margin: {
                top: sizer.viewportHeightSize(0.005),
                right: sizer.viewportHeightSize(0.015),
                bottom: sizer.viewportHeightSize(0.005),
                left: sizer.viewportHeightSize(0.015)
              },
              padding: {
                top: 0,
                right: sizer.viewportHeightSize(0.005),
                bottom: sizer.viewportHeightSize(0.005),
                left: sizer.viewportHeightSize(0.015)
              },
              display:
                votingData.proposalsShortList !== null && votingData.proposalsShortList.length === 0 ? 'flex' : 'none'
            }}
            uiText={{
              value: '<b>No active proposals</b>',
              fontSize: sizer.viewportHeightSize(0.022),
              color: Color4.Black()
            }}
          />
          {votingData.proposalsShortList?.map((proposal) => (
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: '94%',
                height: sizer.viewportHeightSize(0.0562),
                justifyContent: 'space-between',
                margin: {
                  top: sizer.viewportHeightSize(0.005),
                  right: sizer.viewportHeightSize(0.015),
                  bottom: sizer.viewportHeightSize(0.005),
                  left: sizer.viewportHeightSize(0.015)
                },
                padding: {
                  top: 0,
                  right: sizer.viewportHeightSize(0.005),
                  bottom: sizer.viewportHeightSize(0.005),
                  left: sizer.viewportHeightSize(0.015)
                },
                alignItems: 'center',
                pointerFilter: 'none'
              }}
              onMouseDown={() => {
                votingData.selectedProposal = proposal
                toggleProposalModal()
              }}
              uiBackground={{
                texture: { src: 'images/ui/templates/short_menu_item_template.png' },
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
                  width: sizer.viewportHeightSize(0.035),
                  height: sizer.viewportHeightSize(0.031),
                  margin: { top: sizer.viewportHeightSize(0.005), right: sizer.viewportHeightSize(0.01) }
                }}
                uiBackground={{
                  textureMode: 'stretch',
                  texture: {
                    src: `${
                      proposal.userData?.avatar?.snapshots.face256
                        ? proposal.userData.avatar.snapshots.face256
                        : proposal.userData === null
                        ? 'https://decentraland.org/images/male.png'
                        : 'images/ui/shortMenu/user_icon.png'
                    }`
                  }
                }}
              />
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{
                  width: '100%',
                  height: 'auto'
                }}
                uiText={{
                  value: `${
                    proposal.userData
                      ? `Proposal by <b>${proposal.userData.name}</b>`
                      : proposal.userData === null
                      ? `Proposal by <b>${proposal.user.slice(0, 6)}...${proposal.user.slice(
                          proposal.user.length - 4
                        )}</b>`
                      : 'loading...'
                  }`,
                  fontSize: sizer.viewportHeightSize(0.018),
                  color: Color4.Black(),
                  textAlign: 'top-center'
                }}
              />
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{
                  width: sizer.viewportHeightSize(0.04),
                  height: sizer.viewportHeightSize(0.03),
                  margin: { top: sizer.viewportHeightSize(0.01), right: sizer.viewportHeightSize(0.01) }
                }}
                uiBackground={{
                  textureMode: 'stretch',
                  texture: {
                    src: 'images/ui/shortMenu/pointer.png'
                  }
                }}
              />
            </UiEntity>
          ))}
        </UiEntity>
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            display: proposalsAndEventsUiState.activeSection === 'events' ? 'flex' : 'none',
            flexDirection: 'column'
          }}
        >
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '94%',
              height: sizer.viewportHeightSize(0.0562),
              margin: {
                top: sizer.viewportHeightSize(0.005),
                right: sizer.viewportHeightSize(0.015),
                bottom: sizer.viewportHeightSize(0.005),
                left: sizer.viewportHeightSize(0.015)
              },
              padding: {
                top: 0,
                right: sizer.viewportHeightSize(0.005),
                bottom: sizer.viewportHeightSize(0.005),
                left: sizer.viewportHeightSize(0.015)
              },
              display: eventsData.liveEvents === null ? 'flex' : 'none'
            }}
            uiText={{
              value: '<b>Loading Live Events...</b>',
              fontSize: sizer.viewportHeightSize(0.022),
              color: Color4.Black()
            }}
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '94%',
              height: sizer.viewportHeightSize(0.0562),
              margin: {
                top: sizer.viewportHeightSize(0.005),
                right: sizer.viewportHeightSize(0.015),
                bottom: sizer.viewportHeightSize(0.005),
                left: sizer.viewportHeightSize(0.015)
              },
              padding: {
                top: 0,
                right: sizer.viewportHeightSize(0.005),
                bottom: sizer.viewportHeightSize(0.005),
                left: sizer.viewportHeightSize(0.015)
              },
              display: eventsData.liveEvents !== null && eventsData.liveEvents.length === 0 ? 'flex' : 'none'
            }}
            uiText={{
              value: '<b>No live events</b>',
              fontSize: sizer.viewportHeightSize(0.022),
              color: Color4.Black()
            }}
          />
          {eventsData.liveEvents?.map((event) => (
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: '94%',
                height: sizer.viewportHeightSize(0.0562),
                justifyContent: 'space-between',
                margin: {
                  top: sizer.viewportHeightSize(0.005),
                  right: sizer.viewportHeightSize(0.015),
                  bottom: sizer.viewportHeightSize(0.005),
                  left: sizer.viewportHeightSize(0.015)
                },
                padding: {
                  top: 0,
                  right: sizer.viewportHeightSize(0.005),
                  bottom: sizer.viewportHeightSize(0.005),
                  left: sizer.viewportHeightSize(0.015)
                }
              }}
              uiBackground={{
                texture: { src: 'images/ui/templates/short_menu_item_template.png' },
                textureMode: 'nine-slices',
                textureSlices: {
                  top: 0.12,
                  bottom: 0.12,
                  left: 0.12,
                  right: 0.12
                }
              }}
              onMouseDown={() => teleportToLiveEventRoom(event)}
            >
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{
                  width: sizer.viewportHeightSize(0.041),
                  height: sizer.viewportHeightSize(0.035),
                  alignSelf: 'center',
                  margin: { top: sizer.viewportHeightSize(0.01), right: sizer.viewportHeightSize(0.01) }
                }}
                uiBackground={{
                  textureMode: 'stretch',
                  texture: {
                    src: `${event.preview ? event.preview : 'images/ui/shortMenu/event_icon.png'}`
                  }
                }}
              />
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{
                  width: '100%',
                  height: 'auto',
                  padding: { top: sizer.viewportHeightSize(0.01) }
                }}
                uiText={{
                  value: `${
                    event.userData ? `By <b>${event.userData.name}</b> in <b>${event.location}</b>` : 'loading...'
                  }`,
                  fontSize: sizer.viewportHeightSize(0.018),
                  color: Color4.Black(),
                  textAlign: 'top-center'
                }}
              />
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{
                  width: sizer.viewportHeightSize(0.04),
                  height: sizer.viewportHeightSize(0.03),
                  margin: { top: sizer.viewportHeightSize(0.01), right: sizer.viewportHeightSize(0.01) }
                }}
                uiBackground={{
                  textureMode: 'stretch',
                  texture: {
                    src: 'images/ui/shortMenu/pointer.png'
                  }
                }}
              />
            </UiEntity>
          ))}
        </UiEntity>
      </UiEntity>
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{
          positionType: 'absolute',
          position: { bottom: sizer.viewportHeightSize(0.04), left: 0 },
          width: '100%',
          justifyContent: 'center',
          display:
            proposalsAndEventsUiState.activeSection === 'proposals' && votingData.proposalsShortList?.length
              ? 'flex'
              : 'none'
        }}
      >
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{ width: sizer.viewportHeightSize(0.1), justifyContent: 'center', alignItems: 'center' }}
        >
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              height: sizer.viewportHeightSize(0.03),
              width: sizer.viewportHeightSize(0.03),
              alignItems: 'center',
              display: votingData.totalShortListProposals && shortListFilterParams.offset ? 'flex' : 'none',
              margin: { right: sizer.viewportHeightSize(0.03) },
              positionType: 'absolute',
              position: { left: 0 },
              justifyContent: 'center'
            }}
            onMouseDown={() => switchProposalItems('prev')}
          >
            <Button
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                height: sizer.viewportHeightSize(0.012),
                width: sizer.viewportHeightSize(0.01)
              }}
              value=""
              variant="secondary"
              uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/shortMenu/prev.png' } }}
            />
          </UiEntity>
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              height: sizer.viewportHeightSize(0.03),
              width: sizer.viewportHeightSize(0.03),
              alignItems: 'center',
              justifyContent: 'center'
            }}
            uiBackground={{
              texture: { src: 'images/ui/templates/red_rectangle_template.png' },
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
              uiTransform={{ margin: { left: sizer.viewportHeightSize(0.0035) } }}
              uiText={{
                value: `<b>${shortListFilterParams.offset / shortListFilterParams.limit + 1}</b>`,
                color: Color4.White(),
                fontSize: sizer.viewportHeightSize(0.015)
              }}
            />
          </UiEntity>
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              height: sizer.viewportHeightSize(0.03),
              width: sizer.viewportHeightSize(0.03),
              alignItems: 'center',
              display:
                votingData.totalShortListProposals &&
                votingData.totalShortListProposals > shortListFilterParams.limit + shortListFilterParams.offset
                  ? 'flex'
                  : 'none',
              margin: { left: sizer.viewportHeightSize(0.03) },
              positionType: 'absolute',
              position: { right: 0 },
              justifyContent: 'center'
            }}
            onMouseDown={() => switchProposalItems('next')}
          >
            <Button
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                height: sizer.viewportHeightSize(0.012),
                width: sizer.viewportHeightSize(0.01)
              }}
              value=""
              variant="secondary"
              uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/shortMenu/next.png' } }}
            />
          </UiEntity>
        </UiEntity>
      </UiEntity>
      <UiEntity
        key={`${prefix}pagination_modal${uiKeyCounter++}`}
        uiTransform={{
          positionType: 'absolute',
          position: { top: '30%', right: '25%', bottom: '30%', left: '25%' },
          flexDirection: 'column',
          alignItems: 'center',
          display: isVisible.paginationMsgInShotMenu ? 'flex' : 'none'
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
          key={`${prefix}${uiKeyCounter++}`}
          uiText={{
            value: '<b>Wait for the previous page to load</b>',
            color: Color4.Black(),
            fontSize: sizer.viewportHeightSize(0.018)
          }}
          uiTransform={{ margin: { top: sizer.viewportHeightSize(0.015) }, padding: sizer.viewportHeightSize(0.01) }}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            width: sizer.viewportHeightSize(0.045),
            height: sizer.viewportHeightSize(0.035),
            margin: { top: sizer.viewportSize(0.004), left: sizer.viewportSize(0.003) }
          }}
          uiText={{ value: '<b>OK</b>', fontSize: sizer.viewportHeightSize(0.015), color: Color4.White() }}
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
  )
}

const switchProposalItems = async (groupType: 'next' | 'prev') => {
  if (votingData.isShortListLoaded) {
    votingData.isShortListLoaded = false
    const { limit } = shortListFilterParams
    if (groupType === 'next') {
      shortListFilterParams.offset += limit
      await getVotingData('shortList')
      votingData.isShortListLoaded = true
    } else if (groupType === 'prev') {
      shortListFilterParams.offset -= limit
      await getVotingData('shortList')
      votingData.isShortListLoaded = true
    }
  } else {
    if (!isVisible.paginationMsgInShotMenu) switchPaginationMsg()
  }
}

export const switchProposalsAndEventsVisibility = () => {
  isVisible.proposalsAndEventsPanel = !isVisible.proposalsAndEventsPanel
}

const switchActiveMenu = (activeSection: 'proposals' | 'events') => {
  proposalsAndEventsUiState.activeSection = activeSection
}

const switchPaginationMsg = () => {
  isVisible.paginationMsgInShotMenu = !isVisible.paginationMsgInShotMenu
}

const teleportToLiveEventRoom = (event: IBookingInUiList) => {
  for (let telItemKey in teleportsData) {
    const teleportDataItem = teleportsData[telItemKey as keyof typeof teleportsData]
    if (
      teleportDataItem.locationId &&
      (event.location === teleportDataItem.locationId || event.location.startsWith(teleportDataItem.locationId))
    ) {
      if (teleportDataItem.coords.roomPoint && teleportDataItem.coords.lookAt)
        movePlayerTo({
          newRelativePosition: teleportDataItem.coords.roomPoint,
          cameraTarget: teleportDataItem.coords.lookAt
        })
    }
  }
}
