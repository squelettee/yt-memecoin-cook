import React from 'react'
import { ModeToggle } from '../toggle-mode'
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link'


export function Navbar() {
  return (
    <nav className='container h-18 px-10 py-4 flex justify-between items-center'>
      <Link href={process.env.NEXT_PUBLIC_API_URL!}>
        <span className="text-3xl font-bold">MemeCook</span>
      </Link>
      <div className="flex gap-4 items-center">
        <Link href="/refferal" className={buttonVariants({ variant: "outline" })}>Refferal</Link>
        <ModeToggle />
      </div>
    </nav>
  )
}

