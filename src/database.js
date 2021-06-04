const mongoose = require('mongoose');

//Conexion con la base de datos que se crea automaticamente
mongoose.connect('mongodb://localhost/orders',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(db => console.log('DB isnt connect'));