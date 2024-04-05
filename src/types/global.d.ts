/**
 * @상품아이템 Type
 */
interface ItemProps {
  jncoProdCd?: string
  bannerImgAltTxt?: string
  logoImgUrl?: string
  logoImgAltTxt?: string
  dispProdNm?: string
  mainDispProdNm?: string
  oneLinCopy?: string
  prodOpnDispNm?: string
  normPrcInfo?: number
  sigDcntPrcInfo?: number
  moExcsYn?: string
  tagNewYn?: string
  tagKdCd1?: string
  tagNm1?: string
  tagKdCd2?: string
  tagNm2?: string
  tagKdCd3?: string
  tagNm3?: string
  bannerImgUrlLarge?: string
  bannerImgUrlMedium?: string
  bannerImgUrlSmall?: string
  tagKdCd4?: string
  tagNm4?: string
  tagBestYn?: string
  udExcsYn?: string
  multiLogoImgUrl?: string[]
  isSubscred?: boolean
  isSubscrConnect?: string
  isSoldout?: string
}

export {ItemProps}
