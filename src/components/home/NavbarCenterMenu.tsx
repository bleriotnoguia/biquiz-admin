'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LogoImg from '../../../public/img/dummylogo.svg'
import AuthButton from '../AuthButton'

export default function NavbarCenterMenu() {
  return (
    <>
      <div className="w-full ">
        <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
          <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
            <Link href="#" className="mr-2">
              <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                <Image src={LogoImg} alt="logo" />
              </span>
            </Link>

            <AuthButton />
          </div>
        </nav>
      </div>
    </>
  )
}
