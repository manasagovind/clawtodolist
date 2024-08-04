import React from "react"

import Cookies from "js-cookie"

import {Navigate} from "react-router-dom"

import Header from "../Header"

import InputTodo from "../InputTodo"

import ListTodo from "../ListTodo"




import "./index.css"


const Home=()=>{
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Navigate replace to="/login" />
    }
    return(
    <div className="homeCont">
        <Header/>
        <InputTodo/>
        <ListTodo/>
    </div>
    )
}
export default Home