const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Transaction = require('../models/transactions');
const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');


// Listado de transacciones
router.get('/list', (req, res, next) => {
    Transaction.find((err,all) => {
        res.status(200).send(all);
    });
});

// Registrar transaccion
router.post('/register', verifytoken,async (req,res)=> {
    const {transmitter,receiver,value,reference}= req.body;
    const newTrans = new Transaction ({transmitter,receiver,value,reference});
    await newTrans.save()
    res.status(200).json({newTrans})
})
//Consignar Dinero
router.post('/consign', verifytoken,async (req,res)=> {
    const {transmitter,receiver,value,reference}= req.body;
    var istrasn = await User.findById({ _id: transmitter});
    var isrece = await User.findById({ _id: receiver});
    if(istrasn&&isrece){
        var newvalue = Number(isrece.cash) + Number(value);
        await User.findByIdAndUpdate({_id:receiver},{cash:newvalue})
    }else{
        res.status(420).send('usuarios no validos')
    }
    const newTrans = new Transaction ({transmitter,receiver,value,reference});
    await newTrans.save()
    res.status(200).json({newTrans})
})


//Retirar Dinero
router.post('/outcash', verifytoken,async (req,res)=> {
    const {transmitter,receiver,value,reference}= req.body;
    var istrasn = await User.findById({ _id: transmitter});
    var isrece = await User.findById({ _id: receiver});
    if(istrasn&&isrece){
        var newvalue = Number(isrece.cash) - Number(value);
        if(newvalue < 0){
            res.status(401).send('Fondos insuficientes')
            return ;
        }
        await User.findByIdAndUpdate({_id:receiver},{cash:newvalue})
    }else{
        res.status(420).send('usuarios no validos')
    }
    const newTrans = new Transaction ({transmitter,receiver,value,reference});
    await newTrans.save()
    res.status(200).json({newTrans})
})


//Enviar Dinero
router.post('/sendcash', verifytoken,async (req,res)=> {
    const {transmitter,receiver,value,reference}= req.body;
    var istrasn = await User.findById({ _id: transmitter});
    var isrece = await User.findById({ _id: receiver});
    if(istrasn&&isrece){
        var newvaluetrans = Number(istrasn.cash) - Number(value);
        var newvaluerece = Number(isrece.cash) + Number(value);
        if(newvaluetrans < 0){
            res.status(400).send('Fondos insuficientes')
        }
        if (transmitter == receiver){
            await User.findByIdAndUpdate({_id:receiver},{cash:isrece.cash})
        }else{
            await User.findByIdAndUpdate({_id:transmitter},{cash:newvaluetrans})
            await User.findByIdAndUpdate({_id:receiver},{cash:newvaluerece})
        }
    }else{
        res.status(401).send('usuarios no validos')
    }
    const newTrans = new Transaction ({transmitter,receiver,value,reference});
    await newTrans.save()
    res.status(200).json({newTrans})
})
// Actualizar transaccion
router.put('/update', verifytoken, (req, res, next) => {
  let idtrans = req.headers.id;  
  let copytrans = Transaction.findOne({_id: idtrans }, (err, transaction) => {
    if (err) throw err;
    User.findByIdAndUpdate({_id: idtrans}, {
        value: req.body.value,
        reference: req.body.reference,
    }, (err,transaction) => {
        console.log(err, transaction)
    })
    res.status(200).send("updated");
  });
});



module.exports = router;


// Verificacion de tokens 
function verifytoken(req,res,next){
  if(!req.headers.authorization){
      return res.status(401).send('Unauthorize request');
  }
  const token = req.headers.authorization.split(' ')[1];
  if(token == 'null') {
      return res.status(401).send('Unauthorize Request');
  }
  const payload = jwt.verify(token,'secretkey')
  console.log(payload)
  req.userId = payload._id;
  next();
}