const express  = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const db = "mongodb+srv://Danteh:Let'sgo2020@clustertest-ws1j1.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err);
    } else {
        console.log('Connected to mongodb');
    }
});



router.get('/', (req, res) => {
    res.send('From API route');
});

router.post('/register', (req, res) => {
    let userData = req.body;

    // res.setHeader('Content-Type', 'application/json')
    // res.status(200).send({'name': 'danteh'});

    let user = new User(userData);
    user.save((error, registeredUser) => {
        console.log(error);
        console.log(registeredUser);
        if(error){
            console.log(error);
        }else {
            // res.setHeader('Content-Type', 'application/json')
           res.status(200).send(registeredUser);
        }
    })
});

module.exports = router;
