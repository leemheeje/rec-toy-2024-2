import {Modal} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import BxButton from '@/components/common/BxButton'
import StringUtil from '@/util/StringUtil'

interface BxDialogProps {
  children?: React.ReactNode
  Header?: React.ReactNode
  Body?: React.ReactNode
  Footer?: React.ReactNode
  show?: boolean
  id?: string
  animation?: boolean
  centered?: boolean
  //
  autoFocus?: boolean
  enforceFocus?: boolean
  restoreFocus?: boolean
  dialogClassName?: string
  onHide?: (e: any) => void
}

interface Bodyprops {
  children?: React.ReactNode
}
interface HeaderProps {
  children?: React.ReactNode
  name?: string
  onHide?: () => void
}
interface FooterProps {
  children?: React.ReactNode
  name?: string
  onHide?: () => void
  buttonType?: keyof typeof STR_BUTTON_TYPE
  callback?: (e?: string) => void
}

const STR_BUTTON_TYPE = Object.freeze({
  ALERT: 'ALERT',
  CONFIRM: 'CONFIRM',
  CANCEL: 'CANCEL'
})

const BxDialog: React.FC<BxDialogProps> & {
  Header: React.FC<HeaderProps>
  Body: React.FC<Bodyprops>
  Footer: React.FC<FooterProps>
} = ({
  children,
  id = '',
  centered = true,
  show = false,
  animation = false,
  dialogClassName = '',
  onHide = () => {},
  ...props
}) => {
  const [localIsShow, setIsShow] = useState(show)
  const [localId, setLocalId] = useState(id)
  const handleClose = () => {
    onHide(localId)
    setIsShow(false)
  }
  const handleShow = () => setIsShow(true)

  useEffect(() => {
    if (!localId) {
      setLocalId(StringUtil.getUUID('_MV_MODAL_UUID'))
    }
  }, [])
  useEffect(() => {
    setIsShow(show)
  }, [show])
  return (
    <>
      <Modal
        centered={centered}
        show={localIsShow}
        animation={animation}
        onHide={handleClose}
        autoFocus={true}
        enforceFocus={true}
        restoreFocus={true}
        id={localId}
        dialogClassName={`modal-dialog modal-md modal-dialog-centered m-bv-modal c-layer-popup ${dialogClassName}`}
      >
        {(Array.isArray(children) &&
          children.map((child, index) => {
            if (React.isValidElement(child)) {
              if (child.type === BxDialog.Header) {
                return (
                  <Modal.Header key={`_MV_MODAL_HEADER_${index}`}>
                    {React.cloneElement(child, {
                      onHide: handleClose
                    } as HeaderProps)}
                  </Modal.Header>
                )
              } else if (child.type === BxDialog.Footer) {
                return (
                  <Modal.Footer key={`_MV_MODAL_FOOTER_${index}`}>
                    {React.cloneElement(child, {
                      onHide: handleClose
                    } as FooterProps)}
                  </Modal.Footer>
                )
              } else if (child.type === BxDialog.Body) {
                return <Modal.Body key={`_MV_MODAL_BODY_${index}`}>{React.cloneElement(child)}</Modal.Body>
              }
            } else {
              return <Modal.Body key={`_MV_MODAL_BODY_${index}`}>{child}</Modal.Body>
            }
          })) || <Modal.Body>{children}</Modal.Body>}
      </Modal>
    </>
  )
}

BxDialog.Body = ({children}) => {
  return <div className="c-body-content">{children}</div>
}
BxDialog.Header = ({children, onHide = () => {}, ...props}) => {
  return (
    <>
      <h1 className="pop-tit-1">{children}</h1>
      <button className="c-btn-close" type="button" onClick={onHide}>
        닫기
      </button>
    </>
  )
}
BxDialog.Footer = ({
  children,
  buttonType = STR_BUTTON_TYPE.ALERT,
  onHide = () => {},
  callback = () => {},
  ...props
}) => {
  function handleOnCancel() {
    onHide()
    callback(STR_BUTTON_TYPE.CANCEL)
  }
  function handleOnConfirm() {
    onHide()
    callback(STR_BUTTON_TYPE.CONFIRM)
  }

  return (
    <>
      {children}
      <div className="c-btn-group">
        {buttonType === STR_BUTTON_TYPE.CONFIRM && (
          <>
            <BxButton className="c-btn-outline-1-m" onClick={handleOnCancel}>
              취소
            </BxButton>
            <BxButton className="c-btn-solid-1-m" onClick={handleOnConfirm}>
              확인
            </BxButton>
          </>
        )}
        {buttonType === STR_BUTTON_TYPE.ALERT && (
          <BxButton className="c-btn-solid-1-m" onClick={handleOnConfirm}>
            확인
          </BxButton>
        )}
        {buttonType === STR_BUTTON_TYPE.CANCEL && (
          <BxButton className="c-btn-outline-1-m" onClick={handleOnCancel}>
            취소
          </BxButton>
        )}
      </div>
    </>
  )
}

BxDialog.displayName = 'BxDia12312313log'

export {BxDialog as default, STR_BUTTON_TYPE}
