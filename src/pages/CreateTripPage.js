import React from 'react'
import axios from "axios";
import './CreateTripPage.css'
import { goToBack } from '../coordinator/Coordinator';
import { useNavigate } from 'react-router-dom';
import { urlBase } from '../services/ApiRequest'
import { useState } from 'react'

const CreateTripPage = () => {
    const navigate = useNavigate()
    const [planet, setPlanet] = useState("")
    const [date, setDate] = useState("")
    const [durationInDays, setDurationInDays] = useState("")
    const [nome, setNome] = useState("")
    const [description, setDescription] = useState("")
   
    const handlePlanet = (e) => {
      setPlanet(e.target.value)
    }

    const onChangeDate = (e) => {
      setDate(e.target.value)
    }

    const onChangeDays = (e) => {
      setDurationInDays(e.target.value)
    }

    const onChangeNome = (e) => {
      setNome(e.target.value)
    }

    const onChangeDescription = (e) => {
      setDescription(e.target.value)
    }

    const createTrip = () => {
      const token = localStorage.getItem("token");
      const headers = {
        headers: {
        "Content-Type": "application/json",
        "auth": token
        }
      }
      
      const body = {
        name: nome,
        planet: planet,
        date: date,
        description: description,
        durationInDays: durationInDays
      }
      axios
      .post(`${urlBase}/trips`, body , headers)
      .then(() => {
          alert("Viagem criada com sucesso")
          setDurationInDays("")
          setDate("")
          setPlanet("")
          setDescription("")
          setNome("")
         
      })
      .catch((err) => {
          alert("Erro na criação da viagem")
          console.log(err)
          console.log(body)
      })
    }
  return (
    <div className='containerCreateTrip' >
        <h1>CreateTripPage</h1>
        <form>
          <input 
            className='inputSelect'
            placeholder='Nome'
            type="text"
            value={nome}
            onChange={onChangeNome}
            name= "nome"
          />
          <select
            className='inputSelect'
            type="text" 
            value={planet} 
            onChange={handlePlanet}
            name="planet"
          >
            <option>Selecione um planeta</option>
            <option>Mercúrio</option>
            <option>Venus</option>
            <option>Terra</option>
            <option>Marte</option>
            <option>Júpter</option>
            <option>Saturno</option>
            <option>Urano</option>
            <option>Nepturno</option>
          </select>
          <input 
            className='inputSelect'
            id="date"
            type="date"
            value={date}
            onChange={onChangeDate}
            name= "date"
            
          /> 
          <input 
            className='inputSelect'
            placeholder='Descrição'
            type="text"
            value={description}
            onChange={onChangeDescription}
            name="description"
          />
          <form>
          <label for="durationInDays"></label>
          <input 
            className='inputSelect'
            id="durationInDays"
            placeholder='Duração em dias'
            type="number"
            value={durationInDays}
            onChange={onChangeDays}
            name="durationInDays"
          />
          </form>

        </form>
        <button className='botaoOneCreateTrip' onClick={() => goToBack(navigate)}>Voltar</button>
        <button className='botaoTwoCreateTrip' onClick={() => createTrip()}>Enviar</button>
    </div>
  )
}

export default CreateTripPage