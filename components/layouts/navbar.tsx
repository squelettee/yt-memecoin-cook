'use client'

import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  {
    ssr: false
  }
)

export function Navbar() {

  return (
    <nav className='w-full h-[8vh] px-4 sm:px-8 md:px-12 lg:px-20 flex justify-between items-center bg-sidebar-accent'>
      <Link href={process.env.NEXT_PUBLIC_API_URL!}>
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">Memecook 🐸</span>
      </Link>
      <div className="flex gap-2 sm:gap-4 items-center">
        <div className="scale-[0.85] sm:scale-90 md:scale-100 [&_.wallet-adapter-button]:whitespace-nowrap [&_.wallet-adapter-button]:overflow-hidden [&_.wallet-adapter-button]:text-ellipsis z-10">
          <WalletMultiButtonDynamic />
        </div>
      </div>
    </nav>
  )
}
