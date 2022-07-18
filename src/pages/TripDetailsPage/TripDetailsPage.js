import React from 'react'
import './TripDetailsPage.css'
import { goToBack } from '../../coordinator/Coordinator'
import { useNavigate } from 'react-router-dom'
import { urlBase } from '../../services/ApiRequest'
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useProtectedPage } from '../../services/useProtectedPage'
import axios from 'axios'

const TripDetailsPage = () => {
    useProtectedPage()
    const navigate = useNavigate()
    const [tripDetail, setTripDetail] = useState("")
    const { id } = useParams()
    const [update, setUpdate] = React.useState(false)
    const token = localStorage.getItem("token");
    const HEADERS = {
      headers: {
        "auth": token
      }
    }
   

    useEffect(() => {
      axios
      .get(`${urlBase}/trip/${id}`, HEADERS)
      .then((res) => {
        // alert("certo")
        setTripDetail(res.data)
        setUpdate(update)
      })
      .catch((err) => {
        alert(err.response)
      })
    }, [update])
    
    const DecideCandidate = (decisao, candidateID) => {
      const BODY = {
         approve: decisao,
      };
      
      axios
         .put(
            `${urlBase}/trips/${id}/candidates/${candidateID}/decide`,
            BODY,
            HEADERS
         )
         .then((res) => {
            alert("Decisão registrada com sucesso!");
         })
         .catch((err) => {
            alert("Houve um erro, tenta novamente");
         });
   };

  
  return (
    <div className='containerDetails' >
      {tripDetail && (
       <div>
        <h2>Detalhes da Viagem</h2>
        <p className="top">Nome: {tripDetail.trip.name}</p>
        <p className="top1">Planeta: {tripDetail.trip.planet}</p>
        <p className="top2">Descrição: {tripDetail.trip.description}</p>
        <p className="top3"> Data: {tripDetail.trip.date}</p>
        <p className="top4"> Duração: {tripDetail.trip.durationInDays}</p>
       </div>
      )}
    <div>
      {tripDetail && tripDetail.trip.candidates.length > 0 ? (
        tripDetail.trip.candidates.map((candidato) => {
          return (
          <div key={candidato.id}>
              {candidato.name}
              <button onClick={() => DecideCandidate(true, candidato.id)}>Aprovar</button>
              <button onClick={() => DecideCandidate(false, candidato.id)}>Reprovar</button>
            </div>
          );
        })
      ) : (
        <p>Não há candidatos pendentes</p>
      )}
    </div>
    <div>
      <h2>Canditados Aprovados</h2>
      {tripDetail && tripDetail.trip.approved.length > 0 ? (
        tripDetail.trip.approved.map((candidato) => {
          return <li key={candidato.id}>{candidato.name}</li>;
        })
      ) : (
        <p>Não há candidatos aprovados</p>
      )}
    </div>
    <button onClick={() => goToBack(navigate)}>Voltar</button>
    </div>
  )
}

export default TripDetailsPage