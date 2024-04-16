import ObjectUtil from '@/util/ObjectUtil'
import StringUtil from '@/util/StringUtil'
import React, {useEffect, useState} from 'react'

export interface BxCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: any
  tag?: keyof JSX.IntrinsicElements
  useIcon?: boolean
  useChildren?: boolean
  classGroup?: string[]
}
export interface BxCheckboxGroupProps extends React.HTMLAttributes<HTMLElement> {
  children?: any
  value?: {[key: string]: any}[]
  items: {[key: string]: any}[]
}
const BxCheckbox = React.forwardRef<HTMLInputElement, BxCheckboxProps>(
  (
    {
      children,
      tag = 'span',
      id = '',
      name = '',
      value = '',
      useIcon = true,
      useChildren = false,
      disabled = false,
      checked = false,
      classGroup = ['c-checkbox', 'text-chkbox', 'txt'],
      onChange = () => {},
      ...props
    },
    ref
  ) => {
    const TagName = tag
    const [localId, setLocalId] = useState(id)
    const [localName, setLocalName] = useState(name)
    const [localChecked, setLocalChecked] = useState(checked)

    useEffect(() => {
      setLocalId(localId || StringUtil.getUUID())
      setLocalName(localName || localId)
    }, [])
    useEffect(() => {
      setLocalChecked(checked)
    }, [checked])

    function handleChange(e) {
      onChange(e)
      setLocalChecked(e.target.checked)
    }

    return (
      <TagName className={classGroup[0]}>
        <input
          id={localId}
          ref={ref}
          name={localName}
          value={value}
          type="checkbox"
          checked={localChecked}
          disabled={disabled}
          onChange={handleChange}
        />
        <label htmlFor={localId} className={classGroup[1]}>
          {useIcon && <i className="icon"></i>}
          {useChildren && <>{children('label')}</>}
          {!useChildren && <span className={classGroup[2]}>{children}</span>}
        </label>
        {useChildren && <>{children('suffix')}</>}
      </TagName>
    )
  }
)

const BxCheckboxGroup = React.forwardRef<HTMLDivElement, BxCheckboxGroupProps>(
  ({children, items = [], onChange = () => {}, value = [], ...props}, ref) => {
    const [localValue, setLocalValue] = useState([])

    useEffect(() => {
      setLocalValue(value)
    }, [value])

    function handleChange(e, item) {
      const isChecked = e.target?.checked
      let v = ObjectUtil.cloneDeep(localValue)
      if (isChecked) {
        v.push(item)
      } else {
        v = v.filter((_item) => !ObjectUtil.isEqual(_item, item))
      }
      onChange(v)
    }
    return (
      <div className="c-card-list-icon">
        {items.map((item, index) => (
          <div key={index} ref={ref} className="c-card-box">
            <BxCheckbox
              checked={localValue.find((_item) => ObjectUtil.isEqual(_item, item))}
              onChange={(e) => handleChange(e, item)}
            >
              {(typeof children === 'function' && children(item)) || children}
            </BxCheckbox>
          </div>
        ))}
      </div>
    )
  }
)

export {BxCheckbox as default, BxCheckboxGroup}
