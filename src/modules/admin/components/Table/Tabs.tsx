import React from 'react'
import { Tab } from '@headlessui/react'
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
    <Tab.Group>
      <Tab.List className="flex space-x-4">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            className="flex p-2 rounded-sm items-center space-x-2 ui-selected:bg-blue-500 ui-selected:text-white ui-not-selected:bg-white ui-not-selected:text-black"
          >
            <Icon path={mdiTab} className="text-gray-500" />
            <span>{tab.name}</span>
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map((tab) => (
          <Tab.Panel key={tab.id}>{tab.content}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Tabs
