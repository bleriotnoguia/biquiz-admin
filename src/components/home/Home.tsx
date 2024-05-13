import React from 'react'
import TwoColApp from './TwoColApp'
import NavbarCenterMenu from './NavbarCenterMenu'
import AuthButton from '../AuthButton'

export const Home = () => {
  return (
    <>
      <NavbarCenterMenu />
      <TwoColApp />
      <AuthButton />
    </>
  )
}
