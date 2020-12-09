const { Router } = require('express');
const router = Router();

const User = require('../models/user');
const Transaction= require('../models/transactions');
const jwt = require('jsonwebtoken');
const user = require('./user');


router.post('/signin', async (req,res)=> {
    const {email,password}= req.body;
    const user = await User.findOne({email})
    if(!user) return res.status(401).send("El correo no existe")
    if(user.password !== password) return res.status(402).send("Contraseña incorrecta")
    const token = jwt.sign({_id: user._id},'secretkey')
    const id= user._id
    return res.status(200).json({token,id})
})


router.post('/getpass', async (req,res)=> {
    const {email,phone}= req.body;
    var user = await User.findOne({email})
    if(!user) return res.status(401).send("El correo no existe")
    if(user.phone != phone) return res.status(401).send("Los datos no coinciden")
    const pass = user.password;
    // const token = jwt.sign({_id: user._id},'secretkey')
    return res.status(200).json({pass})
})

router.get('/task', (req,res) => {
    res.json([{
        _id: 1,
        name: 'task 1',
        description: 'jaja',
        date: '2019-10-12'
    },
    {
        _id: 2,
        name: 'task 2',
        description: 'jaja',
        date: '2019-10-12'
    },{
        _id: 3,
        name: 'task 3',
        description: 'jaja',
        date: '2019-10-12'
    }]

    )
})

router.get('/privatetask', verifytoken, (req,res) => {
    res.json([{
        _id: 1,
        name: 'task 4',
        description: 'jaja',
        date: '2019-10-12'
    },
    {
        _id: 2,
        name: 'task 5',
        description: 'jaja',
        date: '2019-10-12'
    },{
        _id: 3,
        name: 'task 6',
        description: 'jaja',
        date: '2019-10-12'
    }]

    )
});



module.exports = router;


function verifytoken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorize request');
    }
    const token = req.headers.authorization.split(' ')[1];
    if(token == 'null') {
        return res.status(401).sent('Unauthorize Request');
    }   
    const payload = jwt.verify(token,'secretkey')
    console.log(payload)
    req.userId = payload._id;
    next();
}