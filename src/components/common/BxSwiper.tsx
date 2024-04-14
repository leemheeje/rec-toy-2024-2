import {Navigation, Scrollbar, Autoplay} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import React, {useEffect, useState} from 'react'

interface BxSwiperProps {
  items?: {[key: string]: any}[]
}
const BxSwiper: React.FC<BxSwiperProps> = ({items = [], ...props}) => {
  const [localItems, setLocalItems] = useState([])
  useEffect(() => {
    setLocalItems(items)
    SwiperCore.use([Navigation, Scrollbar, Autoplay])
  }, [])
  return (
    <div className="swiper-container">
      <Swiper
        loop={true} // 슬라이드 루프
        spaceBetween={50} // 슬라이스 사이 간격
        slidesPerView={3} // 보여질 슬라이스 수
        navigation={true} // prev, next button
        autoplay={{
          delay: 2500,
          disableOnInteraction: false // 사용자 상호작용시 슬라이더 일시 정지 비활성
        }}
      >
        {localItems.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div>
              <div>{slide.text}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default BxSwiper
