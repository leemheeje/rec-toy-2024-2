import Header from '@/layouts/Header'
import Footer from '@/layouts/Footer'
import {useEffect, useState} from 'react'
import BxDialog, {STR_BUTTON_TYPE} from '@/components/common/BxDialog'

const Layout = ({children, ...props}) => {
  const [modals, setModals] = useState([]) //나중에 리듀서로 옮기기 글로벌관리

  useEffect(() => {
    // setModals([
    //   {
    //     title: 'globatitle',
    //     message: 'global message',
    //     buttonType: 'CONFIRM',
    //     callback: (params) => {
    //       if (params === STR_BUTTON_TYPE.CONFIRM) {
    //         console.log('확인버튼 클릭')
    //       }
    //       if (params === STR_BUTTON_TYPE.CANCEL) {
    //         console.log('취소버튼 클릭')
    //       }
    //     }
    //   }
    // ])
  }, [])
  function onClickPushModal() {
    setModals([...modals, {title: 'globatitle', message: 'pushpushpushglobal message', buttonType: 'confirm'}])
  }
  return (
    <>
      <button onClick={onClickPushModal}>onClickPushModalonClickPushModal</button>
      <div className="p-hago layout-bg">
        {/*  :className="{'full-layout': $route.name === 'pogg'}" */}
        <div className="wrap l-new-main-wrap">
          <Header />
          <div id="cSection">
            {/* :class="[isTablet ? 'is-tablet' : 'is-pc']" */}
            {children}
          </div>
          <Footer />
        </div>
      </div>
      {modals.map(
        ({title = '', message = '', buttonType = STR_BUTTON_TYPE.CONFIRM, callback = () => {}, ...modal}, index) => (
          <BxDialog show={true} key={index}>
            <BxDialog.Header>{title}</BxDialog.Header>
            <BxDialog.Body>{message}</BxDialog.Body>
            <BxDialog.Footer callback={callback} buttonType={buttonType} />
          </BxDialog>
        )
      )}
    </>
  )
}

export default Layout
