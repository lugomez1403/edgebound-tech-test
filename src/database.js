const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/orders',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(db => console.log('DB isnt connect'));