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
import SectionBannerStarOnGitHub from '@/modules/admin/components/Section/Banner/StarOnGitHub'
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
        // Fetch categories count
        const { count: categoriesCount } = await supabase
          .from('question_categories')
          .select('*', { count: 'exact', head: true })

        // Fetch questions count
        const { count: questionsCount } = await supabase
          .from('questions')
          .select('*', { count: 'exact', head: true })

        // Fetch users count (assuming a profiles or users table exists, fallback to 0 if error)
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
          trendLabel="Active"
          trendType="up"
          trendColor="success"
          icon={mdiBookOpenPageVariant}
          iconColor="success"
          number={stats.categories}
          label="Categories"
        />
        <CardBoxWidget
          trendLabel="Total"
          trendType="up"
          trendColor="info"
          icon={mdiHelpCircleOutline}
          iconColor="info"
          number={stats.questions}
          label="Questions"
        />
        <CardBoxWidget
          trendLabel="Registered"
          trendType="up"
          trendColor="warning"
          icon={mdiAccountMultiple}
          iconColor="warning"
          number={stats.users}
          label="Users"
        />
      </div>

      <div className="my-6">
        <SectionBannerStarOnGitHub />
      </div>
    </SectionMain>
  )
}

export default DashboardPage
