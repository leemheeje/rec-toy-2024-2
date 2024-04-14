import Header from '@/layouts/Header'
import Footer from '@/layouts/Footer'
import {useCallback, useEffect, useState} from 'react'
import BxDialog, {STR_BUTTON_TYPE} from '@/components/common/BxDialog'
import {LayoutContext} from '@/contexts/LayoutContext'
import StringUtil from '@/util/StringUtil'

const Layout = ({children, ...props}) => {
  const [modals, setModals] = useState([]) //나중에 리듀서로 옮기기 글로벌관리

  const addModal = useCallback(() => {
    if (typeof window !== undefined) {
      const modalLength = modals.length
      if (!modalLength) {
        document.body.removeAttribute('data-modal-length')
      } else {
        document.body.setAttribute('data-modal-length', modalLength.toString())
      }
    }
  }, [modals])

  useEffect(() => {
    addModal()
  }, [modals])
  function addDialog(params = {}) {
    const _params = {
      id: '',
      title: '',
      message: '',
      buttonType: STR_BUTTON_TYPE.ALERT,
      callback: (params) => {
        // if (params === STR_BUTTON_TYPE.CONFIRM) {
        //   console.log('확인버튼 클릭')
        // }
        // if (params === STR_BUTTON_TYPE.CANCEL) {
        //   console.log('취소버튼 클릭')
        // }
      },
      ...params
    }
    const localId = _params.id ? _params.id : StringUtil.getUUID('_MV_MODAL_UUID')
    console.log('실행됨???', _params.title)

    setModals([
      ...modals,
      {
        id: localId,
        title: _params.title,
        message: _params.message,
        buttonType: _params.buttonType,
        callback: _params.callback
      }
    ])
  }
  function handleOnHide(dialogId) {
    setModals(() => modals.filter((modal) => modal.id !== dialogId))
  }
  return (
    <>
      <LayoutContext.Provider
        value={{
          addDialog: (params?) => addDialog(params)
        }}
      >
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
          ({title = '', message = '', buttonType = STR_BUTTON_TYPE.CONFIRM, callback = () => {}, ...modal}) => (
            <BxDialog show={true} key={modal.id} onHide={handleOnHide} id={modal.id}>
              {title && <BxDialog.Header>{title}</BxDialog.Header>}
              <BxDialog.Body>{message}</BxDialog.Body>
              <BxDialog.Footer callback={callback} buttonType={buttonType} />
            </BxDialog>
          )
        )}
      </LayoutContext.Provider>
    </>
  )
}

export default Layout
