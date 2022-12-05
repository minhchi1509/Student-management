import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../component/Sidebar'

export default function Home() {
    return (
        <div className='container'>
            <div className='min-h-screen grid grid-cols-15'>
                <Sidebar />
                <div className='col-span-13 lg:col-span-12'>

                </div>
            </div>
        </div>
    )
}
