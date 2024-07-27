import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate
} from "react-router-dom";
import Productsdetail from "../components/Productsdetail/main";
import Products from "../components/Products/main";
import LoginForm from "../components/login form/main";
import Signup from "../components/Signup/main";
import Sellproduct from "../components/Sellproduct/main";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Loader from "../components/Products/loader";
import Navbar from "../Views/Navbar/main";
import LikePage from "../components/like/main";
const router = createBrowserRouter([

  {
    path: "/",
    element: <Layout />,
    children : [
      {
        path: "/",
        element: <Products />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/login",
        element: <LoginForm />
      },

      {
        path: "/productsdetail/:adid",
        element: <Productsdetail />
      },
      {
        path: "/sellpro",
        element: <Sellproduct />
      },
      {
        path: "/favourite",
        element: <LikePage   />
      },
    ]
  },
]);
function Layout() {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      setUser(user)
      setLoading(false)
    })
  },[])
  useEffect(()=>{
    const path = window.location.pathname
    if(user){
      if(path === '/signup' || path === '/login'){
        navigate('/')
      }
    }else{
      if (path === '/sellpro') {
        navigate('/login')
      }
    }
  },[window.location.pathname, user])
  if(loading) return Loader

  return <div>
    <Navbar user={user} />
    <Outlet />
  </div>
}
function Router() {
  return <RouterProvider router={router} />
}
export default Router