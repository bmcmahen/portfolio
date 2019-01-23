import React from 'react'
import './ListItem.css'
import { Link } from 'gatsby'
import cx from 'classnames'

export const ListItem = ({
  href,
  to,
  children,
  title,
  subtitle,
  image,
  className,
}) => {
  const cs = cx('ListItem', className)

  if (href) {
    return (
      <a href={href} className={cs}>
        <Content title={title} subtitle={subtitle} image={image} />
        {children}
      </a>
    )
  }

  return (
    <Link to={to} className={cs}>
      <Content title={title} subtitle={subtitle} image={image} />
      {children}
    </Link>
  )
}

const Content = ({ title, subtitle, image }) => (
  <div className="ListItem__meta">
    <strong>{title}</strong>
    {subtitle && <div>{subtitle}</div>}
  </div>
)
