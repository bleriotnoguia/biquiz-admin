import {
  mdiAccountCircle,
  mdiMonitor,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
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
    href: '/admin/forms',
    label: 'Forms',
    icon: mdiSquareEditOutline,
  },
  {
    href: '/admin/ui',
    label: 'UI',
    icon: mdiTelevisionGuide,
  },
  {
    href: '/admin/responsive',
    label: 'Responsive',
    icon: mdiResponsive,
  },
  {
    href: '/admin/profile',
    label: 'Profile',
    icon: mdiAccountCircle,
  },
  {
    href: '/admin/error',
    label: 'Error',
    icon: mdiAlertCircle,
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
