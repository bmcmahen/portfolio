import React from 'react'
import './ListItem.css'
import { Link } from 'gatsby'
import cx from 'classnames'

export const ListItem = ({
  href,
  to,
  children,
  title,
  date,
  subtitle,
  image,
  className,
}) => {
  const cs = cx('ListItem', className)

  if (href) {
    return (
      <a href={href} className={cs}>
        <Content title={title} date={date} subtitle={subtitle} image={image} />
        {children}
      </a>
    )
  }

  return (
    <Link to={to} className={cs}>
      <Content date={date} title={title} subtitle={subtitle} image={image} />
      {children}
    </Link>
  )
}

const Content = ({ date, title, subtitle, image }) => (
  <div className="ListItem__meta">
    <strong>{title}</strong>
    <div
      style={{
        color: 'rgba(0,0,0,0.65)',
        marginBottom: '0.25rem',
        marginTop: '0.25rem',
      }}
      className="Blog_date"
    >
      {date}
    </div>
    {subtitle && <div>{subtitle}</div>}
  </div>
)
