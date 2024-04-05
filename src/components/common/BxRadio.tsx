import StringUtil from '@/util/StringUtil'
import React, {useEffect, useState} from 'react'

interface BxRadioProps {
  children?: React.ReactNode
  useIcon?: boolean
  id?: string
  name?: string
}
interface GroupProps {
  children?: any
  items?: any[]
  useChildren?: boolean
}

const BxRadio: React.FC<BxRadioProps> & {
  Group?: React.FC<GroupProps>
} = ({children, useIcon = true, id = '', name = '', ...props}) => {
  const [localId, setLocalId] = useState<string>('')

  useEffect(() => {
    setLocalId(id || StringUtil.getUUID())
  }, [])

  return (
    <span className="c-radio">
      <input type="radio" name={name || localId} id={localId} value="1" />
      <label htmlFor={localId} className="text-radio">
        {useIcon && <i className="icon"></i>}
        <span className="blind">asd123123123f</span>
        <span className="txt">{children}</span>
      </label>
    </span>
  )
}

BxRadio.Group = ({items = [], children, useChildren = true, ...props}) => {
  return (
    <ul className="c-card-list">
      {items.map((item, index) => (
        <li key={index}>
          <div className="c-card-box">
            {(useChildren && children(item)) || <BxRadio name="swmnxq11">{`${item['codeName']} 123123123123`}</BxRadio>}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default BxRadio
