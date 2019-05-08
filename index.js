// implement your API here
const express = require('express');
const db = require('./data/db')
const server = express();
server.use(express.json()); 

server.post('/users', (req, res)=>{
    
    const newUser = req.body;
    if(newUser.name === "" || newUser.bio === ""){ return console.log('empty')}
    console.log(newUser.name, newUser.bio)
    db.insert(newUser)
    .then(data => res.status(201).json(data))
    .catch(({code, message})=>{
        res.status(code).json({err: message})})
})

server.get('/users', (req, res) =>{
    db.find()
    .then(data => res.status(201).json(data))
    .catch(({code, message})=>{
        res.status(code).json({err: message})})
})

server.get('/users/:id', (req, res) =>{
    const {id} = req.params;
    console.log(id)
    db.findById(id)
    .then(data => res.status(201).json(data))
    .catch(({code, message})=>{
        res.status(code).json({err: message})})
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


server.listen(9090, ()=>{
    console.log('Server listening on port 9090')
})
