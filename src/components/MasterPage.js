import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import Home from "./Home";
import Author from "./Author";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MasterPage = () => {
  return (
    <div className="flex flex-row space-x-4">
      <div className="rounded">
        <Sidebar></Sidebar>
      </div>
      <div className="p-1 rounded my-2 w-full">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="author" element={<Author />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default MasterPage;
