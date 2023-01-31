const express = require('express');
const router = express.Router();
const Ticket = require('../models/relationship/entregaTicket');

router.post('/', async (req, res)=>{
  try{
    const tiket = await new Ticket(req.body).save();   
    res.json({ error: false});
  }catch (err){
    res.json({ error: true, message: err.message });
  }
});

router.get('/tickets', async (req, res)=>{ // buscando todos os tikets no banco.
  try{
    const tickets = await Ticket.find();
    res.json({ tickets })
  } catch (err) {
    res.json({error: true, message: err.message});
  }
});

module.exports = router;