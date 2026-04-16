'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import LogoImg from '../../../public/img/dummylogo.svg'
import AuthButton from '../AuthButton'

export default function NavbarCenterMenu() {
  return (
    <div className="w-full border-b border-gray-100 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container relative flex flex-wrap items-center justify-between px-6 py-4 mx-auto lg:justify-between xl:px-0">
        <Disclosure>
          <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={LogoImg} alt="Biquiz logo" width={32} height={32} />
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Biquiz</span>
            </Link>

            <DisclosureButton
              aria-label="Toggle Menu"
              className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-50 focus:outline-none dark:text-gray-300 dark:focus:bg-slate-700"
            >
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              </svg>
            </DisclosureButton>

            <DisclosurePanel className="flex flex-wrap w-full my-4 lg:hidden">
              <AuthButton />
            </DisclosurePanel>
          </div>

          <div className="hidden text-center lg:flex lg:items-center">
            <ul className="items-center justify-end flex-1 list-none lg:flex">
              <AuthButton />
            </ul>
          </div>
        </Disclosure>
      </nav>
    </div>
  )
}
