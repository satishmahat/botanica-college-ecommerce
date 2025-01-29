import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <>
    <AuthProvider>
    <Navbar/>
    <main className='min-h-screen max-w-screen-2xl mx-auto px-6 py-4 font-primary'>
      <Outlet/>
    </main>
    <Footer/>
    </AuthProvider>
    </>
  )
}

export default App