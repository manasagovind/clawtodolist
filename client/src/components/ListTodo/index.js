import React,{Fragment,useState,useEffect} from "react"

import Cookies from "js-cookie"

import EachTodo from "../EachTodo";

import "./index.css"

const ListTodo=()=>{
    const [todos,setTodos]=useState([])

    const getTodos=async()=>{
        const jwtToken = Cookies.get('jwt_token')

        const response=await fetch("http://localhost:4000/todos",{
            method:"GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type":"application/json"
              },
        })

        const data=await response.json()
        console.log(data)
        setTodos(data)
    }

    useEffect(()=>{
        getTodos()
    },[])

    return(
        <Fragment>
            <h1 className="head">List of Todos</h1>
            <ol className="unOrder">
                
                {todos.map(each=>(<EachTodo each={each} key={each.todo_id}/>))}

            </ol>
        </Fragment>
    )

}

export default ListTodo