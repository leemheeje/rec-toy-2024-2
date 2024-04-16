import StringUtil from '@/util/StringUtil'
import RegExps from '@/constant/RegExps'
import React, {
  ForwardRefRenderFunction,
  useRef,
  useImperativeHandle,
  useState,
  FocusEvent,
  useEffect,
  ChangeEventHandler
} from 'react'

interface BxInputFieldProps {
  children?: React.ReactNode
  id?: string
  name?: string
  inputFilter?: keyof typeof INPUT_FILTER
  placeholder?: string
  title?: string
  value?: string
  disabled?: boolean
  readonly?: boolean
  isSuccess?: boolean
  isError?: boolean
  isClear?: boolean
  maxlength?: number
  isBlind?: boolean
  textMessage?: string
  ariaDescribedby?: string
  inputType?: string
  onInput?: (e?: React.KeyboardEvent<HTMLInputElement>) => void
  onChange?: (e?: ChangeEventHandler<HTMLInputElement>) => void
  onFocus?: (e?: FocusEvent<HTMLInputElement>) => void
  onBlur?: (e?: FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (e?: React.KeyboardEvent<HTMLInputElement>) => void
}

const INPUT_FILTER = Object.freeze({
  ALPHANUMERIC: 'ALPHANUMERIC',
  NUMBER: 'NUMBER',
  SPECIAL: 'SPECIAL',
  KO: 'KO',
  EN: 'EN',
  ALL: ''
})

const BxInputField: ForwardRefRenderFunction<HTMLInputElement, BxInputFieldProps> = (
  {
    children,
    id = '',
    name = '',
    placeholder = '',
    title = '',
    value = '',
    inputFilter = INPUT_FILTER.ALL,
    disabled = false,
    readonly = false,
    isSuccess = false,
    isError = false,
    isClear = true,
    maxlength = 100,
    isBlind = true,
    textMessage = '',
    ariaDescribedby = '',
    inputType = 'text',
    onInput = () => {},
    onChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onKeyDown = () => {},
    ...props
  },
  ref
) => {
  const localRef = useRef<HTMLInputElement>(null)
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [localId, setLocalId] = useState<string>(id)
  const [localName, setLocalName] = useState<string>(name)
  const [localValue, setLocalValue] = useState<string>(value)

  useEffect(() => {
    if (!localId) {
      setLocalId(StringUtil.getUUID())
      setLocalName(localId)
    }
  }, [])
  useEffect(() => {
    setLocalValue(setValue(value))
  }, [value])

  function setValue(v) {
    let _value = v
    if (inputFilter === INPUT_FILTER.KO) {
      _value = _value.replace(RegExps.REPLACE_ONLY_KO, '')
    }
    if (inputFilter === INPUT_FILTER.EN) {
      _value = _value.replace(RegExps.REPLACE_ONLY_EN, '')
    }
    if (inputFilter === INPUT_FILTER.SPECIAL) {
      _value = _value.replace(RegExps.REPLACE_ONLY_SPECIAL, '')
    }
    localRef.current.value = _value
    return _value
  }

  function handleInputFocus(e) {
    setIsFocus(true)
    onFocus()
  }
  function handleInputBlur(e) {
    setIsFocus(false)
    onBlur()
  }
  function handleInput(e) {
    setLocalValue(setValue(e.target.value))
    onInput(e)
  }

  useImperativeHandle(ref, () => localRef.current)
  // useImperativeHandle(ref, () => ({
  //   focus: () => {
  //     localRef.current?.focus() // 현재 ref에 포커스를 설정합니다.
  //   }
  // }))

  return (
    <div
      className={`c-inpform ${StringUtil.classNames({
        'is-err': isError,
        'is-sus': isSuccess,
        'is-clear': isClear,
        'is-focus': isFocus
      })}`}
    >
      <div className="c-inpitem">
        <input
          type={inputType}
          ref={localRef}
          value={localValue}
          id={localId}
          className="c-inp"
          name={localName}
          title={title}
          disabled={disabled}
          maxLength={maxlength}
          readOnly={readonly}
          onInput={handleInput}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {children}
        <button className="c-btn-clear" title="입력한 문자 삭제">
          <span className="is-blind">삭제</span>
        </button>
      </div>
      {textMessage && <p className="text-msg">{textMessage}</p>}
    </div>
  )
}

export default React.forwardRef(BxInputField)
export {INPUT_FILTER}
