import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from './signup.module.css'

export default function SignUp({ type, setUser }) {
  const [inputs, setInputs] = useState({});

  const navigate = useNavigate();

  const changeHandler = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    // console.log("inputs from signup changeHandler", inputs);
  };

  const submitHandler = async () => {
    const res = await axios.post(`http://localhost:3001/auth/${type}`, inputs, {
      withCredentials: true,
    });
    // console.log("res.data from signup submitHandler", res.data);
    setUser(res.data);
    if (res.data === "Такой пользователь уже есть") {
      navigate("/signin");
    } else {
      navigate("/");
    }
  };

  return (
 <div className={style.mainSignUp}>
      <h3>
      {type === "signup" ? "Please Sign Up" : " Please Sign In"}
      </h3>
      <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <div>
    {type === "signup" && (
      <TextField onChange={changeHandler}
        required
        id="filled-required"
        label="Name"
        variant="filled"
        name="name"
      />
      )}
      <TextField onChange={changeHandler}
        required
        id="filled-required"
        label="Email"
        variant="filled"
        name="email"
      />
      <br />
      <TextField onChange={changeHandler}
      required
        id="filled-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="filled"
        name="password"
      />
    </div> 
  </Box> 
      <button className={style.signupBtn} type="button" onClick={submitHandler}>
        {type === "signup" ? "Sign Up" : "Sign In"}
      </button>
    </div> 
  );
}
