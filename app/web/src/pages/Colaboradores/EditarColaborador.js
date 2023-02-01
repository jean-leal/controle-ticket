import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

import Input from '../../components/form/Input';
import styles from './CadastroColaborador.module.css';
import Message from "../../components/layout/mesage";
import Button from '../../components/form/Button';

const EditarColaborador = () =>{
  const [message, setMessage] = useState();
  const [type, setType] = useState();

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
      setMessage('');
    fetch(`http://localhost:8000/colaborador/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(colaborador),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error === true){
          setMessage(`${data.message}`)
          setType('error')
        }else{
          setMessage('Edição efetuada com sucesso!')
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
          text="Status 'A' ou 'I'"
          name="Status"
          placeholder="Status"
          handleOnChange={(e) => setStatus(e.target.value) }
          value={status}
        />
        <div className={styles.item}>
          <Button
            text="Salvar"
            handleClick={editar}
          />
        </div>
      </div>
    </div>
  )
};

export default EditarColaborador;