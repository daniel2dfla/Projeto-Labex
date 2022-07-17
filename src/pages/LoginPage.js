import React from 'react'
import './LoginPage.css'
import { useNavigate } from "react-router-dom";
import { goToBack , goToAdminHome } from '../coordinator/Coordinator';
import { useState } from 'react'
import axios from "axios";
import { urlBase } from '../services/ApiRequest'

const AdminHomePage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState ("")
    const [password, setPassword] = useState("");

    const onChangeEmail = (event) => {
      setEmail(event.target.value);
    };
  
    const onChangePassword = (event) => {
      setPassword(event.target.value);
    };
    
    const onSubmitLogin = () => {
      const body = {
        email: email,
        password: password
      };
        axios 
        .post(`${urlBase}/login`, body)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          goToAdminHome(navigate)
        })
        .catch(() => {
          alert("Login ou senha não encontrado")
        });
    }
  return (
    <div className='conteinerLogin'>
        <h2>LOGIN</h2>
        <input placeholder='Email' type="email" value={email} onChange={onChangeEmail}/>
        <input placeholder='Password' type="password" value={password} onChange={onChangePassword}/>
        <button className='botaoOneLogin' onClick={() => goToBack(navigate)}>Voltar</button>
        <button className='botãoTwoLogin' onClick={() => onSubmitLogin()}>Entrar</button>
    </div>
  )
}

export default AdminHomePage