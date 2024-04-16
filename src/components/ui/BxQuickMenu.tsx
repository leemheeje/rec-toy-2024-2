import React, {useEffect, useState} from 'react'
import StringUtil from '@/util/StringUtil'

interface QuickMenuItemProps {
  catgCntsKdCd?: string
  catgId?: string
  catgIconUrl?: string
  catgNm?: string
}

interface QuickMenuProps {
  items?: QuickMenuItemProps[]
  value?: {
    data: QuickMenuItemProps
    setData: React.Dispatch<React.SetStateAction<QuickMenuItemProps>>
  }
}

const BxQuickMenu: React.FC<QuickMenuProps> = ({
  items = [],
  value = {
    data: '',
    setData: () => {}
  },
  ...props
}) => {
  const [localMoreVisible, setLocalMoreVisible] = useState(false)

  function onChange(item: QuickMenuItemProps) {
    value.setData(item)
  }
  function onMoreClick() {}

  return (
    <div className="p-inner-section">
      <div className="MT20">
        <div
          className={`pg-catetory-list ${StringUtil.classNames({
            'is-visible': localMoreVisible
          })}`}
          data-design-type="LINE"
        >
          <div className="pc-inbox">
            <ul className="p-ct-lst">
              {/* foreach:S */}
              {items.map((item, index) => (
                <li className="itm" key={index}>
                  <input
                    id={`menu${item.catgId}`}
                    name="ctLstMenuName"
                    type="radio"
                    className="it-ip"
                    checked={item === value.data}
                    onChange={() => onChange(item)}
                  />
                  <label htmlFor={`menu${item.catgId}`} className="it-lb">
                    <span
                      className="i-img"
                      style={{
                        backgroundImage: `url(${item.catgIconUrl})`
                      }}
                    ></span>
                    <span className="i-tx">{item.catgNm}</span>
                  </label>
                </li>
              ))}
              {/* foreach:E */}
              {/* 더보기 :S */}
              <li className="itm nd-ibtn">
                <button className="it-bt" title="카테고리메뉴 더보기" onClick={onMoreClick}>
                  <span className="i-tx">{localMoreVisible ? `접기` : `더보기`}</span>
                </button>
              </li>
              {/* 더보기 :E */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

BxQuickMenu.displayName = 'BxQuickMenu'

export default BxQuickMenu
