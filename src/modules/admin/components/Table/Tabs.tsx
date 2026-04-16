import React from 'react'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'
import Icon from '../Icon'
import { mdiTab } from '@mdi/js'

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
      <TabList className="flex space-x-4">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            className="flex p-2 rounded-sm items-center space-x-2 bg-white text-black data-[selected]:bg-blue-500 data-[selected]:text-white"
          >
            <Icon path={mdiTab} className="text-gray-500" />
            <span>{tab.name}</span>
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((tab) => (
          <TabPanel key={tab.id}>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  )
}

export default Tabs
