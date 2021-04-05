const express = require("express")
const Users = require('./users/model')
const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      console.log(users)
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
})

server.get('/api/users/:id', (req,res) => {
  const { id } = req.params;
  console.log(id)
  Users.findById(id)
    .then(user => {
      console.log(user)
      res.status(200).json(user)
    })
    .catch(err => {
    res.status(422).json({message: err.message})
  })
})

// server.post('/api/users', (req, res) => {
  
// })

// server.put('/api/users:id', (req, res) => {
  
// })

// server.delete('/api/users/:id', (req, res) => {
  
// })

server.use("*", (req, res) => {
  res.status(404).json({message: "Let's get this party rockin"})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
