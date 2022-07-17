import React from 'react'
import './HomePage.css'
import { goToListTrips , goToLogin } from '../coordinator/Coordinator';
import { useNavigate } from "react-router-dom";
// import Img from 'react-image'
import logo from '../img/home/horizontal.png'



const HomePage = () => {
    const navigate = useNavigate()

  return (
    <div className='containerHome'>
      <img src={logo}/>
      <div className='botoes'>
        <button className='botaoOne' onClick={()=> goToListTrips(navigate)}>Ver viagens</button>
        <button className='botaoTwo' onClick={()=> goToLogin(navigate)}>Área de admin</button>
      </div>
    </div>
  )
}

export default HomePage