import TitleBanner from '@/components/ui/TitleBanner'
import QuickMenu from '@/components/ui/QuickMenu'
import DisplayProdList from '@/components/ui/DisplayProdList'
import {categoryList, displayProdList} from '@/mock.js'
import {useState} from 'react'

const Main = () => {
  const [localCurrentQuickMenuValue, setLocalCurrentQuickMenuValue] = useState(categoryList.categoryList[0])
  const filterCurrentValue = [
    {
      name: '카테고리',
      code: '1180',
      filterData: [
        {code: '01', codeName: 'OTT/뮤직'},
        {code: '05', codeName: '유쓰'},
        {code: '06', codeName: '여행'},
        {code: '07', codeName: '단기렌탈'},
        {code: '09', codeName: '여행'}
      ]
    },
    {
      name: '가격',
      code: '1170',
      filterData: [{code: '03', codeName: '5,000원~1만원 미만'}]
    },
    {
      name: '혜택',
      code: '1160',
      filterData: [{code: '02', codeName: '추가 할인'}]
    },
    {
      name: '유형',
      code: '1150',
      filterData: [{code: '02', codeName: 'U+ 모바일전용'}]
    }
  ]

  return (
    <section className="main-section">
      <main className="main">
        <div className="p-main-prod-area">
          <TitleBanner />
          {/* <QuickMenu
            value={{
              data: localCurrentQuickMenuValue,
              setData: setLocalCurrentQuickMenuValue
            }}
            items={categoryList.categoryList}
          /> */}
          <DisplayProdList
            title="전체 상품"
            items={displayProdList.sppsFoDtoList}
            filterCurrentValue={filterCurrentValue}
            titleSize="lg"
          />
        </div>
      </main>
    </section>
  )
}

export default Main
