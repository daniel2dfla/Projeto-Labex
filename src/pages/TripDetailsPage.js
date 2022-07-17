import React from 'react'
import './TripDetailsPage.css'
import { goToBack } from '../coordinator/Coordinator'
import { useNavigate } from 'react-router-dom'
import { urlBase } from '../services/ApiRequest'
import { useState, useEffect } from 'react'
import axios from 'axios'

const TripDetailsPage = () => {
    const navigate = useNavigate()
    const [tripDetail, setTripDetail] = useState([])
    // useEffect(() => {
    //   getTripDetail()
    // }, [])

    const getTripDetail = () => {
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
          "auth": token
        }
      }
      axios
      .get(`${urlBase}/trip/I4jtfYrBYtqKIXNGtqLU`, headers)
      .then((res) => {
        // alert("certo")
        console.log(res.data.trip)
        setTripDetail(res.data.trip)
      })
      .catch(() => {
        alert("erro")
      })
    }
    
    const handleTripDetails = tripDetail.map((detail) => {
      return (
        <div key={detail.id}>
            <p>{detail.profession}</p>
            <p>{detail.name}</p>
            <p>{detail.age}</p>
            <p>{detail.applicationText}</p>
            <p>{detail.country}</p>
        </div>
      )
    })
  return (
    <div className='containerDetails' >
        <p>TripDetailsPage</p>
        <button onClick={() => goToBack(navigate)}>Voltar</button>
        {handleTripDetails}
        <button>Aprovar</button>
        <button>Reprovar</button>
    </div>
  )
}

export default TripDetailsPage