import React from 'react'
import Headerr from '../components/Headerr'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main>
        
        <Headerr />

        <Outlet />
        
    </main>
  )
}

export default Layout