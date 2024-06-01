import { mdiAccountCircle, mdiMonitor, mdiTable, mdiTelevisionGuide, mdiHome } from '@mdi/js'
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
    href: '/admin/ui',
    label: 'UI',
    icon: mdiTelevisionGuide,
  },
  {
    href: '/admin/profile',
    label: 'Profile',
    icon: mdiAccountCircle,
  },
]

export default menuAside
