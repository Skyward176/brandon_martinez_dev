import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './globals.css'
import type { Metadata } from 'next'
import NavbarWrapper from '@/components/navbar';
import {Providers} from './providers';

export const metadata: Metadata = {
  description: 'My personal website :D',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='dark bg-black h-screen overflow-auto md:overflow-hidden'>
        <Providers>
          <div className='min-h-screen md:h-screen flex flex-col'>
            <NavbarWrapper />
            <div className='flex-1 bg-black overflow-visible md:overflow-auto'>
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
