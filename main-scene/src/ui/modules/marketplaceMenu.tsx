import ReactEcs, { Button, Dropdown, Input, Label, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { putOnWearables } from '../../scene/setupMarketplace'
import { filterWearablesParams, paginationMarketParams } from '../../states/states'
import { WearableCategory } from '@dcl/schemas'
import { isVisible } from '../../states/states'
import { Rarity } from '@dcl/schemas/dist/index'
import { CatalogSortBy } from '@dcl/schemas/dist/dapps/catalog'
import { mannequins } from '../../states/states'
import { openExternalUrl } from '~system/RestrictedActions'
import { Sizer } from 'daohq-shared/Components/UiSizer/Sizer'
import { WearableItem } from 'daohq-shared/marketplaceClient'

export enum NPC_MENU_ENUM {
  FILTER = 'filter',
  SORT_BY = 'sort_by',
  WEARABLE = 'wearable'
}

const categoryValues: string[] = [
  'All',
  'Skin',
  'Earring',
  'Eyebrows',
  'Eyes',
  'EyeWear',
  'Facial hair',
  'Feet',
  'Hair',
  'Hands wear',
  'Hat',
  'Helmet',
  'Lower body',
  'Mask',
  'Mouth',
  'Tiara',
  'Top head',
  'Upper body'
]

const rarityValues: string[] = ['All', 'Epic', 'Common', 'Legendary', 'Mythic', 'Rare', 'Uncommon', 'Unique']

const simpleBooleanValues: string[] = ['All', 'Yes', 'No']

const sortByValues: string[] = ['Newest', 'Most Expensive', 'Cheapest', 'Recently Listed', 'Recently Sold']

const categoryOption = (index: number): void => {
  switch (index) {
    case 0:
      filterWearablesParams.category = undefined
      break
    case 1:
      filterWearablesParams.category = WearableCategory.SKIN
      break
    case 2:
      filterWearablesParams.category = WearableCategory.EARRING
      break
    case 3:
      filterWearablesParams.category = WearableCategory.EYEBROWS
      break
    case 4:
      filterWearablesParams.category = WearableCategory.EYES
      break
    case 5:
      filterWearablesParams.category = WearableCategory.EYEWEAR
      break
    case 6:
      filterWearablesParams.category = WearableCategory.FACIAL_HAIR
      break
    case 7:
      filterWearablesParams.category = WearableCategory.FEET
      break
    case 8:
      filterWearablesParams.category = WearableCategory.HAIR
      break
    case 9:
      filterWearablesParams.category = WearableCategory.HANDS_WEAR
      break
    case 10:
      filterWearablesParams.category = WearableCategory.HAT
      break
    case 11:
      filterWearablesParams.category = WearableCategory.HELMET
      break
    case 12:
      filterWearablesParams.category = WearableCategory.LOWER_BODY
      break
    case 13:
      filterWearablesParams.category = WearableCategory.MASK
      break
    case 14:
      filterWearablesParams.category = WearableCategory.MOUTH
      break
    case 15:
      filterWearablesParams.category = WearableCategory.TIARA
      break
    case 16:
      filterWearablesParams.category = WearableCategory.TOP_HEAD
      break
    case 17:
      filterWearablesParams.category = WearableCategory.UPPER_BODY
      break
    default:
      filterWearablesParams.category = undefined
  }
}

const rarityOption = (index: number): void => {
  switch (index) {
    case 0:
      filterWearablesParams.rarity = undefined
      break
    case 1:
      filterWearablesParams.rarity = [Rarity.EPIC]
      break
    case 2:
      filterWearablesParams.rarity = [Rarity.COMMON]
      break
    case 3:
      filterWearablesParams.rarity = [Rarity.LEGENDARY]
      break
    case 4:
      filterWearablesParams.rarity = [Rarity.MYTHIC]
      break
    case 5:
      filterWearablesParams.rarity = [Rarity.RARE]
      break
    case 6:
      filterWearablesParams.rarity = [Rarity.UNCOMMON]
      break
    case 7:
      filterWearablesParams.rarity = [Rarity.UNIQUE]
      break
    default:
      filterWearablesParams.rarity = undefined
  }
}

const wearableSmartOption = (index: number): void => {
  switch (index) {
    case 0:
      filterWearablesParams.isWearableSmart = undefined
      break
    case 1:
      filterWearablesParams.isWearableSmart = true
      break
    case 2:
      filterWearablesParams.isWearableSmart = false
      break
    default:
      filterWearablesParams.isWearableSmart = undefined
  }
}

const isOnSaleOption = (index: number): void => {
  switch (index) {
    case 0:
      filterWearablesParams.isOnSale = undefined
      break
    case 1:
      filterWearablesParams.isOnSale = true
      break
    case 2:
      filterWearablesParams.isOnSale = false
      break
    default:
      filterWearablesParams.isOnSale = undefined
  }
}

const onlyMintingOption = (index: number): void => {
  switch (index) {
    case 0:
      filterWearablesParams.onlyMinting = undefined
      break
    case 1:
      filterWearablesParams.onlyMinting = true
      break
    case 2:
      filterWearablesParams.onlyMinting = false
      break
    default:
      filterWearablesParams.onlyMinting = undefined
  }
}

const onlyListingOption = (index: number): void => {
  switch (index) {
    case 0:
      filterWearablesParams.onlyListing = undefined
      break
    case 1:
      filterWearablesParams.onlyListing = true
      break
    case 2:
      filterWearablesParams.onlyListing = false
      break
    default:
      filterWearablesParams.onlyListing = undefined
  }
}

const sortByOption = (index: number): void => {
  switch (index) {
    case 0:
      filterWearablesParams.sortBy = CatalogSortBy.NEWEST
      break
    case 1:
      filterWearablesParams.sortBy = CatalogSortBy.MOST_EXPENSIVE
      break
    case 2:
      filterWearablesParams.sortBy = CatalogSortBy.CHEAPEST
      break
    case 3:
      filterWearablesParams.sortBy = CatalogSortBy.RECENTLY_LISTED
      break
    case 4:
      filterWearablesParams.sortBy = CatalogSortBy.RECENTLY_SOLD
      break
    default:
      filterWearablesParams.sortBy = CatalogSortBy.NEWEST
  }
}

const getWearableBgPath = (rarity: string | undefined) => {
  let path: string = 'images/ui/marketplace/wearables_bg/'
  if (!rarity) return path.concat('common.png')
  if (rarity === 'epic') path = path.concat('epic.png')
  if (rarity === 'common') path = path.concat('common.png')
  if (rarity === 'legendary') path = path.concat('legendary.png')
  if (rarity === 'mythic') path = path.concat('mythic.png')
  if (rarity === 'rare') path = path.concat('rare.png')
  if (rarity === 'uncommon') path = path.concat('uncommon.png')
  if (rarity === 'unique') path = path.concat('unique.png')
  if (rarity === 'exotic') path = path.concat('exotic.png')
  return path
}

const getCorrectPriceFormat = (price: string | undefined): string => {
  let formattedPrice: string = ''
  if (price && price.length > 18) {
    formattedPrice = price.slice(0, price.length - 18).concat('.', price.slice(price.length - 18))
  }
  formattedPrice = (Math.round(+formattedPrice * 100) / 100).toString()
  return formattedPrice
}

export const npcFilterMenu = (): ReactEcs.JSX.Element => {
  const ratioBySort = 4 / 2.5
  const ratioFilter = 1.2 / 1
  const sizerBySort = new Sizer(ratioBySort)
  const sizerFilter = new Sizer(ratioFilter)
  const prefix = 'filter_menu'
  let uiKeyCounter: number = 1
  return (
    <UiEntity
      key={`${prefix}${uiKeyCounter++}`}
      uiTransform={{
        positionType: 'absolute',
        position: { top: 0, right: 0, bottom: 0, left: 0 },
        flexDirection: 'column',
        justifyContent: 'center',
        display: isVisible.npcFilterMenu || isVisible.npcSortByMenu ? 'flex' : 'none'
      }}
    >
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{
          width: isVisible.npcSortByMenu ? sizerBySort.viewportHeightSize(0.45) : sizerFilter.viewportHeightSize(0.58),
          height: isVisible.npcSortByMenu
            ? sizerBySort.viewportHeightSize(0.285)
            : sizerFilter.viewportHeightSize(0.54),
          justifyContent: 'center',
          alignSelf: 'center',
          flexDirection: 'column',
          pointerFilter: 'block'
        }}
      >
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{
            height: '100%',
            width: '100%',
            flexDirection: 'column',
            alignSelf: 'center',
            padding: {
              top: sizerFilter.viewportHeightSize(0.03),
              right: sizerFilter.viewportHeightSize(0.04),
              left: sizerFilter.viewportHeightSize(0.04)
            }
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
              width: sizerFilter.viewportHeightSize(0.035),
              height: sizerFilter.viewportHeightSize(0.034),
              positionType: 'absolute',
              position: { right: sizerFilter.viewportHeightSize(0.03), top: sizerFilter.viewportHeightSize(0.03) }
            }}
            uiBackground={{ textureMode: 'stretch', texture: { src: 'images/ui/templates/btn_close.png' } }}
            onMouseDown={() => closeAllMenus()}
          />
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              width: '100%',
              height: '100%',
              display: isVisible.npcFilterMenu ? 'flex' : 'none',
              justifyContent: 'center',
              alignSelf: 'center',
              flexDirection: 'column'
            }}
          >
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: '100%',
                height: sizerFilter.viewportHeightSize(0.04),
                alignSelf: 'center'
              }}
              uiText={{
                value: '<b>Filtering Settings</b>',
                fontSize: sizerFilter.viewportHeightSize(0.021),
                color: Color4.Black(),
                textAlign: 'middle-left'
              }}
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: '90%',
                height: sizerFilter.viewportHeightSize(0.002)
              }}
              uiBackground={{ texture: { src: 'images/ui/templates/red_line.png' }, textureMode: 'stretch' }}
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: '100%',
                height: '100%',
                justifyContent: 'flex-start'
              }}
            >
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  width: sizerFilter.viewportHeightSize(0.205),
                  height: '100%',
                  margin: { top: sizerFilter.viewportHeightSize(0.01), right: sizerFilter.viewportHeightSize(0.04) }
                }}
              >
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: '100%',
                    flexDirection: 'column',
                    margin: { top: sizerFilter.viewportHeightSize(0.006) }
                  }}
                >
                  <Label
                    key={`${prefix}${uiKeyCounter++}`}
                    value="Category"
                    fontSize={sizerFilter.viewportHeightSize(0.016)}
                    color={Color4.Black()}
                    uiTransform={{
                      maxHeight: sizerFilter.viewportHeightSize(0.03)
                    }}
                  />
                  <Dropdown
                    key={`${prefix}${uiKeyCounter++}`}
                    fontSize={sizerFilter.viewportHeightSize(0.018)}
                    options={categoryValues}
                    onChange={categoryOption}
                    uiTransform={{
                      width: '100%',
                      height: sizerFilter.viewportHeightSize(0.051)
                    }}
                  />
                </UiEntity>
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: '100%',
                    flexDirection: 'column',
                    margin: { top: sizerFilter.viewportHeightSize(0.006) }
                  }}
                >
                  <Label
                    key={`${prefix}${uiKeyCounter++}`}
                    value="Rarity"
                    fontSize={sizerFilter.viewportHeightSize(0.016)}
                    color={Color4.Black()}
                    uiTransform={{ maxHeight: sizerFilter.viewportHeightSize(0.03) }}
                  />
                  <Dropdown
                    key={`${prefix}${uiKeyCounter++}`}
                    fontSize={sizerFilter.viewportHeightSize(0.018)}
                    options={rarityValues}
                    onChange={rarityOption}
                    uiTransform={{
                      width: '100%',
                      height: sizerFilter.viewportHeightSize(0.051)
                    }}
                  />
                </UiEntity>
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: '100%',
                    flexDirection: 'column',
                    margin: { top: sizerFilter.viewportHeightSize(0.006) }
                  }}
                >
                  <Label
                    key={`${prefix}${uiKeyCounter++}`}
                    value="Is Wearable Smart"
                    fontSize={sizerFilter.viewportHeightSize(0.016)}
                    color={Color4.Black()}
                    uiTransform={{ maxHeight: sizerFilter.viewportHeightSize(0.03) }}
                  />
                  <Dropdown
                    key={`${prefix}${uiKeyCounter++}`}
                    fontSize={sizerFilter.viewportHeightSize(0.018)}
                    options={simpleBooleanValues}
                    onChange={wearableSmartOption}
                    uiTransform={{
                      width: '100%',
                      height: sizerFilter.viewportHeightSize(0.051)
                    }}
                  />
                </UiEntity>
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: '100%',
                    flexDirection: 'column',
                    margin: { top: sizerFilter.viewportHeightSize(0.006) }
                  }}
                >
                  <Label
                    key={`${prefix}${uiKeyCounter++}`}
                    value="Is On Sale"
                    fontSize={sizerFilter.viewportHeightSize(0.016)}
                    color={Color4.Black()}
                    uiTransform={{ maxHeight: sizerFilter.viewportHeightSize(0.03) }}
                  />
                  <Dropdown
                    key={`${prefix}${uiKeyCounter++}`}
                    fontSize={sizerFilter.viewportHeightSize(0.018)}
                    options={simpleBooleanValues}
                    onChange={isOnSaleOption}
                    uiTransform={{
                      width: '100%',
                      height: sizerFilter.viewportHeightSize(0.051)
                    }}
                  />
                </UiEntity>
              </UiEntity>
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  width: sizerFilter.viewportHeightSize(0.205),
                  height: '100%',
                  margin: { top: sizerFilter.viewportHeightSize(0.01) }
                }}
              >
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: '100%',
                    flexDirection: 'column',
                    margin: { top: sizerFilter.viewportHeightSize(0.006) }
                  }}
                >
                  <Label
                    key={`${prefix}${uiKeyCounter++}`}
                    value="Only Minting"
                    fontSize={sizerFilter.viewportHeightSize(0.016)}
                    color={Color4.Black()}
                    uiTransform={{ maxHeight: sizerFilter.viewportHeightSize(0.03) }}
                  />
                  <Dropdown
                    key={`${prefix}${uiKeyCounter++}`}
                    fontSize={sizerFilter.viewportHeightSize(0.018)}
                    options={simpleBooleanValues}
                    onChange={onlyMintingOption}
                    uiTransform={{
                      width: '100%',
                      height: sizerFilter.viewportHeightSize(0.051)
                    }}
                  />
                </UiEntity>
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: '100%',
                    flexDirection: 'column',
                    margin: { top: sizerFilter.viewportHeightSize(0.006) }
                  }}
                >
                  <Label
                    key={`${prefix}${uiKeyCounter++}`}
                    value="Only Listing"
                    fontSize={sizerFilter.viewportHeightSize(0.016)}
                    color={Color4.Black()}
                    uiTransform={{ maxHeight: sizerFilter.viewportHeightSize(0.03) }}
                  />
                  <Dropdown
                    key={`${prefix}${uiKeyCounter++}`}
                    fontSize={sizerFilter.viewportHeightSize(0.018)}
                    options={simpleBooleanValues}
                    onChange={onlyListingOption}
                    uiTransform={{
                      width: '100%',
                      height: sizerFilter.viewportHeightSize(0.051)
                    }}
                  />
                </UiEntity>
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    width: '100%',
                    flexDirection: 'column',
                    margin: { top: sizerFilter.viewportHeightSize(0.006) }
                  }}
                >
                  <Label
                    key={`${prefix}${uiKeyCounter++}`}
                    value="Pricing"
                    fontSize={sizerFilter.viewportHeightSize(0.016)}
                    color={Color4.Black()}
                    uiTransform={{
                      width: '100%',
                      height: sizerFilter.viewportHeightSize(0.038),
                      margin: { bottom: -sizerFilter.viewportHeightSize(0.005) }
                    }}
                    textAlign="middle-left"
                  />
                  <UiEntity
                    key={`${prefix}${uiKeyCounter++}`}
                    uiTransform={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Input
                      key={`${prefix}${uiKeyCounter++}`}
                      onChange={(value) => (filterWearablesParams.minPrice = value)}
                      fontSize={sizerFilter.viewportHeightSize(0.017)}
                      placeholder={'min'}
                      placeholderColor={Color4.Black()}
                      uiTransform={{
                        width: '50%',
                        height: '100%',
                        margin: { right: '5%' },
                        maxHeight: sizerFilter.viewportHeightSize(0.051)
                      }}
                    />
                    <Input
                      key={`${prefix}${uiKeyCounter++}`}
                      onChange={(value: string): string => (filterWearablesParams.maxPrice = value)}
                      fontSize={sizerFilter.viewportHeightSize(0.017)}
                      placeholder={'max'}
                      placeholderColor={Color4.Black()}
                      uiTransform={{
                        width: '50%',
                        height: '100%',
                        maxHeight: sizerFilter.viewportHeightSize(0.051)
                      }}
                    />
                  </UiEntity>
                </UiEntity>
              </UiEntity>
            </UiEntity>
          </UiEntity>
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              flexDirection: 'column',
              display: isVisible.npcSortByMenu ? 'flex' : 'none',
              width: '100%',
              height: '100%'
            }}
          >
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: '100%',
                height: sizerBySort.viewportHeightSize(0.04),
                alignSelf: 'center',
                margin: {
                  left: -sizerBySort.viewportHeightSize(0.01)
                }
              }}
              uiText={{
                value: '<b>Sorting Settings</b>',
                fontSize: sizerBySort.viewportHeightSize(0.021),
                color: Color4.Black(),
                textAlign: 'middle-left'
              }}
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: '88%',
                height: sizerBySort.viewportHeightSize(0.002)
              }}
              uiBackground={{ texture: { src: 'images/ui/templates/red_line.png' }, textureMode: 'stretch' }}
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: '100%',
                flexDirection: 'column',
                margin: { top: sizerBySort.viewportHeightSize(0.015) }
              }}
            >
              <Label
                key={`${prefix}${uiKeyCounter++}`}
                value="Sort By"
                fontSize={sizerBySort.viewportHeightSize(0.016)}
                color={Color4.Black()}
                uiTransform={{ maxHeight: sizerBySort.viewportHeightSize(0.03) }}
              />
              <Dropdown
                key={`${prefix}${uiKeyCounter++}`}
                fontSize={sizerBySort.viewportHeightSize(0.018)}
                options={sortByValues}
                onChange={sortByOption}
                uiTransform={{
                  width: '70%',
                  height: sizerBySort.viewportHeightSize(0.051)
                }}
              />
            </UiEntity>
          </UiEntity>
          <Button
            key={`${prefix}${uiKeyCounter++}`}
            value="SHOW WEARABLES"
            variant="secondary"
            fontSize={sizerFilter.viewportHeightSize(0.018)}
            uiTransform={{
              width: isVisible.npcSortByMenu
                ? sizerFilter.viewportHeightSize(0.33)
                : sizerFilter.viewportHeightSize(0.21),
              height: sizerFilter.viewportHeightSize(0.05),
              positionType: 'absolute',
              position: { bottom: sizerFilter.viewportHeightSize(0.038), left: sizerFilter.viewportHeightSize(0.038) }
            }}
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
              closeAllMenus()
              paginationMarketParams.skip = 0
              putOnWearables()
            }}
          />
        </UiEntity>
      </UiEntity>
    </UiEntity>
  )
}

