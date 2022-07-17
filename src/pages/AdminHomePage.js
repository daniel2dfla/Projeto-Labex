import React from 'react'
import './AdminHomePage.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { goToBack , goToCreateTrip , goToTripDetails } from '../coordinator/Coordinator';
import { urlBase } from '../services/ApiRequest'
import axios from "axios";

const AdminHomePage = () => {
    const navigate = useNavigate()
    const [trips, setTrips] = useState([])

    useEffect(() => {
      getTrips()
    }, [trips])

    const getTrips = () => {
      axios
      .get(`${urlBase}/trips`)
      .then((response) => {
        setTrips(response.data.trips)
      })
      .catch((error) => {
          console.log(error)
      })
    }
    const deleteTrip = (id) => {
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
        "Content-Type": "application/json",
        "auth": token
        }
      }
      axios
      .delete(`${urlBase}/trips/${id}`, headers)
      .then(() =>{
        alert("Viagem deletada com sucesso")
      })
      .catch(() => {
        alert("erro")
      })
    }
    const showName = trips.map((trip) => {
      return (
        <div  className='cardTrips' key={trip.id}>
          <p  onClick={() => goToTripDetails(navigate)}><strong>Nome:</strong> {trip.name}</p>
          <button onClick={() => deleteTrip(trip.id)}>X</button>
        </div>
        )
      })
  return (
    <div className='containerAdmin'>
      <button className='botãoOneAdmin' onClick={() => goToBack(navigate)}>Voltar</button>
      <button className='botaoThreeAdmin' >Logout</button>
      <h1>PAINEL ADMINISTRATIVO</h1>
      {showName}
      <button className='botaoTwoAdmin' onClick={() => goToCreateTrip(navigate)}>Criar viagem</button>
    </div>
  )
}

export default AdminHomePage