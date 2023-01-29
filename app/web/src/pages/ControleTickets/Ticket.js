import { useState, useEffect } from "react";

import styles from './Ticket.module.css';

const Colaboradores = () => {
  const [tickets, setTickets] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8000/ticket/tickets', {
      method: 'GET' , 
      headers: {
        'Content-Type' : 'application/json'
      },
    })
    .then(res => res.json())
    .then((data)=> {
    setTickets(data.tikets)    
    })
    .catch((err)=> console.log(err))
  }, [])

  return (
    <div className={styles.container_body}>
      <div>
        <h2>Tickets</h2> 
      </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tickets Entregues</th>
          </tr>
        </thead>
        <tbody>
        {tickets.length > 0 &&
          tickets.map((ticket) => (
            <tr key={ticket._id}>
            <td>{ticket._id}</td>
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