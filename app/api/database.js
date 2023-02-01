const mongoose = require('mongoose');

//url passada pelo mongobg para conexão com o banco 
const URI = 'mongodb+srv://jean:controle123@cluster0.ajadjfu.mongodb.net/controleTicket?retryWrites=true&w=majority';

//metodo para fazer a conexão com o banco 
mongoose.connect(URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
      return console.log('Banco conectado');
  })
  .catch((err) =>console.log(err));