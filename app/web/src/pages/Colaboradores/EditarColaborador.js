import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

import Input from '../../components/form/Input';

const EditarColaborador = () =>{
  const {_id} = useParams()
  const [status, setStatus] = useState();
  const [nome, setName] = useState('');
  const [cpf, setCpf] = useState('');

  useEffect(() => { 
    fetch(`http://localhost:8000/colaborador/colaboradores/${_id}`, {
      method: 'GET' , 
      headers: {
        'Content-Type' : 'application/json'
      },
    })
    .then(res => res.json())
    .then((data)=> {
      setName(data.colaborador.nome)  
      setCpf(data.colaborador.cpf)  
      setStatus(data.colaborador.status)  

    })
    .catch((err)=> console.log(err))
  }, [])


  const editar = () =>{
    const colaborador = {nome: nome, cpf: cpf, status: status};

    fetch(`http://localhost:8000/colaborador/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(colaborador),
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
        placeholder="Insira o nome"
        handleOnChange={(e) => setName(e.target.value) }
        value={nome}
      />
      <Input
        type="number"
        text="CPF"
        name="cpf"
        placeholder="Insira o CPF"
        handleOnChange={(e) => setCpf(e.target.value) }
        value={cpf}
      />
      <Input
        type="text"
        text="Status"
        name="Status"
        placeholder="Status"
        handleOnChange={(e) => setStatus(e.target.value) }
        value={status}
      />
      <button onClick={editar}>Salvar</button>
    </div>
  )
};

export default EditarColaborador;