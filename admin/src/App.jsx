import { useEffect, useState } from 'react'
import './App.css'
import { createBrowserRouter ,Outlet,RouterProvider} from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './components/Login'


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl=import.meta.env.VITE_BACKEND_URL

const AppLayout=()=>{

  const [token,setToken]=useState(localStorage.getItem('token') || '')

  
  useEffect(()=>{
      localStorage.setItem('token',token)
      
  },[token])
  

    return  (<div className='min-h-screen bg-gray-50'>
      <ToastContainer/>
      {
        token!=='' ? (
          <div className='min-h-screen bg-gray-50'>
           
            <>
            <Navbar setToken={setToken}/>
            <hr />
            <div className='flex w-full'>
              <Sidebar/>
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                 <Outlet/>
              </div>
             
            </div>
            </>
          </div>
        ):<Login setToken={setToken}/>
      }
    </div>)
    
   
}


function App() {


 


  const router=createBrowserRouter([
    {
      path:'/',
      element:<AppLayout/>,
      children:[
        {
          path:'/add',
          element:<Add/>
        },
        {
          path:'/list',
          element:<List/>
        }
        ,
        {
          path:'/orders',
          element:<Orders/>
        }
      ]
    }
  ])


  return (
  <RouterProvider router={router}/>
   
  )
}

export default App
