import React from 'react'
import BxCheckbox from '@/components/common/BxCheckbox'

interface BxCheckboxGroupProps {
  children?: (item: any) => React.ReactNode
  classGroup?: [string, string, any[]]
  items?: object[]
  useChildrenItem?: boolean
  codeId?: string
  codeName?: string
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void
}

const STR_KEY_NAME = Object.freeze({
  codeId: 'codeId',
  codeName: 'codeName'
})

const BxCheckboxGroup: React.FC<BxCheckboxGroupProps> = ({
  children,
  classGroup = ['c-card-list', 'c-card-box', []],
  items = [],
  codeId = STR_KEY_NAME.codeId,
  codeName = STR_KEY_NAME.codeName,
  useChildrenItem = false,
  onChange = () => {},
  ...props
}) => {
  function handleOnChange(e) {
    onChange(e)
  }
  return (
    <>
      {(items.length && (
        <ul className={classGroup[0]}>
          {items.map((item, index) => (
            <li key={index}>
              <div className={classGroup[1]}>
                {(useChildrenItem && children(item)) || (
                  <BxCheckbox onChange={handleOnChange} {...props}>
                    {item[codeName]}
                  </BxCheckbox>
                )}
              </div>
            </li>
          ))}
        </ul>
      )) ||
        null}
    </>
  )
}

export {BxCheckboxGroup as default, STR_KEY_NAME}
