import React, {useEffect, useRef, useState} from 'react'
import StringUtil from '@/util/StringUtil'

interface BxCheckboxProps {
  children?: any
  tag?: keyof JSX.IntrinsicElements
  classGroup?: string[]
  id?: string
  name?: string
  useIcon?: boolean
  useSlot?: boolean
  disabled?: boolean
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const BxCheckbox: React.ForwardRefRenderFunction<HTMLInputElement, BxCheckboxProps> = (
  {
    children,
    tag = 'span',
    id = '',
    name = '',
    useIcon = true,
    useSlot = false,
    disabled = false,
    checked = false,
    classGroup = ['c-checkbox', 'text-chkbox', 'txt'],
    onChange = () => {},
    ...props
  },
  ref
) => {
  const TagName = tag
  const inputRef = useRef<HTMLInputElement>(null)
  const [localId, setLocalId] = useState<string>(id)
  const [localName, setLocalName] = useState<string>(name)
  const [localChecked, setLocalChecked] = useState<boolean>(checked)

  useEffect(() => {
    setLocalId(localId || StringUtil.getUUID())
    setLocalName(localName || localId)
  }, [])
  useEffect(() => {
    setLocalChecked(checked)
  }, [checked])

  React.useImperativeHandle(ref, () => inputRef.current)

  function handleChange(e) {
    setLocalChecked(e.target.checked)
    onChange(e)
  }
  function handleClick() {}
  return (
    <TagName className={classGroup[0]}>
      <input
        id={localId}
        ref={inputRef}
        name={localName}
        type="checkbox"
        checked={localChecked}
        disabled={disabled}
        onChange={handleChange}
        onClick={handleClick}
      />
      <label htmlFor={localId} className={classGroup[1]}>
        {useIcon && <i className="icon"></i>}
        {useSlot && <>{children('label')}</>}
        {!useSlot && <span className={classGroup[2]}>{children}</span>}
      </label>
      {useSlot && <>{children('suffix')}</>}
    </TagName>
  )
}

export default React.forwardRef(BxCheckbox)
