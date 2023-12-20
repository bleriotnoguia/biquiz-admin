import React from 'react'
import TwoColImage from './TwoColImage'
import NavbarCenterMenu from './NavbarCenterMenu'
import AuthButton from '../AuthButton'

export const Home = () => {
  return (
    <>
      <NavbarCenterMenu />
      <TwoColImage />
      <AuthButton />
    </>
  )
}
