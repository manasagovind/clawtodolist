import React,{Fragment, useState} from "react"

import Cookies from "js-cookie"

import {useNavigate,Navigate,Link} from "react-router-dom"


import "./index.css"


const LoginForm=()=>{
    const navigate=useNavigate()

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [showSubmitError,setSubmitError]=useState(false)
    const [errorMsg,setError]=useState("")

    const onSubmitSuccess=jwtToken=>{
        

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    navigate("/")
    }

    const onSubmitFailure=errorMsg=>{
        console.log(errorMsg)
        setSubmitError(true)
        setError(errorMsg)
    }

    const submitForm= async event=>{
        event.preventDefault()
        try {
            const body={username,password}
            const response=await fetch("http://localhost:4000/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(body),
            })
            const data=await response.json()
            if (response.ok === true) {
                onSubmitSuccess(data.jwtToken)
              } else {
                onSubmitFailure(data)
              }
        } catch (err) {
            console.error(err.message)
        }
    }

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Navigate replace to="/" />
    }
    return(
        <Fragment>
            <div className="loginCont">
                <div className="logoImg">
                    <img src="https://media.licdn.com/dms/image/D4D0BAQFWL-HNkd25Iw/company-logo_200_200/0/1719257435507/claw_lawyers_logo?e=1730937600&v=beta&t=pa_oU5R_lrUkagtFxfR_iMYfQUtDCrfbiKR3xggmPYM" alt="claw Enterprices"
                    className="loginLogo"/>
                </div>
                <div className="formC">
                    <form className="formCont" onSubmit={submitForm}>
                        <div className="inputCont">
                        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          placeholder="Enter Username"
          value={username}
          onChange={e=>setUsername(e.target.value)}
        />
      </div>
      <div className="inputCont">
          <label className="input-label" htmlFor="password">
            PASSWORD
        </label>
        <input
          type="text"
          id="password"
          className="username-input-field"
          placeholder="Enter Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
                        </div>
                        <button type="submit" className="login-button">
            Login
          </button>
          <Link to="/register"><p>Create new account</p></Link>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default LoginForm