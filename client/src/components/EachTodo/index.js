import React,{Fragment,useState} from "react"

import Cookies from "js-cookie"

import "./index.css"

const EachTodo=(props)=>{
    const {each}=props
    const{todo_id,description}=each
    const [isEdit,setEdit]=useState(false)
    const [descri, setDescription]=useState(description)
    const changeEdit=()=>{
        setEdit(true)
    }
    const updateForm=async ()=>{
        const body={description:descri}
        const jwtToken = Cookies.get('jwt_token')

        const response=await fetch(`http://localhost:4000/todos/${todo_id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${jwtToken}`
            },
            body:JSON.stringify(body),

        })
        console.log(response)
        window.location="/"
    }

    const DeleteForm=async ()=>{
        const jwtToken = Cookies.get('jwt_token')

        const deleteTodo=await fetch(`http://localhost:4000/todos/${todo_id}`,{
            method:"DELETE",
            headers: {
                Authorization: `Bearer ${jwtToken}`,
              }
        });
        console.log(deleteTodo)
        window.location="/0"
    }

    return(
        <Fragment>
            <li className="listing">
                {isEdit?(<input type="text" value={descri} className="pahead1" onChange={e=>setDescription(e.target.value)}/>):(<p className="pahead1">{description}</p>)}
                {isEdit?(<button type="button" onClick={updateForm} className="pahead2I butt">Save</button>):(<button type="button" onClick={changeEdit} className="pahead2 butt">Edit</button>)}
                <button type="button" className="pahead3" onClick={DeleteForm}>Delete</button>
            </li>
            <hr/>
        </Fragment>
    )

}

export default EachTodo
