import {
    createBrowserRouter,
  
  } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Apartment from "../Pages/Apartment/Apartment";
import PrivateRoute from "./PrivateRoute";



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
        element: <PrivateRoute></PrivateRoute>,
        children: [
          {
            path: 'userHome',
            element: <h2>hi</h2>
          }
        ]
      }
    ]);