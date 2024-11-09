import React, { useContext, useEffect, useState } from 'react'
import './Login.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const Login = ({setShowLogin}) => {
    const {url,setToken,aurl}=useContext(StoreContext);
    const [currentState,setCurrState]=useState("Sign Up");

    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
    }
    const onLogin= async (event)=>{
       event.preventDefault();
       let newurl=url;
       let adurl=aurl;
       if(currentState==="Login"){
        newurl+="/user/login";
       }
       else{
        newurl+="/user/register";
       }
       if(currentState==="Login" && data.email==='admin11@gmail.com' && data.password==="admin12"){
        adurl+="/";
       }
       const response=await axios.post(newurl,data);
    if(response.data.success){
         setToken(response.data.token);
         localStorage.setItem("token",response.data.token);
         setShowLogin(false);
    }
    else{
        alert(response.data.message);
    }
    }
    
    useEffect(()=>{
        console.log(data);
    },[data])
  return (
    <div className='login-popup'>
        <form  onSubmit={onLogin}className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)}src={assets.cross_icon} alt="" />

            </div>
            <div className="login-popup-inputs">
                {currentState==="Login"?<></>:<input name='name' placeholder='name' onChange={onChangeHandler} value={data.name}></input>}
                <input name="email" placeholder='Email' onChange={onChangeHandler} value={data.email} />
                <input type="password" name="password" placeholder='Password' onChange={onChangeHandler} value={data.password} />

            </div>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By Using privacy policy</p>
            </div>
            <button type='submit'>{currentState==="Sign Up"?"Create Account":"Login"}</button>
            {currentState==="Login"?<p>Create a new account?<span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>:<p>
                Already have an account?<span onClick={()=>setCurrState("Login")}>Login Here</span></p>}
        </form>
    </div>
  )
}

export default Login