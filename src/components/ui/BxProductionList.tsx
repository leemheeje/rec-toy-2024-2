import ObjectUtil from '@/util/ObjectUtil'
import StringUtil from '@/util/StringUtil'
import BxCheckbox from '@/components/common/BxCheckbox'
import React, {useMemo, useState} from 'react'

export interface BxProductionListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: any
  isBgcolor?: boolean
  useChecked?: boolean
  useDeleteButton?: boolean
  item?: {[key: string]: any}
  multiLogoMaxLength?: number
  onDeleteButtonClick?: (item?) => void
}

export interface BxProductionListGroupProps extends React.HTMLAttributes<HTMLDivElement>, BxProductionListProps {
  children?: any
  items?: {[key: string]: any}[]
}

const CHILDREN_NAME_INFO = Object.freeze({
  FLEXEND: 'flxend',
  STRUCTURE: 'structure',
  ALRTAREA: 'alrtArea',
  NOTICE: 'notice'
})

const BxProductionList = ({
  children,
  isBgcolor = false,
  useChecked = false,
  useDeleteButton = true,
  item = {},
  multiLogoMaxLength = 4,
  onDeleteButtonClick = () => {},
  ...props
}: BxProductionListProps) => {
  const {multiLogoImgUrl} = item
  const [localCheckModel, setLocalCheckModel] = useState('')

  const isArrayImagesUrl = useMemo(() => {
    return !!multiLogoImgUrl.length
  }, [multiLogoImgUrl])

  const multiLogoAntLength = useMemo(() => {
    if (isArrayImagesUrl) {
      const len = multiLogoImgUrl.length - multiLogoMaxLength
      return len > 0 ? len : false
    }
    return false
  }, [isArrayImagesUrl])

  function handleCheckboxChange(e) {}
  function handleDeleteButtonClick(e) {
    onDeleteButtonClick(item)
  }

  return (
    <div
      className={`pg-new-listitem ${StringUtil.classNames({
        'is-bgcolor': isBgcolor,
        'is-multilogo': isArrayImagesUrl
      })}`}
      data-logo-length={isArrayImagesUrl ? multiLogoImgUrl.length : 1}
    >
      <div className="nl-inner">
        <div
          className={`in-group ${StringUtil.classNames({
            'use-checked': useChecked
          })}`}
        >
          {/* lt */}
          {useChecked && (
            <div className="nl-lts">
              <BxCheckbox value={localCheckModel} title="체크박스" onChange={handleCheckboxChange}></BxCheckbox>
            </div>
          )}
          {/* contnets */}
          <div className="nl-cons">
            {(isArrayImagesUrl && (
              <div className="thmb-grp">
                {multiLogoImgUrl.map((img, index) => (
                  <span className="thumb" key={index}>
                    <img src={img} alt={`${item.logoImgAltTxt}썸네일이미지`} />
                  </span>
                ))}
                {multiLogoAntLength && (
                  <div className="thm-lnc">
                    <span className="tx">{multiLogoAntLength}</span>
                  </div>
                )}
              </div>
            )) || (
              <span className="thumb">
                <img src={item.logoImgUrl} alt={`${item.logoImgAltTxt}썸네일이미지`} />
              </span>
            )}
            <div className="txts">
              <p className="ti-t">{item.dispProdNm}</p>
              <div className="ti-s">
                {item.prodOpnDispNm && ( //옵션
                  <span className="ti-t-s">{item.prodOpnDispNm}</span>
                )}
                {(item.isSubscred && ( //구독중 || 구독 신청중
                  <span className="ti-t-b">
                    <span className="ti-ic"></span>
                    {item.isSubscrConnect === 'Y' ? `구독중` : '구독 신청중'}
                  </span>
                )) || <span className="ti-t-c">해지 예정</span>}
                {children[CHILDREN_NAME_INFO.NOTICE] && (
                  <div className="ti-t-r not-arrow noti"> {children[CHILDREN_NAME_INFO.NOTICE]}</div>
                )}
              </div>
              {children.default && <>{children.default}</>}
            </div>
          </div>
          {/* rt */}
          {children[CHILDREN_NAME_INFO.FLEXEND] && (
            <div className="nl-rts">
              <p className="txts">{children[CHILDREN_NAME_INFO.FLEXEND]}</p>
            </div>
          )}
        </div>
        {/* 구조개선 */}
        {children[CHILDREN_NAME_INFO.STRUCTURE]}
        {/* 리스트하단 안내문구영역 추가 */}
        {children[CHILDREN_NAME_INFO.ALRTAREA]}
      </div>
      {useDeleteButton && (
        <button
          className="nl-close-button"
          title={`${item.dispProdNm} 삭제`}
          onClick={handleDeleteButtonClick}
        ></button>
      )}
    </div>
  )
}

