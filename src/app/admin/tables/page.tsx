import { mdiAccessPoint, mdiMonitorCellphone, mdiTableBorder, mdiTableOff } from '@mdi/js'
import React from 'react'
import Button from '@/modules/admin/components/Button'
import CardBox from '@/modules/admin/components/CardBox'
import CardBoxComponentEmpty from '@/modules/admin/components/CardBox/Component/Empty'

import NotificationBar from '@/modules/admin/components/NotificationBar'
import SectionMain from '@/modules/admin/components/Section/Main'
import SectionTitleLineWithButton from '@/modules/admin/components/Section/TitleLineWithButton'
import TableSampleClients from '@/modules/admin/components/Table/SampleClients'

const TablesPage = () => {
  return (
    <>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Tables" main>
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

        <NotificationBar color="info" icon={mdiMonitorCellphone}>
          <b>Responsive table.</b> Collapses on mobile
        </NotificationBar>

        <CardBox className="mb-6" hasTable>
          <TableSampleClients />
        </CardBox>

        <SectionTitleLineWithButton icon={mdiTableOff} title="Empty variation" />

        <NotificationBar color="danger" icon={mdiTableOff}>
          <b>Empty card.</b> When there&apos;s nothing to show
        </NotificationBar>

        <CardBox>
          <CardBoxComponentEmpty />
        </CardBox>
      </SectionMain>
    </>
  )
}

export default TablesPage
