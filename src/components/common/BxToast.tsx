import useTransitionEffect from '@/hooks/useTransitionEffect'
import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import StringUtil from '@/util/StringUtil'

interface BxToastProps {
  children?: React.ReactNode
  timeout?: number
  isShow?: {
    data?: boolean
    setData?: Dispatch<SetStateAction<boolean>>
  }
}

const BxToast: React.FC<BxToastProps> = ({
  children,
  timeout = 50000,
  isShow = {
    data: false,
    setData: () => {}
  },
  ...props
}) => {
  const {CSSTransition, TransitionGroup} = useTransitionEffect()
  const [isLocalShow, setLocalShow] = useState<{data?: boolean; setData?: Dispatch<SetStateAction<boolean>>}>(isShow)
  const [localTimeoutState, setLocalTimeoutState] = useState<{
    timeout?: number
    fatoryTimeout?: NodeJS.Timeout
  }>({
    timeout,
    fatoryTimeout: setTimeout(() => {})
  })

  const modalClassName = `__MODAL_TOAST_ITEM_${StringUtil.getUUID().toUpperCase()}__`

  useEffect(() => {
    setLocalShow((prevState) => ({
      ...prevState,
      data: isShow.data
    }))
  }, [isShow])

  useEffect(() => {
    if (isLocalShow.data) {
      const timout = setTimeout(() => {
        isLocalShow.setData(false)
      }, localTimeoutState.timeout)
      setLocalTimeoutState((prevState) => ({
        ...prevState,
        fatoryTimeout: timout
      }))

      return () => {
        clearTimeout(localTimeoutState.fatoryTimeout)
      }
    }
    setLocalShow((prevState) => ({
      ...prevState,
      data: isLocalShow.data
    }))
  }, [isLocalShow.data])

  function handleOnClick() {
    isLocalShow.setData(false)
  }

  return (
    <>
      {isLocalShow.data &&
        ReactDOM.createPortal(
          <div className={`${modalClassName} animate__animated animate__fadeIn `}>
            <button className="c-toast" onClick={handleOnClick}>
              {children}
            </button>
          </div>,
          document.getElementById('__MODAL_TOAST_WRAPPING__')
        )}
    </>
  )
}

export default BxToast
