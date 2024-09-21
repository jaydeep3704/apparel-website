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
const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <SearchBar/>
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
      },
      {
        path:'/cart',
        element:<Cart/>
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
