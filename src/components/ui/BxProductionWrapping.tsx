import StringUtil from '@/util/StringUtil'
import {useEffect, useState} from 'react'

const WRAPPING_TYPE = Object.freeze({
  DEFAULT: 'DEFAULT',
  SLIDE: 'SLIDE',
  GRID: 'GRID'
})

interface BxProductionWrappingProps {
  type?: string
  isShadow?: boolean
  isDots?: boolean
  variableWidth?: boolean
  designType?: string
  items: {}[]
  children?: any
}
interface BxProductionWrapItemProps {
  item: {}
  children?: React.ReactNode
}

const BxProductionWrapping: React.FC<BxProductionWrappingProps> = ({
  children,
  type,
  isShadow,
  isDots,
  items,
  designType,
  variableWidth,
  ...props
}) => {
  const [isWrapTypeDefault] = useState(type === WRAPPING_TYPE.DEFAULT)
  const [isWrapTypeSlide] = useState(type === WRAPPING_TYPE.SLIDE)
  const [isWrapTypeGrid] = useState(type === WRAPPING_TYPE.GRID)
  const [localIsShadow] = useState(isWrapTypeSlide && isShadow)
  const [isVariableWdith, setIsVariableWdith] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent
    const isIE11 = userAgent.includes('MSIE') || userAgent.includes('rv:11.0')
    setIsVariableWdith(!!(variableWidth && !isIE11))
  }, [])

  return (
    <div
      className={`pg-prod-item-wrapping ${StringUtil.classNames({
        'is-slide': isWrapTypeSlide,
        'is-default': isWrapTypeDefault,
        'is-grid': isWrapTypeGrid,
        'is-shadow': localIsShadow,
        'is-dots': isDots,
        'is-valiable-width': isVariableWdith
      })}`}
      data-design-type={designType}
    >
      <div className="pg-wp-lst">
        {items.map((item, index) => (
          <div className="wp-item" key={index}>
            {children(item)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BxProductionWrapping
export {WRAPPING_TYPE}
