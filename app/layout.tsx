import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './globals.css'
import type { Metadata } from 'next'
import NavbarWrapper from '@/components/navbar';
import {Providers} from './providers';

export const metadata: Metadata = {
  title: 'Brandon Martinez',
  description: 'My portfolio.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='dark bg-black h-screen overflow-hidden'>
        <Providers>
          <div className='h-screen flex flex-col'>
            <NavbarWrapper />
            <div className='flex-1 bg-black overflow-hidden'>
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