export const wearableDescriptionMenu = (): ReactEcs.JSX.Element => {
  const ratio = 2.1 / 1
  const sizer = new Sizer(ratio)
  const prefix = 'wearable_description'
  let uiKeyCounter: number = 1
  return (
    <UiEntity
      key={`${prefix}${uiKeyCounter++}`}
      uiTransform={{
        positionType: 'absolute',
        position: { top: 0, right: 0, bottom: '2%', left: 0 },
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        display: isVisible.wearableDescriptionMenu ? 'flex' : 'none'
      }}
    >
      <UiEntity
        key={`${prefix}${uiKeyCounter++}`}
        uiTransform={{
          width: sizer.viewportHeightSize(0.82),
          height: sizer.viewportHeightSize(0.38),
          flexDirection: 'column',
          padding: sizer.viewportHeightSize(0.03),
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
            width: sizer.viewportHeightSize(0.034),
            height: sizer.viewportHeightSize(0.035),
            positionType: 'absolute',
            position: { right: sizer.viewportHeightSize(0.035), top: sizer.viewportHeightSize(0.035) }
          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: { src: 'images/ui/templates/btn_close.png' }
          }}
          color={Color4.White()}
          onMouseDown={() => toggleNpcMenuVisibility(NPC_MENU_ENUM.WEARABLE)}
        />
        <UiEntity
          key={`${prefix}${uiKeyCounter++}`}
          uiTransform={{ width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{ width: sizer.viewportHeightSize(0.55), height: '100%' }}
            uiBackground={{
              textureMode: 'stretch',
              texture: { src: getWearableBgPath(mannequins.wearableForDescr?.rarity) }
            }}
          >
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                positionType: 'absolute',
                position: { top: '6%', right: '6%', bottom: '6%', left: '6%' }
              }}
              uiBackground={{
                textureMode: 'stretch',
                texture: {
                  src:
                    typeof mannequins.wearableForDescr?.thumbnail === 'string'
                      ? mannequins.wearableForDescr?.thumbnail
                      : ''
                }
              }}
            />
          </UiEntity>
          <UiEntity
            key={`${prefix}${uiKeyCounter++}`}
            uiTransform={{
              flexDirection: 'column',
              margin: { left: sizer.viewportHeightSize(0.027) },
              width: '100%',
              height: '100%'
            }}
          >
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: '100%',
                height: 'auto',
                padding: { right: sizer.viewportHeightSize(0.05) }
              }}
              uiText={{
                value: `${
                  mannequins.wearableForDescr?.name
                    ? `<b>${mannequins.wearableForDescr.name}</b>`
                    : '<b>No wearable name</b>'
                }`,
                color: Color4.Black(),
                fontSize: sizer.viewportHeightSize(0.02),
                textAlign: 'middle-left'
              }}
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                width: '83%',
                height: sizer.viewportHeightSize(0.002),
                margin: { left: sizer.viewportHeightSize(0.003) }
              }}
              uiBackground={{ texture: { src: 'images/ui/templates/red_line.png' }, textureMode: 'stretch' }}
            />
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                margin: { top: sizer.viewportHeightSize(0.015), right: sizer.viewportHeightSize(0.05) },
                maxHeight: sizer.viewportHeightSize(0.053)
              }}
            >
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{ minWidth: sizer.viewportHeightSize(0.12) }}
                uiText={{
                  value: `Collection`,
                  color: Color4.Black(),
                  fontSize: sizer.viewportHeightSize(0.0145),
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiText={{
                  value: `<b>${
                    mannequins.wearableForDescr?.collectionName
                      ? mannequins.wearableForDescr.collectionName
                      : 'No collection'
                  }</b>`,
                  color: Color4.Black(),
                  fontSize: sizer.viewportHeightSize(0.0145),
                  textAlign: 'middle-left'
                }}
              />
            </UiEntity>
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                margin: { right: sizer.viewportHeightSize(0.05) },
                maxHeight: sizer.viewportHeightSize(0.053)
              }}
            >
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{ minWidth: sizer.viewportHeightSize(0.12) }}
                uiText={{
                  value: `Description`,
                  color: Color4.Black(),
                  fontSize: sizer.viewportHeightSize(0.0145),
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiText={{
                  value: `<b>${getDescription(mannequins.wearableForDescr)}</b>`,
                  color: Color4.Black(),
                  fontSize: sizer.viewportHeightSize(0.0145),
                  textAlign: 'middle-left'
                }}
              />
            </UiEntity>
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                maxHeight: sizer.viewportHeightSize(0.022),
                margin: { right: sizer.viewportHeightSize(0.05) }
              }}
            >
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{ minWidth: sizer.viewportHeightSize(0.12) }}
                uiText={{
                  value: `Creator`,
                  color: Color4.Black(),
                  fontSize: sizer.viewportHeightSize(0.0145),
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiText={{
                  value: `<b>${
                    mannequins.wearableForDescr?.creatorName
                      ? `${mannequins.wearableForDescr?.creatorName}`
                      : 'no creator name'
                  }</b>`,
                  color: Color4.Black(),
                  fontSize: sizer.viewportHeightSize(0.0145),
                  textAlign: 'middle-left'
                }}
              />
            </UiEntity>
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                maxHeight: sizer.viewportHeightSize(0.022),
                margin: { right: sizer.viewportHeightSize(0.05) }
              }}
            >
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{ minWidth: sizer.viewportHeightSize(0.12) }}
                uiText={{
                  value: `Rarity`,
                  color: Color4.Black(),
                  fontSize: sizer.viewportHeightSize(0.0145),
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiText={{
                  value: `<b>${
                    mannequins.wearableForDescr?.rarity ? mannequins.wearableForDescr?.rarity : 'no rarity'
                  }</b>`,
                  color: Color4.Black(),
                  fontSize: sizer.viewportHeightSize(0.0145),
                  textAlign: 'middle-left'
                }}
              />
            </UiEntity>
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                maxHeight: sizer.viewportHeightSize(0.022),
                margin: { right: sizer.viewportHeightSize(0.05) }
              }}
            >
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiTransform={{ minWidth: sizer.viewportHeightSize(0.12) }}
                uiText={{
                  value: `Category`,
                  color: Color4.Black(),
                  fontSize: sizer.viewportHeightSize(0.0145),
                  textAlign: 'middle-left'
                }}
              />
              <UiEntity
                key={`${prefix}${uiKeyCounter++}`}
                uiText={{
                  value: `<b>${getCategory(mannequins.wearableForDescr)}</b>`,
                  color: Color4.Black(),
                  fontSize: sizer.viewportHeightSize(0.0145),
                  textAlign: 'middle-left'
                }}
              />
            </UiEntity>
            <UiEntity
              key={`${prefix}${uiKeyCounter++}`}
              uiTransform={{
                justifyContent: 'space-between',
                margin: { top: sizer.viewportHeightSize(0.004), right: sizer.viewportHeightSize(0.07) }
              }}
            >
              <UiEntity key={`${prefix}${uiKeyCounter++}`} uiTransform={{ flexDirection: 'column' }}>
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiText={{
                    value: mannequins.wearableForDescr?.minPrice
                      ? `<color #FA2B54><b>${getCorrectPriceFormat(
                          +mannequins.wearableForDescr.price !== 0
                            ? mannequins.wearableForDescr.price
                            : mannequins.wearableForDescr.minPrice
                        )} MANA</b></color>`
                      : '<color #FA2B54><b>no price</b></color>',
                    color: Color4.Black(),
                    fontSize: sizer.viewportHeightSize(0.018)
                  }}
                />
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    maxHeight: sizer.viewportHeightSize(0.002),
                    margin: { top: -sizer.viewportHeightSize(0.002) }
                  }}
                  uiText={{ value: 'Price', fontSize: sizer.viewportHeightSize(0.013), color: Color4.Black() }}
                />
              </UiEntity>
              <UiEntity key={`${prefix}${uiKeyCounter++}`} uiTransform={{ flexDirection: 'column' }}>
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiText={{
                    value: mannequins.wearableForDescr?.available
                      ? `<color #FA2B54><b>${mannequins.wearableForDescr.available.toString()}</b></color>`
                      : '<color #FA2B54><b>unavailable</b></color>',
                    color: Color4.Black(),
                    fontSize: sizer.viewportHeightSize(0.018)
                  }}
                />
                <UiEntity
                  key={`${prefix}${uiKeyCounter++}`}
                  uiTransform={{
                    maxHeight: sizer.viewportHeightSize(0.002),
                    margin: { top: -sizer.viewportHeightSize(0.002) }
                  }}
                  uiText={{ value: 'Available', fontSize: sizer.viewportHeightSize(0.013), color: Color4.Black() }}
                />
              </UiEntity>
            </UiEntity>
            <Button
              key={`${prefix}${uiKeyCounter++}`}
              value="LINK TO MARKETPLACE"
              variant="secondary"
              fontSize={sizer.viewportHeightSize(0.017)}
              uiTransform={{
                positionType: 'absolute',
                position: { bottom: 0, left: 0 },
                width: sizer.viewportHeightSize(0.36),
                height: sizer.viewportHeightSize(0.043)
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
                openExternalUrl({ url: `https://decentraland.org/marketplace${mannequins.wearableForDescr?.url}` })
              }}
              disabled={!mannequins.wearableForDescr}
            />
          </UiEntity>
        </UiEntity>
      </UiEntity>
    </UiEntity>
  )
}

