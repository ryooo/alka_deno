import React, { CSSProperties, PropsWithChildren, useMemo, useState } from 'react'

export default function Button({
  className,
  width,
  compact,
  strong,
  ruby,
  icon,
  iconPosition,
  onClick,
  children,
  href,
}: PropsWithChildren<{
  className?: string,
  width?: number | string,
  compact?: boolean,
  strong?: boolean,
  ruby?: boolean,
  icon?: JSX.Element,
  iconPosition?: { top?: number | string, left?: number | string },
  onClick?(e: React.MouseEvent): void,
  children?: any,
  href?: string,
}>) {
  const [hover, setHover] = useState(false)
  const style = useMemo(() => {
    const css: CSSProperties = {}
    if (compact) {
      css.padding = '0 16px'
    }
    if (strong) {
      css.borderWidth = '2px'
      css.fontWeight = 600
    }
    if (ruby) {
      css.paddingTop = '0.4em'
    }
    if (width) {
      css.width = width
      css.padding = 0
    }
    return css
  }, [width, ruby, strong, compact])

  return (
    <button
      className={"generalButton " + className}
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {icon && (<span style={iconPosition} className="icon">{icon}</span>)}
      {children}
    </button>
  )
}
