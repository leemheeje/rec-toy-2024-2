import BxSectionTitle from '@/components/common/BxSectionTitle'
import BxProductionItem, {DESIGN_PROD_TYPE} from '@/components/ui/BxProductionItem'
import BxProductionWrapping, {WRAPPING_TYPE} from '@/components/ui/BxProductionWrapping'
import StringUtil from '@/util/StringUtil'
import BxFilterSelect from './BxFilterSelect'
import {filterSelectList} from '@/mock.js'
import {useEffect, useState} from 'react'

const DisplayProdList = ({
  items = [],
  title = '',
  titleSize = '',
  useRightArea = true,
  searchCount = false,
  itemsCount = 0,
  filterCurrentValue = []
}) => {
  const [currentValue, setCurrentValue] = useState(filterCurrentValue)

  useEffect(() => {
    console.log(currentValue)
  }, [currentValue])

  function onClickSectionTitleMore() {}

  return (
    <div className={`p-inner-section`}>
      <BxSectionTitle
        title={title}
        titleSize={titleSize}
        useRightArea={useRightArea}
        count={itemsCount}
        searchCount={searchCount}
        moreBtn={items.length > 1}
        onClick={onClickSectionTitleMore}
      >
        <div className="pg-prod-option-group">
          <BxFilterSelect items={filterSelectList.filterList} value={currentValue} setValue={setCurrentValue} />
        </div>
      </BxSectionTitle>
      <BxProductionWrapping type={WRAPPING_TYPE.GRID} designType={DESIGN_PROD_TYPE.DEFAULT_LARGE} items={items}>
        {(item) => (
          <BxProductionItem
            item={item}
            designProdType={DESIGN_PROD_TYPE.DEFAULT_LARGE}
            useBannerMedium={true}
            isShadow
          />
        )}
      </BxProductionWrapping>
    </div>
  )
}

export default DisplayProdList
