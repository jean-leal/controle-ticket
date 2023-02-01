const mongoose = require('mongoose'); //solicitando o modulo que faz a ponte do node.js com o banco 
const Schema = mongoose.Schema; 

const entregaTicket = new Schema({
  //selecionando o que será informado no cadastro do banco
  colaborador: {
    colaboradorId : {
    type: mongoose.Types.ObjectId,
    ref: 'Colaborador',
    required: true,
    }, 
    nome : {
      type: String,
      required: true
    },
    cpf : {
      type: Number,
      required: true
    }    
  }, 
  qtdTicketEntregue:{
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['A', 'I'],
    default: 'A'
  }
}, {
  timestamps:true, // paga automaticamente as datas de criação a atualização 
});

module.exports = mongoose.model('EntregaTicket', entregaTicket);