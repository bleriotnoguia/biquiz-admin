import { mdiClose } from '@mdi/js'
import { ReactNode } from 'react'
import type { ColorButtonKey } from '@/modules/admin/interfaces'
import Button from '../Button'
import Buttons from '../Buttons'
import CardBox from '.'
import CardBoxComponentTitle from './Component/Title'
import CardBoxComponentBody from './Component/Body'
import CardBoxComponentFooter from './Component/Footer'
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
      <Button label={buttonLabel} color={buttonColor} onClick={onConfirm} roundedFull />
      {!!onCancel && <Button label="Cancel" color="whiteDark" outline={false} onClick={onCancel} roundedFull />}
    </Buttons>
  )

  return (
    <OverlayLayer onClick={onCancel} className={onCancel ? 'cursor-pointer' : ''}>
      <CardBox
        className={`shadow-2xl max-h-modal w-11/12 md:w-3/4 lg:w-1/2 xl:w-5/12 z-50 cursor-default overflow-hidden`}
        isModal
        hasComponentLayout
      >
        <CardBoxComponentBody className="overflow-hidden">
          <CardBoxComponentTitle title={title}>
            {!!onCancel && (
              <Button icon={mdiClose} color="whiteDark" onClick={onCancel} small roundedFull />
            )}
          </CardBoxComponentTitle>

          <div className="flex-1 min-h-0 space-y-3 overflow-y-auto pr-1">{children}</div>
        </CardBoxComponentBody>
        <CardBoxComponentFooter>{footer}</CardBoxComponentFooter>
      </CardBox>
    </OverlayLayer>
  )
}

export default CardBoxModal
