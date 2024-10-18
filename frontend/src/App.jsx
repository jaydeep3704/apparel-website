import "./app.scss";
import { createBrowserRouter, Outlet ,RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Collection from "./pages/Collection";
import SingleProduct from "./pages/SingleProduct"
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./store/store";
import SearchBar from "./components/SearchBar";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order"
import Login from "./pages/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { saveToken } from "./store/authSlice";
import ErrorBoundary from "./components/ErrorBoundary";
import Verify from "./pages/Verify";
const AppLayout = () => {
  const token=useSelector((store)=>store.auth.token)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(!token && localStorage.getItem('token'))
    {
      dispatch(saveToken(localStorage.getItem('token')))
    }
   
 })


  return (
    <>
      <ToastContainer/>
      <Navbar />
      <SearchBar/>
      <Outlet />
      <Footer/>
    </>
  );
};


export const backendURL="http://localhost:5000"


const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<AppLayout/>,
    errorElement:<ErrorBoundary/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/collection',
        element:<Collection/>
      },
      {
        path:'/product/:id',
        element:<SingleProduct/>
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/contact',
        element:<Contact/>
      },
      {
        path:'/cart',
        element:<Cart/>
      },
      {
        path:'/place-order',
        element:<PlaceOrder/>

      },
      {
        path:'/orders',
        element:<Order/>

      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/verify',
        element:<Verify/>  
      }


    ]
  }
])






function App() {
  return (
    <Provider store={store}>
        <RouterProvider router={appRouter}/>
    </Provider>
  );
}

export default App;
