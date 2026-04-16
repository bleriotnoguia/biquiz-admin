import React from 'react'
import type { Metadata } from 'next'
import '../css/main.css'
import Providers from './Providers'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: 'Biquiz Admin',
    template: '%s | Biquiz Admin',
  },
  description: 'Admin panel for Biquiz – manage Bible quiz categories and questions.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("style-basic", "font-sans", geist.variable)}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
