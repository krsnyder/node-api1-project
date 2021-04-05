const express = require("express")
const Users = require('./users/model')
const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
})

server.get('/api/users/:id', (req,res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      if (!user) {
        res.status(404).json("User not found")
      } else {
        res.status(200).json(user)
      }
    })
    .catch(err => {
    res.status(500).json({message: err.message})
  })
})

server.post('/api/users', (req, res) => {
  const newUser = req.body
  console.log(res.body)
  if (!newUser.bio || !newUser.name) {
    res.status(422).json("Name and Bio required")
  } else {    
    Users.insert(newUser)
    .then(user => {
      console.log("User info: ", user)
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(400).json({message: err.message})
    })
  }
})

// server.put('/api/users:id', (req, res) => {
  
// })

// server.delete('/api/users/:id', (req, res) => {
  
// })

server.use("*", (req, res) => {
  res.status(404).json({message: "Let's get this party rockin"})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
