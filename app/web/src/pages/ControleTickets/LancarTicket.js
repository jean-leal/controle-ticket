import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

import Input from '../../components/form/Input';
import styles from './LancarTicket.module.css';
import Message from "../../components/layout/mesage";


const EditarColaborador = () =>{
  const [message, setMessage] = useState();
  const [type, setType] = useState();

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
    setMessage('');
    
    const lancarTicket = { 
      colaborador : {
        colaboradorId: _id,
        nome: colaborador.nome,
        cpf: colaborador.cpf
      }, 
      qtdTicketEntregue: qtdTicket 
    };

    fetch("http://localhost:8000/ticket", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lancarTicket),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error === true){
          setMessage('Informe a quantidade de Ticket entregue!')
          setType('error')
        }else{
          setMessage('Lançamento efetuado com sucesso!')
          setType('success')
        }
      })
      .catch((err)=> console.log(err))
  }

  return(
    <div className={styles.container}>
       <div className={styles.item}>
       {message && <Message type={type} msg={message}/>}
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
        <div className={styles.item}> 
          <button className={styles.btn} onClick={lancar}>Salvar</button>
        </div>
      </div>
    </div>
  )
};

export default EditarColaborador;