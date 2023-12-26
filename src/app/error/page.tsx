'use client'

import React from 'react'
import Button from '@/components/Button'
import CardBox from '@/components/CardBox'
import SectionFullScreen from '@/components/Section/FullScreen'
import LayoutAuthenticated from '@/layouts/Authenticated'

const ErrorPage = () => {
  return (
    <LayoutAuthenticated>
      <SectionFullScreen bg="pinkRed">
        <CardBox
          className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl"
          footer={<Button href="/dashboard" label="Done" color="danger" />}
        >
          <div className="space-y-3">
            <h1 className="text-2xl">Unhandled exception</h1>

            <p>An Error Occurred</p>
          </div>
        </CardBox>
      </SectionFullScreen>
    </LayoutAuthenticated>
  )
}

export default ErrorPage
