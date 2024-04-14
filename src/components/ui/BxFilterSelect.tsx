import _cloneDeep from 'lodash/cloneDeep'
import _some from 'lodash/some'
import _isEqual from 'lodash/isEqual'
import StringUtil from '@/util/StringUtil'
import BxButton from '@/components/common/BxButton'
import BxSectionTitle from '@/components/common/BxSectionTitle'
import BxRadio from '@/components/common/BxRadio'
import BxCheckbox from '@/components/common/BxCheckbox'
import React, {useCallback, useEffect, useState} from 'react'

interface item {
  name?: string
  code?: string
  filterData?: {
    code?: string
    codeName?: string
  }[]
}

interface BxFilterSelectProps {
  items?: item[]
  tabCodeId?: string
  tabCodeName?: string
  chkCodeId?: string
  chkCodeName?: string
  chkDataGroupName?: string
  value?: item[]
  setValue?: React.Dispatch<React.SetStateAction<item[]>>
}

let localInitValue = []
const BxFilterSelect = ({
  items = [],
  tabCodeId = 'code',
  tabCodeName = 'name',
  chkCodeId = 'code',
  chkCodeName = 'codeName',
  chkDataGroupName = 'filterData',
  value = [],
  setValue = () => {},
  ...props
}: BxFilterSelectProps) => {
  const localClassName = 'pgFilterBox'
  const cloneValue = _cloneDeep(value)
  const [localOpenSheet, setLocalOpenSheet] = useState(false)
  const [localFilterTotalCount, setLocalFilterTotalCount] = useState<number>(0)
  const isColrtAreaTypeRadio = useCallback((item) => item?.[tabCodeId] === '1170', [items])

  useEffect(() => {
    localInitValue = cloneValue
  }, [])

  useEffect(() => {
    if (localOpenSheet) {
      if (typeof window !== 'undefined') {
        document.addEventListener('click', onWindowClickEvent)
      }
      return () => {
        document.removeEventListener('click', onWindowClickEvent)
      }
    }
  }, [localOpenSheet])

  useEffect(() => {
    const totalCount = value.reduce((prev, current) => prev + current[chkDataGroupName].length, 0)
    setLocalFilterTotalCount(totalCount)
  }, [value])
  function onWindowClickEvent(e) {
    if (!e.target.closest('.pg-filter-box')) {
      setLocalOpenSheet(false)
      onClickReset()
    }
  }
  function onClickFilterToggleButton() {
    setLocalOpenSheet(!localOpenSheet)
  }
  function handleRadioOnClick(e, item, _item) {
    if (e.target.checked) {
      const o = cloneValue.map((v) => {
        if (v[tabCodeId] === item[tabCodeId]) {
          v[chkDataGroupName] = []
        }
        return v
      })
      setValue(o)
    }
  }
  function handleRadioOnChange(item, _item) {
    const o = cloneValue.map((v) => {
      if (v[tabCodeId] === item[tabCodeId]) {
        v[chkDataGroupName] = [_item]
      }
      return v
    })
    setValue(o)
  }
  function handleCheckboxOnChange(e, item, _item) {
    const isChecked = e.target.checked
    const o = cloneValue.map((v) => {
      let _v = v
      if (_v[tabCodeId] === item[tabCodeId]) {
        if (isChecked) {
          _v[chkDataGroupName].push(_item)
        } else {
          _v[chkDataGroupName] = _v[chkDataGroupName].filter((d) => d.code !== _item.code)
        }
      }
      return _v
    })
    setValue(o)
  }
  function isGroupCheckedCount(item) {
    const k = value.find((v) => v[tabCodeId] === item[tabCodeId])
    return k?.[chkDataGroupName].length || null
  }
  function isChecked(item, _item) {
    const k = value.find((v) => v[tabCodeId] === item[tabCodeId])
    return _some(k?.[chkDataGroupName], _item)
  }
  function onClickReset() {
    setValue(localInitValue)
  }
  function onClickConfirm() {
    alert(`-----필터적용-----\n ${JSON.stringify(value)}`)
  }

  return (
    <div
      className={`pg-filter-box ${StringUtil.classNames([
        localClassName,
        {
          open: localFilterTotalCount
        }
      ])}`}
    >
      <BxButton className="pick-filter" onClick={onClickFilterToggleButton}>
        필터&nbsp;
        {(localFilterTotalCount && <span className="num">{localFilterTotalCount}</span>) || null}
      </BxButton>
      {/* 필터선택팝업:S */}
      {localOpenSheet && (
        <div className="pg-filter-layer">
          {/* foreach:S */}
          {items.map((item, index) => (
            <div key={`__BX_FILTER_SELECT${index}__`}>
              <BxSectionTitle
                title={item[tabCodeName]}
                useRightArea={false}
                filterCount={true}
                count={isGroupCheckedCount(item)}
                titleSize="sm"
              />
              <div className={`filter-list ${isColrtAreaTypeRadio(item) ? 'align2' : 'align3'}`}>
                {(isColrtAreaTypeRadio(item) &&
                  item[chkDataGroupName].map((_item, _index) => (
                    <BxRadio
                      name={`__BX_FILTER_SELECT_RADIO${index}__`}
                      key={`__BX_FILTER_SELECT_RADIO${index}_KEY${_index}__`}
                      checked={isChecked(item, _item)}
                      onChange={() => handleRadioOnChange(item, _item)}
                      onClick={(e) => handleRadioOnClick(e, item, _item)}
                      useIcon={false}
                    >
                      {_item[chkCodeName]}
                    </BxRadio>
                  ))) ||
                  item[chkDataGroupName].map((_item, _index) => (
                    <BxCheckbox
                      name={`__BX_FILTER_SELECT_CHECKBOX${index}__`}
                      key={`__BX_FILTER_SELECT_CHECKBOX${index}_KEY${_index}__`}
                      checked={isChecked(item, _item)}
                      onChange={(e) => handleCheckboxOnChange(e, item, _item)}
                      useIcon={false}
                    >
                      <span className="txt">{_item[chkCodeName]}</span>
                    </BxCheckbox>
                  ))}
              </div>
            </div>
          ))}
          {/* foreach:E */}
          <div className="c-btn-group">
            <BxButton className="c-btn-hago btn-2" disabled={!localFilterTotalCount} onClick={onClickReset}>
              초기화
            </BxButton>
            <BxButton className="c-btn-hago btn-1" onClick={onClickConfirm}>
              선택완료
            </BxButton>
          </div>
        </div>
      )}

      {/* 필터선택팝업:E */}
    </div>
  )
}

export default BxFilterSelect
