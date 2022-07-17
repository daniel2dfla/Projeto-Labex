import React from 'react'
import './ListTripsPage.css'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { goToApplicationForm , goToBack } from '../coordinator/Coordinator';
import { urlBase } from '../services/ApiRequest'
import axios from "axios";

const ListTripsPage = () => {
    const navigate = useNavigate()
    const [trips, setTrips] = useState([])

    useEffect(() => {
      getTrips()
    }, [])

    const handleGetTrips = trips.map((trip) => {
      return (
        <div className='blocoTripsList' key={trip.id}>
          <p><strong>Nome:</strong> {trip.name}</p>
          <br/>
          <p><strong>Descrição:</strong> {trip.description}</p>
          <br/>
          <p><strong>Planeta:</strong>{trip.planet}</p>
          <br/>
          <p><strong>Duração:</strong>{trip.durationInDays}</p>
          <br/>
          <p><strong>Data:</strong>{trip.date}</p>
          <br />
        </div>
      )
    })
      
    
    const getTrips = () => {
      axios
      .get(`${urlBase}/trips`)
      .then((response) => {
        setTrips(response.data.trips)
        // console.log(response.data.trips[0].id)
          
      })
      .catch((error) => {
          console.log(error)
      })
  }

  return (
    <div className="containerTrips">
      <button className='botaoOneList' onClick={() => goToBack(navigate) }>Voltar</button>
      <h2>Lista de viagens</h2>
      <div className='blocoPrincipal'>
        
        
        {handleGetTrips}
      </div>
      <div>
        <button className='botaoTwoList' onClick={() => goToApplicationForm(navigate)}>Inscrever-se</button>
      </div>
    </div>
  )
}

export default ListTripsPage