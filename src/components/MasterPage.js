import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import Home from "./Home";
const MasterPage = () => {
  return (
    <div>
      <Sidebar></Sidebar>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Navigate to="Home /" />}></Route>
      </Routes>
    </div>
  );
};

export default MasterPage;
