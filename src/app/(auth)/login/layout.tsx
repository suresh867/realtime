"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const LoginLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default LoginLayout