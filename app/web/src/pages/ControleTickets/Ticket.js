import { useState, useEffect } from "react";
import Input from "../../components/form/Input";

import styles from './Ticket.module.css';

const Colaboradores = () => {
  const [tickets, setTickets] = useState([]);
  const [dataInicial, setDataInicial] = useState();
  const [dataFinal, setDataFinal] = useState();
  let pesquisa = '';
  
  // função para somar todos os tickets lançados dentro da data estipulada. 
  const totalEntregue = tickets.map(ticket => ticket.qtdTicketEntregue).reduce((prev, curr) =>prev + curr, 0);
  
  const pesquisaData = () => {
    const inicial = new Date(dataInicial)
    //const final = new Date(dataFinal).toLocaleDateString()
    console.log(inicial)
    
    console.log(dataFinal)
    pesquisa = tickets.filter(ticket =>{
      let data =  new Date(ticket.createdAt)
      let options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      data.toLocaleDateString('pt-BR', options)
      console.log(data)
      return(data == dataFinal)// && data <= final)      
    })

    setTickets(pesquisa)
  }

  useEffect(() => {
    fetch('http://localhost:8000/ticket/tickets', {
      method: 'GET' , 
      headers: {
        'Content-Type' : 'application/json'
      },
    })
    .then(res => res.json())
    .then((data)=> {
    setTickets(data.tickets)  
    })
    .catch((err)=> console.log(err))
  }, [])

  return (
    <div className={styles.container_body}>
      <div>
        <h2>Tickets</h2>
        <Input
        text="Data Inicial"
        type="Date"
        handleOnChange={(e) => setDataInicial(e.target.value)}
        />
        <Input
        text="Data Final"
        type="Date"
        handleOnChange={(e) => setDataFinal(e.target.value)}
        />
        <button onClick={pesquisaData}>Pesquisar</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Tickets Entregues no Periodo</th>
              <th>{totalEntregue}</th>
            </tr>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Data Entrega</th>
              <th>Tickets Entregues</th>
            </tr>
          </thead>
          <tbody>
          {tickets.length > 0 &&
            tickets.map((ticket) => (
              <tr key={ticket._id}>
              <td>{ticket.colaborador.nome}</td>
              <td>{ticket.colaborador.cpf}</td>
              <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
              <td>{ticket.qtdTicketEntregue}</td>
            </tr>          
          ))}    
          </tbody>
        </table>        
      </div>
    </div>    
  );
}

export default Colaboradores;