import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../Admin/AdminSidebar'

function AdminLayouts() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayouts
