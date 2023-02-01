const express = require('express');
const router = express.Router();
const Colaborador = require('../models/colaborador');

//utilizando o try, catch para o tratamento de erro, para não parar a aplicação

router.post('/', async (req, res)=>{ // rota para cadastrar os colaboradores 
  try{
    //tratar para não permitir cadastro duplicado de CPF
    const { cpf } = req.body;
    const temCadastro = await Colaborador.findOne({ cpf });
    if (!temCadastro) {
      const colaborador = await new Colaborador(req.body).save();
      res.json({ colaborador });
    } else{
      res.json({ error: true, message: 'Colaborador já tem cadastro!' });
    }
  }catch (err){
    res.json({ error: true, message: err.message });
  }
});

router.get('/colaboradores/:id', async (req, res)=>{ // buscando colaborador conforme o id passado na url
  try{ 
    const _id = req.params.id;
    const colaborador = await Colaborador.findOne({ _id });
    res.json({ colaborador });
  } catch (err) {
    res.json({error: true, message: err.message});
  }
});

router.get('/colaboradores', async (req, res)=>{ // buscando todos os colaboradores no banco.
  try{
    const colaboradores = await Colaborador.find();
    res.json({ colaboradores })
  } catch (err) {
    res.json({error: true, message: err.message});
  }
});

router.put('/:id', async (req, res)=>{
  try{
    //atulizando colaborador 
    const colaborador = req.body;
    await Colaborador.findByIdAndUpdate(req.params.id, colaborador);
    res.json({ error: false });
  } catch (err) {
    res.json({error: true, message: err.message});
  }
});

module.exports = router; //exportando as rotas 