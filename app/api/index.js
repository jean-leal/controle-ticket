const express = require('express');
const app = express();
const cors = require('cors');
require('./database');

const corsOptions ={// liberando acessos de qualquer url, sem essa permissão algumas urls são bloqueadas ao tentar a conexão 
  origin:'*', 
  credentials:true,            
  optionSuccessStatus:200,
}

app.use(express.json());
app.use(cors(corsOptions)); // solicitando a liberação dos acessos 

//rotas de conexão cpara ser acessadas pelo front
app.use('/colaborador', require('./src/routes/colaborador.routes'));
app.use('/ticket', require('./src/routes/ticket.routes'));

//variaveis
app.set('port', 8000);

//execução do server
app.listen(app.get('port'), ()=>{
  console.log(`Api executada na porta: ${app.get('port')}`)
});