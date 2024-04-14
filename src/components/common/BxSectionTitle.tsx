import React, {ReactEventHandler} from 'react'

interface BxSectionTitleProps {
  children?: any
  title?: string
  titleSize?: string
  subTitle?: string
  useRightArea?: boolean
  searchCount?: boolean
  filterCount?: boolean
  count?: any
  moreBtn?: boolean
  onClick?: () => void
}

const BxSectionTitle = ({
  children,
  title = '',
  titleSize = 'md',
  subTitle = '',
  useRightArea = true,
  searchCount = false,
  filterCount = false,
  count = 0,
  moreBtn = true,
  ...props
}: BxSectionTitleProps) => {
  function onClick() {}

  return (
    <div className="pg-section-title">
      <div className="ps-inbx">
        <div className="lt-pt">
          <span className={`tit size-${titleSize}`}>
            {title}
            {(searchCount && <em className="count">({count})</em>) ||
              (filterCount && <em className="count color-type">{count}</em>)}
          </span>
        </div>
        {useRightArea && (
          <div className="rt-pa">
            {!children && moreBtn && (
              <button className="ps-bt" onClick={onClick}>
                더보기
              </button>
            )}
            {/* aside에는 소팅&필터가 들어갈 예정 */}
            {children}
          </div>
        )}
      </div>
      {subTitle && <div className="ps-pag">{subTitle}</div>}
    </div>
  )
}

export default BxSectionTitle
