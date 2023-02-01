import { useState, useEffect } from "react";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";

import styles from './Ticket.module.css';

const Colaboradores = () => {
  const [pesquisaNome, setPesquisaNome] = useState('');
  const [tickets, setTickets] = useState([]);
  const [dataInicial, setDataInicial] = useState();
  const [dataFinal, setDataFinal] = useState();
 
  //puxa do banco todos os lançamentos de ticket feito 
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

  // busca de colaboradores pelo nome
   const ticketsFiltrados = pesquisaNome.length > 0 
   ? tickets.filter(ticket => new RegExp(pesquisaNome, "i").test(ticket.colaborador.nome))
   : tickets;

    
  // função para somar todos os tickets lançados dentro da data estipulada. 
  const totalEntregue = ticketsFiltrados.map(ticket => ticket.qtdTicketEntregue).reduce((prev, curr) =>prev + curr, 0);

  //função para pesquisa por data.
  const  pesquisaData = async () => {
    if (!dataFinal  && !dataInicial){
      alert("Adiocione data inicial e final!")
    } else{
    const inicial = new Date(dataInicial).toISOString().substr(0, 10);
    const final = new Date(dataFinal).toISOString().substr(0, 10);    
    
    let pesquisa = await tickets.filter(ticket =>{
      let data =  new Date(ticket.createdAt).toISOString().substr(0, 10);
      
      return( (data >= inicial ) && (data <= final))
    })

    setTickets(pesquisa)
    }    
  }

  return (
    <div className={styles.container_body}>
      <div>
        <div className={styles.pesquisa_data}>
          <span className={styles.item}>
            <Input            
              text="Data Inicial"
              type="Date"
              handleOnChange={(e) => setDataInicial(e.target.value)}
            />
          </span>
          <span className={styles.item}>
            <Input
              text="Data Final"
              type="Date"
              handleOnChange={(e) => setDataFinal(e.target.value)}
            />
          </span>
          <span className={styles.item}>
            <Button
              text="Pesquisar"
              handleClick={pesquisaData}
            />
          </span>          
        </div>        
        <Input
          text="Pesquisa por nome:"
          placeholder="Pesquise pelo nome"
          type="text"
          handleOnChange={(e) => setPesquisaNome(e.target.value)}
        />
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
          {ticketsFiltrados.length > 0 &&
            ticketsFiltrados.map((ticket) => (
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