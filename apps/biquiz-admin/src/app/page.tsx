import type { Metadata } from 'next'
import { Home } from '../components/home/Home'

export const metadata: Metadata = {
  title: 'Biquiz Admin',
  description: 'Manage Bible quiz categories and questions with Biquiz Admin.',
}

export default function Page() {
  return <Home />
}
