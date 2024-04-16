import ObjectUtil from '@/util/ObjectUtil'
import StringUtil from '@/util/StringUtil'
import React, {useEffect, useState} from 'react'

export interface BxRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  useIcon?: boolean
  tag?: keyof JSX.IntrinsicElements
  useLabelChildren?: boolean
}

export interface BxRadioGroupProps extends React.HTMLAttributes<HTMLElement> {
  children?: any
  name?: string
  codeId?: string
  codeName?: string
  useIcon?: boolean
  returnObject?: boolean
  value?: string | {[key: string]: any}
  items?: {[key: string]: any}[]
}

const STRING_KEY_NAME = Object.freeze({
  CODE_ID: 'codeId',
  CODE_NAME: 'codeName'
})

const BxRadio = React.forwardRef<HTMLInputElement, BxRadioProps>(
  (
    {
      children,
      useIcon = false,
      tag = 'span',
      id = '',
      name = '',
      value = '',
      onChange = () => {},
      onClick = () => {},
      useLabelChildren = false,
      checked = false,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const TagName = tag
    const [localId, setLocalId] = useState('')
    const [localChecked, setLocalChecked] = useState(checked)

    useEffect(() => {
      setLocalId(id || StringUtil.getUUID())
    }, [])
    useEffect(() => {
      setLocalChecked(checked)
    }, [checked])

    function handleChange(e) {
      onChange(e)
    }
    function hanndleClick(e) {
      if (!checked && !value) {
        setLocalChecked(true)
      }
    }

    return (
      <TagName className="c-radio">
        <input
          ref={ref}
          type="radio"
          name={name || localId}
          id={localId}
          readOnly={readOnly}
          value={value}
          checked={localChecked}
          onChange={handleChange}
          onClick={hanndleClick}
        />
        <label htmlFor={localId} className="text-radio">
          {useIcon && <i className="icon"></i>}
          <span className="blind">{`${name} 라디오버튼`}</span>
          {(useLabelChildren && <>{children}</>) || <span className="txt">{children}</span>}
        </label>
      </TagName>
    )
  }
)

const BxRadioGroup = React.forwardRef<HTMLDivElement, BxRadioGroupProps>(
  (
    {
      children,
      codeId = STRING_KEY_NAME.CODE_ID,
      codeName = STRING_KEY_NAME.CODE_NAME,
      id = '',
      name = '',
      items = [],
      onChange = () => {},
      value = {},
      returnObject = false,
      ...props
    },
    ref
  ) => {
    const [localValue, setLocalValue] = useState(value)
    const [localName, setLocalName] = useState(name)

    useEffect(() => {
      const _uid = StringUtil.getUUID().toUpperCase()
      setLocalName(name || _uid)
    }, [])

    useEffect(() => {
      setLocalValue(value)
    }, [value])

    function handleChange(item) {
      onChange(gubunReturnObject(item))
    }

    function gubunReturnObject(item) {
      let o = ObjectUtil.cloneDeep(item)
      if (!returnObject) {
        o = o[codeId]
      }
      return o
    }

    return (
      <div className="c-radio-group">
        {items.map((item, index) => (
          <div key={index} ref={ref} className="c-radio-box">
            <BxRadio
              className="text-radio"
              value={item[codeId]}
              name={`__RADIO_GROUP_NAME_${localName}`}
              checked={ObjectUtil.isEqual(localValue, gubunReturnObject(item))}
              useIcon={props.useIcon}
              useLabelChildren={true}
              onChange={() => handleChange(item)}
            >
              {(typeof children === 'function' && children(item)) || children}
            </BxRadio>
          </div>
        ))}
      </div>
    )
  }
)

BxRadio.displayName = 'BxRadio'
BxRadioGroup.displayName = 'BxRadioGroup'

export {BxRadio as default, BxRadioGroup, STRING_KEY_NAME}