const getDescription = (data: WearableItem | undefined): string => {
  // mannequins.wearableForDescr?.data.wearable.description
  // console.log("GET DESCRIPTION", data)
  if (!data || (data.data.wearable && !data.data.wearable.description.length)) return 'No description'
  if (data.data.wearable) return data.data.wearable.description
  if (data.data.emote) return data.data.emote.description
  return 'No description'
}

const getCategory = (data: WearableItem | undefined): string => {
  // console.log("GET CATEGORY", data)
  if (!data) return 'No category'
  if (data.data.wearable) return data.data.wearable.category
  if (data.data.emote) return data.data.emote.category
  return 'No category'
}

export const toggleNpcMenuVisibility = (menuType: NPC_MENU_ENUM) => {
  switch (menuType) {
    case NPC_MENU_ENUM.FILTER:
      if (isVisible.npcSortByMenu) isVisible.npcSortByMenu = false
      isVisible.npcFilterMenu = !isVisible.npcFilterMenu
      break
    case NPC_MENU_ENUM.SORT_BY:
      if (isVisible.npcFilterMenu) isVisible.npcFilterMenu = false
      isVisible.npcSortByMenu = !isVisible.npcSortByMenu
      break
    case NPC_MENU_ENUM.WEARABLE:
      isVisible.wearableDescriptionMenu = !isVisible.wearableDescriptionMenu
      break
    default:
      break
  }
}

const closeAllMenus = () => {
  if (isVisible.npcFilterMenu) isVisible.npcFilterMenu = false
  if (isVisible.npcSortByMenu) isVisible.npcSortByMenu = false
}
