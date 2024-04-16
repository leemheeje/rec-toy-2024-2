import StringUtil from '@/util/StringUtil'
import React from 'react'

export interface BxCouponListProps extends React.HTMLAttributes<HTMLDivElement> {
  item?: {[key: string]: any}
  useCheckbox?: boolean
}

const COUPONE_STATUS_CODE = Object.freeze({
  UNUSED: '1', // 미사용
  APPLYING: '2', //적용중
  USED: '3', // 사용완료
  DISPOSE: '4' // 폐기
})

const BxCouponList = ({item = [], useCheckbox = false, onChange = () => {}}: BxCouponListProps) => {
  const TagName = useCheckbox ? 'label' : 'div'

  function handleCheckboxChange(e) {
    onChange(e)
  }

  return (
    <div className="bx-coupon-item">
      {useCheckbox && <input type="checkbox" className="inp" onChange={handleCheckboxChange} />}

      <TagName
        className={`lbs ${StringUtil.classNames({
          active: !useCheckbox
        })}`}
      >
        <div className="f-tx-gr">
          <span className="f-stx">{item.cpnDispNm}</span>
          <span className="f-tx">{StringUtil.setPriceComma(item.cpnDcntAmt)}원 할인</span>
        </div>
        {item.cpnStus === COUPONE_STATUS_CODE.APPLYING && <span className="f-lb tp2">{item.cpnStusNm}</span>}
      </TagName>
    </div>
  )
}

const BxCouponListGroup = () => {
  return (
    <div className="bx-coupon-item">
      <div className="qlits">
        {/* foreach:S */}
        <div className="fv-li"></div>
        {/* foreach:E */}
      </div>
    </div>
  )
}

const NoResult = () => {
  return (
    <button className="fav-qnull MT15 is-ics">
      <div className="n-tx tp3">
        <span className="ics"></span>고객님, 사용 가능한 쿠폰을 확인 해 보세요!
      </div>
    </button>
  )
}

export {BxCouponList as default, COUPONE_STATUS_CODE, BxCouponListGroup, NoResult}
