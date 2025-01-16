import React from 'react'
import { ModeToggle } from '../toggle-mode'

export function Navbar() {
  return (

    <nav className='w-full h-14 px-10 flex justify-between items-center'>
      <span className="text-3xl font-bold">MemeCook</span>
      <ModeToggle />
    </nav>
  )
}

