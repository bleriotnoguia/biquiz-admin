import { Metadata } from 'next'
import { Home } from '../components/home/Home'

export const metadata: Metadata = {
  title: 'Biquiz App',
  description: 'Biquiz App',
}

export default async function Page() {
  // Forward fetched data to your Client Component
  return <Home />
}
