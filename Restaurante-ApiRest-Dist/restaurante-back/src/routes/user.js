const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Transaction = require('../models/transactions');
const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');


// Listado de usuarios
router.get('/list', verifytoken,(req, res, next) => {
    User.find((err,users) => {
        res.status(200).send(users);
    });
});

// Crear usuario
router.post('/signup', async (req,res)=> {
  const {name,lastname,phone,email,password,cash,active}= req.body;
  const newUser = new User ({name,lastname,phone,email, password,cash,active});
  await newUser.save()
  const token = jwt.sign({_id: newUser._id},'secretkey')
  res.status(200).json({token})
})

// Ver dinero del usuario
router.get('/getcash', verifytoken, async(req, res, next) => {
  var iduser = req.headers.id;
  var user = await User.findOne({_id: iduser })
    //o llamar nuevamente a find() y res.render();
  var cash = user.cash;
  console.log(user)
    res.status(200).json(cash);
});

// Eliminar/Desactivar usuario
router.post('/setcash', verifytoken, (req, res, next) => {
  let iduser = req.headers.id;
  User.findByIdAndUpdate({_id: iduser },{ cash:req.body.cash }, (err) => {
    if (err) throw err;
    //o llamar nuevamente a find() y res.render();
    res.status(200).send("deleted");
  });
});


// Eliminar/Desactivar usuario
router.delete('/delete', verifytoken, (req, res, next) => {
    let iduser = req.headers.id;
    User.findByIdAndUpdate({_id: iduser },{ active:false }, (err) => {
      if (err) throw err;
      //o llamar nuevamente a find() y res.render();
      res.status(200).send("deleted");
    });
  });

// Actualizar usuario
router.put('/update', verifytoken, (req, res, next) => {
  let iduser = req.headers.id;  
  User.findOne({_id: iduser }, (err, user) => {
    if (err) throw err;
    User.findByIdAndUpdate({_id: iduser}, {
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
    }, (err,user) => {
        console.log(err, user)
    })
    res.status(200).send("actualizado");
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