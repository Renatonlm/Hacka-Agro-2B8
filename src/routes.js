const { response } = require('express');
const express = require('express');
const router = express.Router();
const UserModel = require('../models/User')

//Rotas
router.get('/', (req, res) => { res.send("Home")} );


/*
router.post('/', (req, res) => {
    console.log("Author: " + req.body.author);
    console.log("Tetx: " + req.body.text);
    res.send('Recebido')
})*/

module.exports = router;