const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colaborador = new Schema ({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório.']
  },  
  cpf: {
    type: Number,
    required: [true, 'CPF é obrigatório.']
  },  
  status: {
    type: String,
    required: true,
    enum: ['A', 'I'],
    default: 'A' // deixa como padrão se nehum for eadicionado 
  },
},{
  // coloca automatico as datas de tempo, data de criação e data de alçteração: createdAt e updatedAt
  timestamps:true,
});

module.exports = mongoose.model('Colaborador', colaborador);