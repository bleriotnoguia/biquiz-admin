import { mdiAccessPoint, mdiMonitorCellphone, mdiTableBorder } from '@mdi/js'
import React from 'react'
import Button from '../../components/Button'
import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import NotificationBar from '../../components/NotificationBar'
import SectionMain from '../../components/Section/Main'
import SectionTitleLineWithButton from '../../components/Section/TitleLineWithButton'
import TableSampleClients from '../../components/Table/SampleClients'

const QuestionsPage = () => {
  return (
    <LayoutAuthenticated>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiTableBorder} title="Questions" main>
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
      </SectionMain>
    </LayoutAuthenticated>
  )
}

export default QuestionsPage
