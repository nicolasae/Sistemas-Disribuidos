const mogoose = require('mongoose')

mogoose.connect('mongodb://localhost/Distribuidos',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db=>console.log('connected'))
    .catch(err=>console.log(err));