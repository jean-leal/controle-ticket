import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

import Input from '../../components/form/Input';

const EditarColaborador = () =>{
  const {_id} = useParams()
  const [colaborador, setColaborador] = useState ([]);
  const [qtdTicket, setQtdTicket] = useState();

  useEffect(() => { 
    fetch(`http://localhost:8000/colaborador/colaboradores/${_id}`, {
      method: 'GET' , 
      headers: {
        'Content-Type' : 'application/json'
      },
    })
    .then(res => res.json())
    .then((data)=> {
      setColaborador(data.colaborador)  
    })
    .catch((err)=> console.log(err))
  }, [])


  const lancar = () =>{
    const lancarTicket = {colaboradorId: _id, qtdTicketEntregue: qtdTicket };

    fetch("http://localhost:8000/ticket", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lancarTicket),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
      })
  }

  return(
    <div>
      <Input
        type="text"
        text="Nome"
        name="name"
        value={colaborador.nome}
      />
      <Input
        type="number"
        text="Ticket Entregue"
        name="ticket"
        placeholder="Insira quantidade entregue"
        handleOnChange={(e) => setQtdTicket(e.target.value) }
      />
     
      <button onClick={lancar}>Lançar</button>
    </div>
  )
};

export default EditarColaborador;