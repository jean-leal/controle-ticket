import { useState, useEffect } from "react";
import LinkButton from "../../components/layout/LinkButton";
import Input from "../../components/form/Input";

import styles from './Colaboradores.module.css';

const Colaboradores = () => {
  const [colaboradores, setColaboradores] = useState('');
  const [search, setSearch] = useState('');

  // busca de colaboradores pelo nome   
  const filterColaboradores = search.length > 0 
  ? colaboradores.filter(colaborador => new RegExp(search, "i").test(colaborador.nome))
  : colaboradores;
  
  //solicita ao abrir a pagina todos os colaboradores cadastrados no banco 
  useEffect(() => {
    fetch('http://localhost:8000/colaborador/colaboradores', {
      method: 'GET' , 
      headers: {
        'Content-Type' : 'application/json'
      },
    })
    .then(res => res.json())
    .then((data)=> {
    setColaboradores(data.colaboradores)    
    })
    .catch((err)=> console.log(err))
  }, [])

  return (
    <div className={styles.containerBody}>
      <div className={styles.pesquisa}>        
        <Input
        type="text"
        placeholder="Pesquise pelo nome"
        handleOnChange={(e) => setSearch(e.target.value) }      
        />
        <LinkButton to="/cadastro-colaborador" text="Novo Cadastro"/>  
      </div>
    <div className={styles.containerTable}>
      <table>  
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Status</th>
            <th>Data Criação</th>
            <th>Data Atualização</th>
            <th>Opções</th>
          </tr>
        </thead>  
        <tbody>
          {filterColaboradores.length > 0 &&
            filterColaboradores.map((colaborador) => (
              <tr key={colaborador._id}>
                <td>{colaborador.nome}</td>
                <td>{colaborador.cpf}</td>
                <td>{colaborador.status}</td>
                <td>{new Date(colaborador.createdAt).toLocaleDateString('pt-br')}</td>
                <td>{new Date(colaborador.updatedAt).toLocaleDateString('pt-br')}</td>
                <td>              
                  <div>
                    <LinkButton to={`/lancar-ticket/${colaborador._id}`} text="Lançar Ticket"/>
                    <LinkButton to={`/editar-colaborador/${colaborador._id}`} text="Editar"/>
                  </div>
                </td>
              </tr>          
          ))}         
        </tbody>          
      </table>        
    </div>
  </div>    
  );
}

export default Colaboradores;