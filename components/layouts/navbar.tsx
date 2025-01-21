import React from 'react'
import { ModeToggle } from '../toggle-mode'
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link'


export function Navbar() {
  return (
    <nav className='w-full h-16 px-20 flex justify-between items-center bg-sidebar-accent'>
      <Link href={process.env.NEXT_PUBLIC_API_URL!}>
        <span className="text-xl md:text-2xl lg:text-3xl font-bold">Memecook</span>
      </Link>
      <div className="flex gap-4 items-center">
        <Link href="/refferal" className={buttonVariants({ variant: "outline" })}>Refferal</Link>
        <ModeToggle />
      </div>
    </nav>
  )
}

