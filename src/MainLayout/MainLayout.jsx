import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'react-loading-skeleton/dist/skeleton.css';
import Footer from '../components/Footer';


const MainLayout = () => {
  return (
    <div className='max-w-screen-2xl mx-auto min-h-screen'>
      <div>
      <Navbar/>
      </div>
      <div className='max-w-screen-xl mx-auto my-12'>
        <Outlet/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default MainLayout
