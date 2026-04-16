'use client'

import { useRef, useState } from 'react'
import {
  mdiAccessPoint,
  mdiAccount,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiMail,
} from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import Button from '@/modules/admin/components/Button'
import Buttons from '@/modules/admin/components/Buttons'
import CardBox from '@/modules/admin/components/CardBox'
import CardBoxComponentBody from '@/modules/admin/components/CardBox/Component/Body'
import CardBoxComponentFooter from '@/modules/admin/components/CardBox/Component/Footer'
import FormField from '@/modules/admin/components/Form/Field'
import SectionMain from '@/modules/admin/components/Section/Main'
import SectionTitleLineWithButton from '@/modules/admin/components/Section/TitleLineWithButton'
import CardBoxUser from '@/modules/admin/components/CardBox/User'
import type { UserForm } from '@/modules/admin/interfaces'
import { useAppDispatch, useAppSelector } from '@/config/store'
import { supabase } from '@/config/supabase'
import { setSessionFromLocalSessionData } from '@/modules/auth/auth.actions'
import { Session } from '@/types/user'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const userName = useAppSelector((state) => state.auth.session.user?.name)
  const userEmail = useAppSelector((state) => state.auth.session.user?.email)
  const userId = useAppSelector((state) => state.auth.session.user?.id)
  const avatarFileInputRef = useRef<HTMLInputElement | null>(null)
  const [isAvatarUploading, setIsAvatarUploading] = useState(false)

  const userForm: UserForm = {
    name: userName ?? '',
    email: userEmail ?? '',
  }

  const handleProfileSubmit = async (values: UserForm) => {
    const { error } = await supabase.auth.updateUser({
      email: values.email,
      data: { full_name: values.name },
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Profile updated! Check your email if you changed it.')
    }
  }

  const handlePasswordSubmit = async (
    values: { currentPassword: string; newPassword: string; newPasswordConfirmation: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!values.newPassword) {
      toast.error('Please enter a new password.')
      return
    }
    if (values.newPassword !== values.newPasswordConfirmation) {
      toast.error('Passwords do not match.')
      return
    }
    if (values.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters.')
      return
    }

    // Re-authenticate with current password first
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail ?? '',
      password: values.currentPassword,
    })

    if (signInError) {
      toast.error('Current password is incorrect.')
      return
    }

    const { error } = await supabase.auth.updateUser({ password: values.newPassword })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Password updated successfully!')
      resetForm()
    }
  }

  const uploadAvatarToSupabase = async (file: File | null) => {
    if (!file || !userId || isAvatarUploading) return

    const maxSizeInBytes = 500 * 1024
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

    if (!acceptedTypes.includes(file.type)) {
      toast.error('Unsupported format. Please use JPG, PNG, GIF, or WEBP.')
      return
    }

    if (file.size > maxSizeInBytes) {
      toast.error('Image is too large. Max size is 500kb.')
      return
    }

    setIsAvatarUploading(true)

    try {
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const filePath = `${userId}/avatar-${Date.now()}.${extension}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      })

      if (uploadError) {
        toast.error(uploadError.message)
        return
      }

      const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath)
      const avatarUrl = publicUrlData.publicUrl

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: avatarUrl },
      })

      if (updateError) {
        toast.error(updateError.message)
        return
      }

      const { data: sessionData } = await supabase.auth.getSession()

      if (sessionData.session) {
        dispatch(setSessionFromLocalSessionData(sessionData.session as Session))
      }

      toast.success('Profile picture updated successfully!')
    } finally {
      setIsAvatarUploading(false)
    }
  }

  const handleAvatarClick = () => {
    if (isAvatarUploading) return
    avatarFileInputRef.current?.click()
  }

  return (
    <SectionMain>
      <SectionTitleLineWithButton icon={mdiAccount} title="Profile" main>
        <Button
          href="https://biquiz.bleriotnoguia.com"
          target="_blank"
          icon={mdiAccessPoint}
          label="Open Biquiz App"
          color="contrast"
          roundedFull
          small
        />
      </SectionTitleLineWithButton>

      {/* Profile header */}
      <input
        ref={avatarFileInputRef}
        type="file"
        className="hidden"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={(event) => void uploadAvatarToSupabase(event.currentTarget.files?.[0] ?? null)}
      />
      <CardBoxUser
        className="mb-6"
        onAvatarClick={handleAvatarClick}
        isAvatarUploading={isAvatarUploading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: account info */}
        <div className="flex flex-col gap-6">
          {/* Account info */}
          <CardBox className="flex-1" hasComponentLayout>
            <Formik initialValues={userForm} onSubmit={handleProfileSubmit} enableReinitialize>
              {({ isSubmitting }) => (
                <Form className="flex flex-col flex-1">
                  <CardBoxComponentBody>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">
                      Account information
                    </p>
                    <FormField
                      label="Name"
                      help="Your display name"
                      labelFor="name"
                      icons={[mdiAccount]}
                    >
                      <Field name="name" id="name" placeholder="Your name" />
                    </FormField>
                    <FormField
                      label="E-mail"
                      help="A confirmation will be sent if you change this"
                      labelFor="email"
                      icons={[mdiMail]}
                    >
                      <Field name="email" id="email" type="email" placeholder="Your e-mail" />
                    </FormField>
                  </CardBoxComponentBody>
                  <CardBoxComponentFooter>
                    <Buttons>
                      <Button
                        color="info"
                        type="submit"
                        label={isSubmitting ? 'Saving...' : 'Save changes'}
                        roundedFull
                        disabled={isSubmitting}
                      />
                    </Buttons>
                  </CardBoxComponentFooter>
                </Form>
              )}
            </Formik>
          </CardBox>
        </div>

        {/* Right: change password */}
        <CardBox hasComponentLayout>
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              newPasswordConfirmation: '',
            }}
            onSubmit={handlePasswordSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col flex-1">
                <CardBoxComponentBody>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">
                    Change password
                  </p>
                  <FormField
                    label="Current password"
                    help="Required to confirm your identity"
                    labelFor="currentPassword"
                    icons={[mdiAsterisk]}
                  >
                    <Field
                      name="currentPassword"
                      id="currentPassword"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                    />
                  </FormField>

                  <div className="my-4 border-t border-gray-100 dark:border-slate-700" />

                  <FormField
                    label="New password"
                    help="Minimum 6 characters"
                    labelFor="newPassword"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field
                      name="newPassword"
                      id="newPassword"
                      type="password"
                      autoComplete="new-password"
                      placeholder="••••••••"
                    />
                  </FormField>

                  <FormField
                    label="Confirm new password"
                    labelFor="newPasswordConfirmation"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field
                      name="newPasswordConfirmation"
                      id="newPasswordConfirmation"
                      type="password"
                      autoComplete="new-password"
                      placeholder="••••••••"
                    />
                  </FormField>
                </CardBoxComponentBody>

                <CardBoxComponentFooter>
                  <Buttons>
                    <Button
                      color="info"
                      type="submit"
                      label={isSubmitting ? 'Updating...' : 'Update password'}
                      roundedFull
                      disabled={isSubmitting}
                    />
                  </Buttons>
                </CardBoxComponentFooter>
              </Form>
            )}
          </Formik>
        </CardBox>
      </div>
    </SectionMain>
  )
}

export default ProfilePage
