import React from 'react'
import type { Metadata } from 'next'
import '../css/main.css'
import Providers from './Providers'

export const metadata: Metadata = {
  title: {
    default: 'Biquiz Admin',
    template: '%s | Biquiz Admin',
  },
  description: 'Admin panel for Biquiz – manage Bible quiz categories and questions.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="style-basic">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