const BxProductionListGroup = ({
  items = [],
  isBgcolor = false,
  useChecked = false,
  useDeleteButton = false,
  onDeleteButtonClick = () => {},
  children
}: BxProductionListGroupProps) => {
  function childrenToObject(o) {
    let _o = {}

    if (!React.isValidElement(o)) {
      Object.entries(CHILDREN_NAME_INFO).forEach(([_, v]) => {
        if (o[v]) {
          _o[v] = o[v]
        }
      })
      if (!ObjectUtil.isObject(o)) {
        _o['default'] = o
      }
    } else {
      _o['default'] = o
    }
    return _o
  }

  return (
    <>
      <ul className="pg-new-listgroup">
        {items.map((item, index) => (
          <li className="ls-items" key={index}>
            <BxProductionList
              isBgcolor={isBgcolor}
              useChecked={useChecked}
              useDeleteButton={useDeleteButton}
              item={item}
              onDeleteButtonClick={onDeleteButtonClick}
            >
              {(typeof children === 'function' && childrenToObject(children(item))) || childrenToObject(children)}
            </BxProductionList>
          </li>
        ))}
      </ul>
    </>
  )
}

export {BxProductionList as default, BxProductionListGroup, CHILDREN_NAME_INFO}

{
  /* <BxProductionListGroup useDeleteButton items={_displayProdList} onDeleteButtonClick={handleDeleteButtonClick}>
  {(item) => ({
    [CHILDREN_NAME_INFO.FLEXEND]: '타이틀입니다',
    [CHILDREN_NAME_INFO.STRUCTURE]: (
      <div data-params="이상한나라의엘리스">
        <span className="asdf">asdfasdf</span>
        <span className="asdf">123</span>
        {item.aplyBnfy}
      </div>
    )
  })}
</BxProductionListGroup>
<BxProductionListGroup useDeleteButton items={_displayProdList} onDeleteButtonClick={handleDeleteButtonClick}>
  {(item) => (
    <div data-params="이상한나라의엘리스">
      <span className="asdf">asdfasdf</span>
      <span className="asdf">123</span>
      {item.aplyBnfy}
    </div>
  )}
</BxProductionListGroup>
<BxProductionListGroup useDeleteButton items={_displayProdList} onDeleteButtonClick={handleDeleteButtonClick}>
  {{
    title: '온리 리터럴객체만 넘김',
    subtitle: (
      <div data-params="이상한나라의엘리스">
        <span className="asdf">asdfasdf</span>
        <span className="asdf">123</span>
      </div>
    )
  }}
</BxProductionListGroup>
<BxProductionListGroup useDeleteButton items={_displayProdList} onDeleteButtonClick={handleDeleteButtonClick}>
  <div>DIV감싸서만 온리 리터럴객체만 넘김</div>
</BxProductionListGroup>
<BxProductionListGroup useDeleteButton items={_displayProdList} onDeleteButtonClick={handleDeleteButtonClick}>
  아무것도 안감싸서만 온리 리터럴객체만 넘김
</BxProductionListGroup> */
}
