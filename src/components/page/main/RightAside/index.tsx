import StringUtil from '@/util/StringUtil'
import BxButton from '@/components/common/BxButton'
import {BxProductionListGroup, CHILDREN_NAME_INFO} from '@/components/ui/BxProductionList'
import LinkArea from '@/components/page/main/RightAside/LinkArea'
import EstimatedSubscription from '@/components/page/main/RightAside/EstimatedSubscription'
import DiscountCoupon from '@/components/page/main/RightAside/DiscountCoupon'
import {BxRadioGroup} from '@/components/common/BxRadio'
import React, {useState} from 'react'
import {displayProdList} from '@/mock.js'
import ObjectUtil from '@/util/ObjectUtil'

const sttProdType = [
  {prodCatgCd: 'C1', prodCatgName: '담은상품', prodCatgCount: 0},
  {prodCatgCd: 'C2', prodCatgName: '구독 중인 상품', prodCatgCount: 0}
]

const RightAside = () => {
  const [isCartFolded, setIsCartFolded] = useState(false)
  const [prodType, setProdType] = useState(sttProdType[0].prodCatgCd)
  const _displayProdList = ObjectUtil.cloneDeep(displayProdList.sppsFoDtoList)

  function handleProdTypeChange(params) {
    setProdType(params)
  }

  function handleDeleteButtonClick(item) {
    console.log('handleDeleteButtonClick----', item)
  }

  return (
    <aside className="right-aside">
      <div className="contents subs-price-list l-price-renew">
        <div className="subs-price-top">
          <h5>구독 장바구니</h5>
          <BxButton className="vs-btn-close" onClick={() => setIsCartFolded(!isCartFolded)}></BxButton>
        </div>

        {/* 상단탭:S */}
        <div
          className={`l-new-int-rdo ${StringUtil.classNames({
            active: isCartFolded
          })}`}
        >
          <BxRadioGroup
            value={prodType}
            items={sttProdType}
            codeId="prodCatgCd"
            codeName="prodCatgName"
            onChange={handleProdTypeChange}
          >
            {(item) => (
              <div className="l-new-head1 sm">
                <div className="tx-w">
                  <span className={`tx-w-t FWB clr-000`}>{item.prodCatgName}</span>
                  <span className="tx-w-i">{item.prodCatgCount}</span>
                </div>
              </div>
            )}
          </BxRadioGroup>
          <div className="l-new-head1 FWR MT15">
            {(prodType === 'C1' && <p className="tx-s LINEHEIGHT20 clr-aaa">한번에 5개까지 신청할 수 있어요.</p>) || (
              <p className="tx-s LINEHEIGHT20 clr-aaa">
                해지는 [MY구독]에서 할 수 있어요.
                <br />
                당월 해지 예정 상품은 구독료 합계에서 제외됩니다.
              </p>
            )}
          </div>
        </div>
        {/* 상단탭:E */}
        {/* 메인(top) : 담은/구독중인 상품 List 영역 :S */}
        <div
          className={`subs-price-bottom renew ${StringUtil.classNames({
            active: isCartFolded
          })}`}
        >
          <BxProductionListGroup useDeleteButton items={_displayProdList} onDeleteButtonClick={handleDeleteButtonClick}>
            {(item) => ({
              [CHILDREN_NAME_INFO.NOTICE]: item.aplyBnfy
            })}
          </BxProductionListGroup>
        </div>
        {/* 메인(top) : 담은/구독중인 상품 List 영역 :E */}
        {/* 할인쿠폰 */}
        <DiscountCoupon isShow={isCartFolded} />
      </div>

      {/* 구독정보:S */}
      <EstimatedSubscription isShow={!isCartFolded} />
      {/* 구독정보:E */}
      {/* 링크영역:S */}
      <LinkArea isShow={!isCartFolded} />
      {/* 링크영역:E */}
    </aside>
  )
}

export default RightAside
