'use client'

import React from 'react'
import Button from '@/modules/admin/components/Button'
import CardBox from '@/modules/admin/components/CardBox'
import SectionFullScreen from '@/modules/admin/components/Section/FullScreen'

const ErrorPage = () => {
  return (
    <>
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
    </>
  )
}

export default ErrorPage
