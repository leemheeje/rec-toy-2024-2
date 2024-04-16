import StringUtil from '@/util/StringUtil'
import React, {useState} from 'react'
import BxCouponList from '@/components/ui/BxCouponList'
import BxDialog from '@/components/common/BxDialog'
import BxButton from '@/components/common/BxButton'
import {couponList} from '@/mock.js'

export interface DiscountCouponProps extends React.HTMLAttributes<HTMLDivElement> {
  isShow?: boolean
  isCoupon?: boolean
}

const DiscountCoupon = ({children, isShow = false, isCoupon = true}: DiscountCouponProps) => {
  const [isShowPopup, setShowPopup] = useState(false)
  function handlePopupOpen() {}
  return (
    <>
      {isShow && (
        <div className="fav-mem-char MT30">
          <div className="btit justify">
            <span className="lt">할인 쿠폰</span>
            <div className="rt">
              <button className="d-btn">{isCoupon ? '선택하기' : '변경하기'}</button>
            </div>
          </div>
          {isCoupon ? (
            <>
              {/* 적용중인 쿠폰이 있을 경우:S */}
              <div className="MT30">
                <BxCouponList item={couponList.ownCpnList[0]}></BxCouponList>
              </div>
              {/* 적용중인 쿠폰이 있을 경우:E */}
            </>
          ) : (
            <>
              {/* 적용중인 쿠폰이 없는 경우:S */}
              <button className="fav-qnull MT15 is-ics" onClick={() => setShowPopup(true)}>
                {isShowPopup.toString()}
                <div className="n-tx tp3">
                  <span className="ics"></span>고객님, 사용 가능한 쿠폰을 확인 해 보세요!
                </div>
              </button>
              {/* 적용중인 쿠폰이 없는 경우:E */}
              {/* 쿠폰팝업:S */}
              {/* <BxDialog dialogClassName='m-bv-modal c-layer-popup p-account-overview netflix-pop legoland-pop fav-mem-char' show={isShowPopup}>
              <div className="wrap">
              <div class="fav-mem-powr">
      <CouponCodeInput :cart-item-list="cartItemList" />
      <CouponList :cart-item-list="cartItemList" />
      <ToastMessage />
        <BxButton class="c-btn-solid-1" @click="handleOk">확인</BxButton>
    </div>
              </BxDialog> */}
              {/* 쿠폰팝업:E */}
            </>
          )}
        </div>
      )}
    </>
  )
}

export {DiscountCoupon as default}
