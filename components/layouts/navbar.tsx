import React from 'react'
import { ModeToggle } from '../toggle-mode'


export function Navbar() {
  return (
    <nav className='container h-18 px-10 py-4 flex justify-between items-center'>
      <span className="text-3xl font-bold">MemeCook</span>
      <div className="flex gap-4 items-center">
        <ModeToggle />
      </div>
    </nav>
  )
}

