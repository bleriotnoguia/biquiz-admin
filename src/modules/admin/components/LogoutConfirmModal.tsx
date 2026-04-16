'use client'

import CardBoxModal from './CardBox/Modal'

type Props = {
  isActive: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function LogoutConfirmModal({ isActive, onConfirm, onCancel }: Props) {
  return (
    <CardBoxModal
      title="Confirm logout"
      buttonColor="info"
      buttonLabel="Logout"
      isActive={isActive}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Are you sure you want to log out from your current session?
      </p>
    </CardBoxModal>
  )
}
