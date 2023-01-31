import { useState } from "react";

import Input from '../../components/form/Input';
import styles from './CadastroColaborador.module.css';
import Message from "../../components/layout/mesage";

const CadastroColaborador = () =>{
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  const [nome, setName] = useState('');
  const [cpf, setCpf] = useState('');
  

  const cadastrar = () =>{
    setMessage('');

    const colaborador = {nome: nome, cpf: cpf};
    
    fetch('http://localhost:8000/colaborador', {
      method: 'POST',
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
          setMessage('Cadastrado efetuado com sucesso!')
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
          handleOnChange={(e) => setName(e.target.value)}
        
        />
        <Input
          type="number"
          text="CPF"
          name="cpf"
          placeholder="Insira o CPF"
          handleOnChange={(e) => setCpf(e.target.value) }
    
        />
        <div className={styles.item}>
          <button className={styles.btn} onClick={cadastrar}>Cadastrar</button> 
        </div>
      </div>
    </div>
  )
};

export default CadastroColaborador;