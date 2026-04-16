import { mdiClose } from '@mdi/js'
import { ReactNode } from 'react'
import type { ColorButtonKey } from '@/modules/admin/interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBox from '.'
import CardBoxComponentTitle from './Component/Title'
import OverlayLayer from '../OverlayLayer'

type Props = {
  title: string
  buttonColor: ColorButtonKey
  buttonLabel: string
  isActive: boolean
  children: ReactNode
  onConfirm: () => void
  onCancel?: () => void
}

const CardBoxModal = ({
  title,
  buttonColor,
  buttonLabel,
  isActive,
  children,
  onConfirm,
  onCancel,
}: Props) => {
  if (!isActive) {
    return null
  }

  const footer = (
    <Buttons>
      <Button label={buttonLabel} color={buttonColor} onClick={onConfirm} />
      {!!onCancel && <Button label="Cancel" color={buttonColor} outline onClick={onCancel} />}
    </Buttons>
  )

  return (
    <OverlayLayer onClick={onCancel} className={onCancel ? 'cursor-pointer' : ''}>
      <CardBox
        className={`shadow-2xl max-h-modal w-11/12 md:w-3/4 lg:w-1/2 xl:w-5/12 z-50 cursor-default`}
        isModal
        footer={footer}
      >
        <CardBoxComponentTitle title={title}>
          {!!onCancel && (
            <Button icon={mdiClose} color="whiteDark" onClick={onCancel} small roundedFull />
          )}
        </CardBoxComponentTitle>

        <div className="space-y-3">{children}</div>
      </CardBox>
    </OverlayLayer>
  )
}

export default CardBoxModal
