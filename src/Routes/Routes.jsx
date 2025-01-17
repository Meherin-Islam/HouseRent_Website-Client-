import {
    createBrowserRouter,
  
  } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Apartment from "../Pages/Apartment/Apartment";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../LayOut/Dashboard";
import MyProfile from "../Pages/DashBoard/MyProfile";
import Announcements from "../Pages/DashBoard/Announcements";



  export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
              path: '/',
              element: <Home></Home>
            },
            {
              path:'login',
              element:<Login></Login>
            },
            {
              path:'register',
              element:<Register></Register>
            },
            {
              path:'apartment',
              element:<PrivateRoute><Apartment></Apartment></PrivateRoute>
            }
        ]
      },
      {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
          {
            path: 'profile',
            element: <MyProfile></MyProfile>
          },
          {
            path:'announcements',
            element:<Announcements></Announcements>
          }
        ]
      }
    ]);