import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import PostDetail from "./components/PostDetail/PostDetail";
import SendMail from "./components/Auth/SendMail";
import ForgetPassword from "./components/Auth/ForgetPassword";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Container maxWidth="lg">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />}></Route>
          <Route path="/posts" element={<Home />}></Route>
          <Route path="/posts/search" element={<Home />}></Route>
          <Route path="/posts/:id" element={<PostDetail />}></Route>
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/" />}
          ></Route>
          <Route
            path={"/sendOTP"}
            element={!user ? <SendMail /> : <Navigate to="/auth" />}
          ></Route>
          <Route
            path={"/forgetPass"}
            element={!user ? <ForgetPassword /> : <Navigate to="/auth" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
