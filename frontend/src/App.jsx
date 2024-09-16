import "./app.scss";
import { createBrowserRouter, Outlet ,RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Collection from "./pages/Collection";
import SingleProduct from "./pages/SingleProduct"
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
};





const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<AppLayout/>,
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
      }


    ]
  }
])






function App() {
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
