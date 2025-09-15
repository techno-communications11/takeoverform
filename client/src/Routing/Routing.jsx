import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TakeOver from '../Pages/TakeOver'
import TakeoverData from '../Pages/TakeoverData'

function Routing() {
    const router =createBrowserRouter([
        {
            path:"/",
            element:<TakeOver/>
        },
        {
            path:"/data",
            element:<TakeoverData/>
        }
    ])
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}

export default Routing