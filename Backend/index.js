

'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog', {useNewUrlParser :true , useUnifiedTopology: true})
.then( () => {
   console.log('Conectado a la bd freezer');

   // Create the server and listen to Http Petitions
   app.listen(port, () =>{
    console.log('Server corriendo en http://localhost:'+port);
   });

} );