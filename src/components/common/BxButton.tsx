'use client'
import StringUtil from '@/util/StringUtil'
import ObjectUtil from '@/util/ObjectUtil'
import {useEffect, useState} from 'react'

interface BxButtonProps {
  children?: React.ReactNode
  href?: string
  id?: string
  title?: string
  target?: string
  disabled?: boolean
  readonly?: boolean
  className?: string
  onClick?: (e?) => void
}

const BxButton: React.FC<BxButtonProps> = ({
  children,
  href,
  id,
  title,
  target = '_self',
  disabled = false,
  ...props
}) => {
  const [localId, setLocalId] = useState(id)

  useEffect(() => {
    setLocalId(localId || StringUtil.getUUID())
  }, [])

  return (
    <>
      {(ObjectUtil.isEmpty(href) && (
        <button id={localId} disabled={disabled} {...props}>
          {children}
        </button>
      )) || (
        <a id={localId} href={href} target={target} title={title} {...props}>
          {children}
        </a>
      )}
    </>
  )
}

export default BxButton
