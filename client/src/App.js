import logo from './logo.svg';
import './App.css';
import React from 'react';
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./style.scss"
//import HomePage from '/Users/aamiryaseen/blog-app/client/src/components/HomePage';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
const Layout =()=>{
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/post/:id",
        element: <Single></Single>
      },
      {
        path: "/write",
        element: <Write></Write>
      },
    ]   
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

const App = () => {
  
  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={router} />
      </div>
      
    </div>
  );
};


export default App;
