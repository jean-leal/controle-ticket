const mongoose = require('mongoose');
const URI = 'mongodb+srv://jean:controle123@cluster0.ajadjfu.mongodb.net/controleTicket?retryWrites=true&w=majority';

mongoose.connect(URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
      return console.log('Banco conectado');
  })
  .catch((err) =>console.log(err));