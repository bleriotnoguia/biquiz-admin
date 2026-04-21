import React from 'react'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'

export type ITabs = {
  id: number
  name: string
  content: React.ReactNode
}[]

type TabsProps = {
  tabs: ITabs
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  return (
    <TabGroup>
      <TabList className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 mb-4">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            className="flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-150
              text-slate-500 dark:text-slate-400
              data-[selected]:bg-white data-[selected]:text-indigo-600 data-[selected]:shadow-sm
              dark:data-[selected]:bg-slate-700 dark:data-[selected]:text-indigo-400
              hover:text-slate-700 dark:hover:text-slate-200
              focus:outline-none"
          >
            {tab.name}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((tab) => (
          <TabPanel key={tab.id} className="focus:outline-none">
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  )
}

export default Tabs
