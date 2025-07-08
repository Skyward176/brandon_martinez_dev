// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { AuthProvider } from '@/contexts/AuthContext'
import QueryProvider from '@/contexts/QueryProvider'
import { IdentityProvider } from '@/contexts/IdentityContext'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <QueryProvider>
        <AuthProvider>
          <IdentityProvider>
            {children}
          </IdentityProvider>
        </AuthProvider>
      </QueryProvider>
    </NextUIProvider>
  )
}
