const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entregaTicket = new Schema({
  colaboradorId: {
    type: mongoose.Types.ObjectId,
    ref: 'Colaborador',
    required: true,
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
  timestamps:true,
});

module.exports = mongoose.model('EntregaTicket', entregaTicket);