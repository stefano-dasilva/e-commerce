import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';

const Layout = () => {
  return (
    <>
      <Navbar/>
      <SideBar/>
      <Outlet />
    </>
  );
};

export default Layout;