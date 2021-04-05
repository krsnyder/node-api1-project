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

server.put('/api/users/:id', (req, res) => {
  const {id} = req.params
  const updatedUser = req.body
  if (!updatedUser.name || !updatedUser.bio) {
    res.status(422).json("Name and Bio required")
  } else {
    console.log(id, updatedUser)
    Users.update(id, updatedUser)
      .then(res => {
        console.log(res)
        res.status(200).json(updatedUser)
      })
      .catch(err => {
        res.status(400).json({message: err.message})
    })
  }
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(res => {
      console.log(res)
      res.status(200).json(res)
    })
    .catch(err => {
    res.status(400).json({message: err.message})
  })
})

server.use("*", (req, res) => {
  res.status(404).json({message: "That aint it, Chief."})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
