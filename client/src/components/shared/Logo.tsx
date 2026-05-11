import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
    <Link href="/">
        <Image src="/assets/logo.png" alt="logo" width={70} height={70} className='object-contain'/>
    </Link>
  )
}
