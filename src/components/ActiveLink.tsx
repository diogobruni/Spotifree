import React, { Children } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

export interface ActiveLinkProps extends LinkProps {
  children: React.ReactElement
  activeClassName?: string
  notActiveClassName?: string
}

export default function ActiveLink({ children, href, activeClassName, notActiveClassName, ...props }: ActiveLinkProps) {
  const { asPath } = useRouter()

  const child = Children.only(children)
  const childClassName = child.props.className || ''

  const className =
    asPath === href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : `${childClassName} ${notActiveClassName}`.trim()
  return (
    <Link href={href} {...props}>
      {React.cloneElement(children, { className: className || null })}
    </Link>
  )
}