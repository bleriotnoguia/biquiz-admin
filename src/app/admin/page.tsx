'use client'

import {
  mdiAccessPoint,
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
} from '@mdi/js'
import React, { useState } from 'react'
import Button from '@/modules/admin/components/Button'
import SectionMain from '@/modules/admin/components/Section/Main'
import SectionTitleLineWithButton from '@/modules/admin/components/Section/TitleLineWithButton'
import CardBoxWidget from '@/modules/admin/components/CardBox/Widget'
import { useSampleClients, useSampleTransactions } from '@/modules/admin/hooks/sampleData'
import CardBoxTransaction from '@/modules/admin/components/CardBox/Transaction'
import { Client, Transaction } from '@/modules/admin/interfaces'
import CardBoxClient from '@/modules/admin/components/CardBox/Client'
import SectionBannerStarOnGitHub from '@/modules/admin/components/Section/Banner/StarOnGitHub'
import CardBox from '@/modules/admin/components/CardBox'
import { sampleChartData } from '@/modules/admin/components/ChartLineSample/config'
import ChartLineSample from '@/modules/admin/components/ChartLineSample'
import NotificationBar from '@/modules/admin/components/NotificationBar'
import TableSampleClients from '@/modules/admin/components/Table/SampleClients'

const DashboardPage = () => {
  const { clients } = useSampleClients()
  const { transactions } = useSampleTransactions()

  const clientsListed = clients.slice(0, 4)

  const [chartData, setChartData] = useState(sampleChartData())

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault()

    setChartData(sampleChartData())
  }

  return (
    <SectionMain>
      <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Overview" main>
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          trendLabel="12%"
          trendType="up"
          trendColor="success"
          icon={mdiAccountMultiple}
          iconColor="success"
          number={512}
          label="Clients"
        />
        <CardBoxWidget
          trendLabel="16%"
          trendType="down"
          trendColor="danger"
          icon={mdiCartOutline}
          iconColor="info"
          number={7770}
          numberPrefix="$"
          label="Sales"
        />
        <CardBoxWidget
          trendLabel="Overflow"
          trendType="warning"
          trendColor="warning"
          icon={mdiChartTimelineVariant}
          iconColor="danger"
          number={256}
          numberSuffix="%"
          label="Performance"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col justify-between">
          {transactions.map((transaction: Transaction) => (
            <CardBoxTransaction key={transaction.id} transaction={transaction} />
          ))}
        </div>
        <div className="flex flex-col justify-between">
          {clientsListed.map((client: Client) => (
            <CardBoxClient key={client.id} client={client} />
          ))}
        </div>
      </div>

      <div className="my-6">
        <SectionBannerStarOnGitHub />
      </div>

      <SectionTitleLineWithButton icon={mdiChartPie} title="Trends overview">
        <Button icon={mdiReload} color="whiteDark" onClick={fillChartData} />
      </SectionTitleLineWithButton>

      <CardBox className="mb-6">{chartData && <ChartLineSample data={chartData} />}</CardBox>

      <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Clients" />

      <NotificationBar color="info" icon={mdiMonitorCellphone}>
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar>

      <CardBox hasTable>
        <TableSampleClients />
      </CardBox>
    </SectionMain>
  )
}

export default DashboardPage
