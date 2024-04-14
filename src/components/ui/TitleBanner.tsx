import {useEffect, useState} from 'react'
import BxSwiper from '../common/BxSwiper'

const TitleBanner = () => {
  const [mailBannerList] = useState([])
  return (
    <div className="slider">
      <BxSwiper items={mailBannerList}></BxSwiper>
    </div>
  )
}

export default TitleBanner
