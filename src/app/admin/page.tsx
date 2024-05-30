'use client'

import {
  mdiAccessPoint,
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
} from '@mdi/js'
import React from 'react'
import Button from '@/modules/admin/components/Button'
import SectionMain from '@/modules/admin/components/Section/Main'
import SectionTitleLineWithButton from '@/modules/admin/components/Section/TitleLineWithButton'
import CardBoxWidget from '@/modules/admin/components/CardBox/Widget'
import SectionBannerStarOnGitHub from '@/modules/admin/components/Section/Banner/StarOnGitHub'

const DashboardPage = () => {
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

      <div className="my-6">
        <SectionBannerStarOnGitHub />
      </div>
    </SectionMain>
  )
}

export default DashboardPage
