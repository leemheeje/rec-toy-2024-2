import _findKey from 'lodash/findKey'
import {useEffect, useState} from 'react'
import StringUtil from '@/util/StringUtil'
import {ItemProps} from '@/types/global'

const BANNER_SIZE_TYPE = Object.freeze({
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small'
})
const DESIGN_PROD_TYPE = Object.freeze({
  DEFAULT: 'DEFAULT',
  DEFAULT_LARGE: 'DEFAULT_LARGE',
  WIDE: 'WIDE'
})

interface BxProductionItemProps {
  isShadow?: boolean
  useBannerLarge?: boolean
  useBannerMedium?: boolean
  useBannerSmall?: boolean
  designProdType?: keyof typeof DESIGN_PROD_TYPE
  item: ItemProps
  onClickContent?: (params?) => void
  onClickAdd?: (params?) => void
  onClickDelete?: (params?) => void
  onClickMyButton?: () => void
}

const BxProductionItem: React.FC<BxProductionItemProps> = ({
  isShadow,
  useBannerLarge,
  useBannerMedium,
  useBannerSmall,
  designProdType,
  item = {},
  onClickContent = () => {},
  onClickAdd = () => {},
  onClickDelete = () => {},
  onClickMyButton = () => {},
  ...props
}) => {
  const [isBanner] = useState(useBannerLarge || useBannerMedium || useBannerSmall)
  const [isSubscred] = useState(item.isSubscred)
  const [isSoldout] = useState(item.isSoldout === 'Y')
  const [isActive, setIsActive] = useState(false)
  const [isSubscrConnect] = useState(item.isSubscrConnect)
  const [localBannerType, setLocalBannerType] = useState('')
  const [isOptionAreaActive] = useState(
    item.isSubscred ||
      item.tagKdCd1 ||
      item.tagKdCd2 ||
      item.tagKdCd3 ||
      item.tagKdCd4 ||
      item.moExcsYn === 'Y' ||
      item.udExcsYn === 'Y'
  )
  const [isProdOpnDispNm] = useState(item.prodOpnDispNm)
  const [isMultiLogoImgUrl] = useState(item.multiLogoImgUrl && item.multiLogoImgUrl.length)
  const [isDesignProdTypeWide] = useState(designProdType === DESIGN_PROD_TYPE.WIDE)
  const [isDesignProdTypeDefault] = useState(designProdType === DESIGN_PROD_TYPE.DEFAULT)
  const [isProdNetflix] = useState(item.jncoProdCd === 'LRZ00031423333') // 넷플릭스

  useEffect(() => {
    if (isBanner) {
      const o = setBannerTypeObject()
      setLocalBannerType(_findKey(o, (t) => t))
    } else {
      setLocalBannerType('')
    }
  }, [isBanner])

  function getPricePerc(n, d) {
    return `${Math.floor(((n - d) / n) * 100)}%`
  }
  function setBannerTypeObject() {
    const obj = {}
    const BANNER_TYPE = BANNER_SIZE_TYPE
    const {bannerImgUrlLarge, bannerImgUrlMedium, bannerImgUrlSmall} = item
    obj[BANNER_TYPE.LARGE] = useBannerLarge && bannerImgUrlLarge
    obj[BANNER_TYPE.MEDIUM] = useBannerMedium && bannerImgUrlMedium
    obj[BANNER_TYPE.SMALL] = useBannerSmall && bannerImgUrlSmall
    return obj
  }
  function handleOnClickContent() {
    onClickContent()
  }
  function handleOnClickAdd() {
    setIsActive(true)
    onClickAdd(item)
  }
  function handleOnClickDelete() {
    setIsActive(false)
    onClickDelete(item)
  }
  function handleOnClickMyButton() {
    setIsActive(true)
    onClickMyButton()
  }
  return (
    <div
      data-logo-length={
        localBannerType !== BANNER_SIZE_TYPE.SMALL && isMultiLogoImgUrl ? item.multiLogoImgUrl.length : 1
      }
      data-banner-type={localBannerType}
      data-design-type={designProdType}
      className={`pg-prod-item ${StringUtil.classNames({
        'is-shadow': isShadow, //디자인용 상품shadow
        'is-active': isActive, //장바구니담길때
        'is-subscred': isSubscred, //구독중
        'is-option-area': isOptionAreaActive, //디자인용 와이드형태의 옵션영역 활성화
        'is-banner': isBanner && localBannerType, //상품 배너이미지 && 배너이미지가 데이터에있어도 사용하지않을때
        'is-soldout': isSoldout //임시품절
      })}`}
    >
      <div className="pp-inbox">
        {localBannerType && (
          <button className="pr-banner" onClick={handleOnClickContent}>
            <div className="p-ban">
              {useBannerLarge && <img src={item.bannerImgUrlLarge} alt={item.logoImgAltTxt} className="img" />}
              {useBannerMedium && <img src={item.bannerImgUrlMedium} alt={item.logoImgAltTxt} className="img" />}
              {useBannerSmall && <img src={item.bannerImgUrlSmall} alt={item.logoImgAltTxt} className="img" />}
            </div>
          </button>
        )}
        <div className="pr-content">
          <div className="st-area">
            {(isSubscred && (
              <span className="lbs tp-scing">
                <span className="ic"></span>
                {isSubscrConnect === 'Y' ? `구독중` : '구독 신청중'}
              </span>
            )) || (
              <>
                {item.tagKdCd1 && <span className={`lbs type${item.tagKdCd1}`}>{item.tagNm1}</span>}
                {item.tagKdCd2 && <span className={`lbs type${item.tagKdCd2}`}>{item.tagNm2}</span>}
                {item.tagKdCd3 && <span className={`lbs type${item.tagKdCd3}`}>{item.tagNm3}</span>}
                {item.tagKdCd4 && <span className={`lbs type${item.tagKdCd4}`}>{item.tagNm4}</span>}
                {item.tagBestYn === 'Y' && <span className={`lbs tagBestYn`}>BEST</span>}
                {item.moExcsYn === 'Y' && <span className={`lbs moExcsYn`}>U+ 모바일 전용</span>}
                {item.udExcsYn === 'Y' && <span className={`lbs udExcsYn`}>유독 ONLY</span>}
              </>
            )}
          </div>
          <div className="ptm-cont">
            <button className="thm-area" onClick={handleOnClickContent}>
              <div className="th-inbx">
                {localBannerType !== BANNER_SIZE_TYPE.SMALL && (
                  <div className="thm-ars">
                    {isMultiLogoImgUrl ? (
                      <>
                        {item.multiLogoImgUrl.map((url, index) => (
                          <span className="thm" key={index}>
                            <img src={url} alt={item.logoImgAltTxt} className="img" />
                          </span>
                        ))}
                      </>
                    ) : (
                      <span className="thm">
                        <img src={item.logoImgUrl} alt={item.logoImgAltTxt} className="img" />
                      </span>
                    )}
                  </div>
                )}
                {item.tagNewYn === 'Y' && (
                  <div className="ope-ar">
                    <span className="muk tp1">N</span>
                  </div>
                )}
              </div>
            </button>
            <button className="prd-info" onClick={handleOnClickContent}>
              <div className="pi-txts">
                <div className="pi-tit">
                  <h4 className="p-tt is-loaded">
                    <span>{item.dispProdNm}</span>
                  </h4>
                </div>

                {/* 여기부턴 */}
                {!isDesignProdTypeWide && item.oneLinCopy && <h5 className="pi-stit">{item.oneLinCopy}</h5>}
              </div>
              <div className="pi-opt">
                {isSubscrConnect === 'Y' && isProdOpnDispNm ? (
                  <div className="p-opts">
                    <span className="stx">{item.prodOpnDispNm}</span>
                  </div>
                ) : (
                  <>
                    <div className="p-prcs">
                      {!isProdNetflix && (
                        <>
                          {item.normPrcInfo !== item.sigDcntPrcInfo && (
                            <span className="per">{getPricePerc(item.normPrcInfo, item.sigDcntPrcInfo)}</span>
                          )}
                          <span className="prc">월 {StringUtil.setPriceComma(item.sigDcntPrcInfo)}원</span>
                        </>
                      )}
                      {isSubscrConnect === 'N' && isProdNetflix && (
                        <span className="prc">
                          월 {StringUtil.setPriceComma(item.normPrcInfo - item.sigDcntPrcInfo)}원 할인
                        </span>
                      )}
                      {isActive && isProdOpnDispNm ? (
                        <span className="prc-opt">{item.prodOpnDispNm}</span>
                      ) : (
                        item.normPrcInfo !== item.sigDcntPrcInfo && (
                          <span className="dsc">월 {StringUtil.setPriceComma(item.normPrcInfo)}원</span>
                        )
                      )}
                    </div>
                  </>
                )}
              </div>
            </button>
            <div className="pr-btne-ar">
              {!isActive && !isSubscred && !isSoldout && (
                <button className="pr-btne add" onClick={handleOnClickAdd}>
                  <span className="ic"></span>
                  담기
                </button>
              )}
              {isActive && !isSubscred && !isSoldout && (
                <button className="pr-btne minu" onClick={handleOnClickDelete}>
                  <span className="ic"></span>
                  빼기
                </button>
              )}
              {isSubscred && (
                <button className="pr-btne my" onClick={handleOnClickMyButton}>
                  MY
                  <br />
                  구독
                </button>
              )}
              {isSoldout && (
                <button className="pr-btne lmt" disabled>
                  일시
                  <br />
                  품절
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BxProductionItem
export {DESIGN_PROD_TYPE}
