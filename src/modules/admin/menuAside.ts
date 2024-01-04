import {
  mdiAccountCircle,
  mdiMonitor,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiHome,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: mdiHome,
  },
  {
    href: '/admin',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/admin/questions',
    label: 'Questions',
    icon: mdiTable,
  },
  {
    href: '/admin/categories',
    label: 'Categories',
    icon: mdiTable,
  },
  {
    href: '/admin/tables',
    label: 'Tables',
    icon: mdiTable,
  },
  {
    href: '/admin/ui',
    label: 'UI',
    icon: mdiTelevisionGuide,
  },
  {
    href: '/admin/profile',
    label: 'Profile',
    icon: mdiAccountCircle,
  },
  {
    label: 'Dropdown',
    icon: mdiViewList,
    menu: [
      {
        label: 'Item One',
      },
      {
        label: 'Item Two',
      },
    ],
  },
]

export default menuAside
