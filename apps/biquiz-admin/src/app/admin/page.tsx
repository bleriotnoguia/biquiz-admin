'use client'

import {
  mdiAccessPoint,
  mdiBookOpenPageVariant,
  mdiHelpCircleOutline,
  mdiAccountMultiple,
} from '@mdi/js'
import React, { useEffect, useState } from 'react'
import Button from '@/modules/admin/components/Button'
import SectionMain from '@/modules/admin/components/Section/Main'
import SectionTitleLineWithButton from '@/modules/admin/components/Section/TitleLineWithButton'
import CardBoxWidget from '@/modules/admin/components/CardBox/Widget'
import { supabase } from '@/config/supabase'

const DashboardPage = () => {
  const [stats, setStats] = useState({
    categories: 0,
    questions: 0,
    users: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: categoriesCount } = await supabase
          .from('question_categories')
          .select('*', { count: 'exact', head: true })

        const { count: questionsCount } = await supabase
          .from('questions')
          .select('*', { count: 'exact', head: true })

        const { count: usersCount, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })

        setStats({
          categories: categoriesCount || 0,
          questions: questionsCount || 0,
          users: !usersError ? (usersCount || 0) : 0,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <SectionMain>
      <SectionTitleLineWithButton icon={mdiBookOpenPageVariant} title="Overview" main>
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
          trendLabel="Total active"
          icon={mdiBookOpenPageVariant}
          iconColor="success"
          number={stats.categories}
          label="Categories"
        />
        <CardBoxWidget
          trendLabel="All time"
          icon={mdiHelpCircleOutline}
          iconColor="info"
          number={stats.questions}
          label="Questions"
        />
        <CardBoxWidget
          trendLabel="Registered"
          icon={mdiAccountMultiple}
          iconColor="warning"
          number={stats.users}
          label="Users"
        />
      </div>
    </SectionMain>
  )
}

export default DashboardPage
