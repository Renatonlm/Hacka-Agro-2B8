const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
require('dotenv/config')

app.use(cors())
app.use(bodyParser.json())

//Rotas
const Routes = require('./routes')
app.use('/', Routes)

//Conexão com o banco
//var connection = process.env.DB_CONNECTION
//mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Conectado ao banco")); 

app.listen(3001);
