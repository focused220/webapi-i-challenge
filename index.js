// implement your API here
require('dotenv').config();
const express = require('express');
const db = require('./data/db')
const server = express();

const port = process.env.PORT || 9090;

server.use(express.json()); 

server.post('/users', (req, res)=>{
    
    const newUser = req.body;
    if(newUser.name === "" || newUser.bio === ""){ return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })}
    console.log(newUser.name, newUser.bio)
    db.insert(newUser)
    .then(data => res.status(201).json(data))
    .catch(({code, message})=>{
        res.status(500).json({ error: "There was an error while saving the user to the database" })})
})

server.get('/users', (req, res) =>{
    db.find()
    .then(data => res.status(201).json(data))
    .catch(({code, message})=>{
        res.status(500).json({ error: "The users information could not be retrieved." })})
})

server.get('/users/:id', (req, res) =>{
    const {id} = req.params;
    console.log(id)
    db.findById(id)
    .then(data => res.status(201).json(data))
    .catch(({code, message})=>{
        res.status(500).json({err: message})})
})

server.delete('/users/:id', (req, res) =>{
    const {id} = req.params;
    console.log(id)
    db.remove(id)
    .then(data => res.status(201).json(data))
    .catch(({code, message})=>{
        res.status(code).json({err: message})})
})

server.put('/users/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body
    console.log(id)
    db.update(id, changes)
    .then(data => res.status(201).json(data))
    .catch(({code, message})=>{
        res.status(code).json({err: message})})
})


server.listen(port, ()=>{
    console.log(`Server listening on port ${port}` )
})
