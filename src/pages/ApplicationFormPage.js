import React from 'react'
import axios from "axios";
import './ApplicationFormPage.css'
import { goToBack } from '../coordinator/Coordinator';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import { urlBase } from '../services/ApiRequest'
import { countries } from '../services/countries'
import api from "../services/ApiRequest";


const ApplicationFormPage = () => {
  const navigate = useNavigate()
  const [trips, setTrips] = useState([])
  const [tripsId, setTripsId] = useState("")
  const [count, setCount] = useState("")
  const [inputs, setInputs] = useState({
    name: "",
    age: "",
    applicationText: "",
    profession:"",
  });

  useEffect(() => {
    getTrips()
  }, [])

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

  const applyToTrip = async () => {
    try {
    const body = {
      name: inputs.name,
      age: inputs.age,
      applicationText: inputs.applicationText,
      profession: inputs.profession,
      country: count
    }
    const ress = await api.post(`${urlBase}/trips/${tripsId}/apply`, body);
      alert("trip adicionada com sucesso.");
      console.log(ress.config.data)
    } catch (error) {
      console.log(error.response);
    }
    
  };

  const handleInputsValue = (e) => {
    e.preventDefault();
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  const onChangeViagem = (e) => {
    setTripsId(e.target.value)
  }
 
  const onChangeCountry = (e) => {
    setCount(e.target.value)
  } 

  const handleNameTrip = trips && trips.map((trip) => {
    return (
      <option key={trip.id} value={trip.id}>
       {trip.name}
      </option>
    ) 
  })

  const handleNameCoutries = countries.map((country) => {
    
    return (
      <option  key={country.code} >
        {country.label}
      </option>
    )
  })

  return (
    <div className='containerForm'>
      <button className="botaoOneForm" onClick={() => goToBack(navigate)}>Voltar</button>
      <h1><strong>ESCREVER-SE PARA UMA VIAGEM</strong></h1>
      <form className='cardForm'>
        <select 
          className='imputForm'
          Value={tripsId} 
          onChange={onChangeViagem}
          name="tripsId">
              <option value="" disable> Escolha uma viagem</option>
              {handleNameTrip}
        </select>
        <input 
          className='imputForm'
          placeholder='Nome' 
          type="text"
          value={inputs.name}
          onChange={handleInputsValue}
          name="name"
        />
        <input 
          className='imputForm'
          placeholder='Idade'
          type="number"
          value={inputs.age}
          onChange={handleInputsValue}
          name="age"
          
        />
        <input 
          className='imputForm'
          placeholder='Texto de candidatura' 
          type="text"
          value={inputs.applicationText}
          onChange={handleInputsValue}
          name="applicationText"
        />
        <input 
          className='imputForm'
          placeholder='Profissão' 
          type="text"
          value={inputs.profession}
          onChange={handleInputsValue}
          name="profession"
        />
        <select 
          className='imputForm'
          type="text" 
          value={count} 
          onChange={onChangeCountry}
          name="country"
        >
          <option>Selecione um país</option>
          {handleNameCoutries}
        </select>
      </form>
      <div>
        {/* <button className="botaoOne" onClick={() => goToBack(navigate)}>Voltar</button> */}
        <button className='botaoTwoForm' onClick={() => applyToTrip()}>Enviar</button>
      </div>
    </div>
  )
}

export default ApplicationFormPage