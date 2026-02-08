import React from 'react'
import {Outlet} from 'react-router'
import Header from '../component/layouts/Header'
import Footer from '../component/layouts/Footer'
import ErrorBoundary from '../component/ui/ErrorBoundary'


function MainLayout() {
  return (
    <div>
        <ErrorBoundary>
            <Header/>
        </ErrorBoundary>
        <Outlet/>
        <Footer/>


    </div>
  )
}

export default MainLayout