import {useRouter} from 'next/router'

const Header = ({
  tabMenu = [
    {
      title: '유독 홈 바로가기',
      url: 'pogg-main',
      path: '/pogg-main',
      seq: 1,
      src: '/hago/images/common/udoc-logo.png'
    },
    {title: '홈', url: 'pogg-main', path: '/pogg/main', seq: 1},
    {title: '이벤트', url: 'pogg-evet', path: '/pogg/evet', seq: 2},
    {title: '매거진', url: 'pogg-magazine', path: '/pogg/magazine', seq: 3},
    {title: '고객센터', url: 'pogg-cucn', path: '/pogg/cucn', seq: 4}
  ],
  ...props
}) => {
  const router = useRouter()

  function setShowSearchPopup(bool) {
    console.log(bool)
    console.log(router)
  }
  return (
    <header className={`header-menu ${router.asPath === '/pogg' && 'fixed'}`}>
      {/* <Search v-if="isShowSearchPopup" /> */}

      <div className="in-box">
        <ul className="header-menu-items">
          {tabMenu.map((item, index) => (
            <li className={`${item.src && 'logo'}`} key={index}>
              {(item.src && <img src={item.src} alt="" />) || <a>{item.title}</a>}
            </li>
          ))}
        </ul>
        <div>
          <ul>
            {/* 3차 리뉴얼 수정 & 추가 :S */}
            <li className="header-btn search">
              <button className="p-cbt" onClick={() => setShowSearchPopup(true)}>
                <span className="blind">검색하기</span>
              </button>
            </li>
            <li className="header-btn my">
              <button className="p-cbt" onClick={() => router.push('/main')}>
                MY구독
              </button>
            </li>
            {/* 3차 리뉴얼 수정 & 추가 :E */}
            <li className="header-btn sign">
              <a className="p-cbt">
                {/* {{ $store.state.login.info.loginInfo.loginYn !== 'Y' ? '로그인' : '로그아웃' }} */}
                로그인
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header
