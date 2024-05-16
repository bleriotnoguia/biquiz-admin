'use client'

import React, { ReactNode } from 'react'
import { useState } from 'react'
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js'
import menuAside from '@/modules/admin/menuAside'
import Icon from '@/modules/admin/components/Icon'
import NavBar from '@/modules/admin/components/NavBar'
import NavBarItemPlain from '@/modules/admin/components/NavBar/Item/Plain'
import AsideMenu from '@/modules/admin/components/AsideMenu'
import FooterBar from '@/modules/admin/components/FooterBar'
import FormField from '@/modules/admin/components/Form/Field'
import { Field, Form, Formik } from 'formik'
import Loading from '@/components/Loading'
import menuNavBar from '@/modules/admin/menuNavBar'
import { useLoggedInUserData } from '@/hooks/useLoggedInUserData'
import { Toaster } from 'react-hot-toast'

type Props = {
  children: ReactNode
}

export default function LayoutAuthenticated({ children }: Props) {
  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false)
  const [isAsideLgActive, setIsAsideLgActive] = useState(false)

  const { isLoggedInSession } = useLoggedInUserData(true)

  // const router = useRouter()

  // useEffect(() => {
  //   const handleRouteChangeStart = () => {
  //     setIsAsideMobileExpanded(false)
  //     setIsAsideLgActive(false)
  //   }

  //   router.events.on('routeChangeStart', handleRouteChangeStart)
  //   router.

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChangeStart)
  //   }
  // }, [router.events])

  const layoutAsidePadding = 'xl:pl-60'

  return (
    <>
      {isLoggedInSession ? (
        <div className={`overflow-hidden lg:overflow-visible`}>
          <div
            className={`${layoutAsidePadding} ${
              isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''
            } pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100`}
          >
            <NavBar
              menu={menuNavBar}
              className={`${layoutAsidePadding} ${isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''}`}
            >
              <NavBarItemPlain
                display="flex lg:hidden"
                onClick={() => setIsAsideMobileExpanded(!isAsideMobileExpanded)}
              >
                <Icon path={isAsideMobileExpanded ? mdiBackburger : mdiForwardburger} size="24" />
              </NavBarItemPlain>
              <NavBarItemPlain
                display="hidden lg:flex xl:hidden"
                onClick={() => setIsAsideLgActive(true)}
              >
                <Icon path={mdiMenu} size="24" />
              </NavBarItemPlain>
              <NavBarItemPlain useMargin>
                <Formik
                  initialValues={{
                    search: '',
                  }}
                  onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
                >
                  <Form>
                    <FormField isBorderless isTransparent>
                      <Field name="search" placeholder="Search" />
                    </FormField>
                  </Form>
                </Formik>
              </NavBarItemPlain>
            </NavBar>
            <AsideMenu
              isAsideMobileExpanded={isAsideMobileExpanded}
              isAsideLgActive={isAsideLgActive}
              menu={menuAside}
              onAsideLgClose={() => setIsAsideLgActive(false)}
            />
            <Toaster />
            {children}
            <FooterBar>
              | Open{` `}
              <a
                href="https://biquiz.bleriotnoguia.com"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600"
              >
                Biquiz
              </a>
            </FooterBar>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
