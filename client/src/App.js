import React from "react"

import {Routes,Route} from "react-router-dom"

import LoginForm from "./components/LoginForm";

import Register from "./components/Register";

import Home from "./components/Home";


import NotFound from './components/NotFound'

import './App.css';

const App=()=>(
    
      <Routes>
        <Route exact path="/login" element={<LoginForm/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/" element={<Home/>} />
        <Route path="/not-found" element={<NotFound/>} />
        <Route element={<NotFound/>} />
      </Routes>

      
    
  );


export default App;
