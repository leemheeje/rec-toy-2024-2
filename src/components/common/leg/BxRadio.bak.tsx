import _isEqual from 'lodash/isEqual'
import StringUtil from '@/util/StringUtil'
import React, {useEffect, useState} from 'react'

interface BxRadioProps {
  children?: React.ReactNode
  useIcon?: boolean
  checked?: boolean
  readonly?: boolean
  id?: string
  name?: string
  value?: string
  onChange?: (e?) => void
  onClick?: (e?) => void
}
interface GroupProps {
  children?: any
  items?: any[]
  useChildren?: boolean
  returnObject?: boolean
  codeId?: string
  codeName?: string
  value?: any
  onChange?: (e?) => void
}

const BxRadio: React.FC<BxRadioProps> & {
  Group?: React.FC<GroupProps>
} = ({
  children,
  useIcon = true,
  id = '',
  name = '',
  value = '',
  onChange = () => {},
  onClick = () => {},
  checked = false,
  readonly = false,
  ...props
}) => {
  const [localId, setLocalId] = useState<string>('')
  const [localChecked, setLocalChecked] = useState(checked)

  useEffect(() => {
    setLocalId(id || StringUtil.getUUID())
    console.log(`${id}--------------`, checked)
  }, [])

  return (
    <span className="c-radio">
      <input
        type="radio"
        name={name || localId}
        id={localId}
        readOnly={readonly}
        value={value}
        checked={checked}
        onChange={onChange}
        onClick={onClick}
      />
      <label htmlFor={localId} className="text-radio">
        {useIcon && <i className="icon"></i>}
        <span className="blind">{`${name} 라디오버튼`}</span>
        <span className="txt">{children}</span>
      </label>
    </span>
  )
}

BxRadio.Group = ({
  items = [],
  codeId = 'codeId',
  codeName = 'codeName',
  children,
  useChildren = true,
  onChange = () => {},
  returnObject = true,
  ...props
}) => {
  function handleOnChange(item) {
    let o = {}
    if (returnObject) {
      o = item
    } else {
      o = item[codeId]
    }
    onChange(o)
  }
  return (
    <ul className="c-radio-group">
      {items.map((item, index) => (
        <li key={index}>
          <div className="c-radio-box">
            <BxRadio checked={_isEqual(props.value, item)} onChange={() => handleOnChange(item)}>
              {(useChildren && children(item)) || item['codeName']}
            </BxRadio>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default BxRadio
