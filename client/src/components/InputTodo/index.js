import React,{Fragment, useState} from "react"
import Cookies from "js-cookie"


import "./index.css"

const InputTodo=()=>{
    const [description,setDescription]=useState("");

    const onsumbitForm= async event=>{
        event.preventDefault();
        try {
            console.log(description)
            const body={description}
            const jwtToken = Cookies.get('jwt_token')
            const response=await fetch("http://localhost:4000/todos", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${jwtToken}`
                },
                body:JSON.stringify(body),
            });
            console.log(response)
            
            window.location="/"            
        } catch (err) {
            console.error(err.message)
        }
    }

    return(
        <Fragment>
            <h1 className="head">Claw Enterprises TodoList</h1>
            <form className="formin" onSubmit={onsumbitForm}>
                <input type="text" value={description} placeholder="Add Todo" className="input-field" onChange={e=>setDescription(e.target.value)}/>
                <button type="submit" className="button1">Add</button>
            </form>
        </Fragment>
    )

}  

export default InputTodo