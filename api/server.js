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
        res.status(404).json("The user with the specified ID does not exist")
      } else {
        res.status(200).json(user)
      }
    })
    .catch(() => {
    res.status(500).json({message: "The user information could not be retrieved"})
  })
})

server.post('/api/users', (req, res) => {
  const newUser = req.body
  if (!newUser.bio || !newUser.name) {
    res.status(400).json("Please provide name and bio for the user")
  } else {    
    Users.insert(newUser)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(() => {
      res.status(500).json({message: "There was an error while saving the user to the database"})
    })
  }
})

server.put('/api/users/:id', async (req, res) => {
  const {id} = req.params
  const changes = req.body

  try{
      if(!changes.name || !changes.bio){
          res.status(400).json("Please provide name and bio for the user")
      }else{
          const updatedUser = await Users.update(id,changes)
          if(!updatedUser){
              res.status(404).json("The user with the specified ID does not exist")
          }else{
              res.status(201).json(updatedUser)
          }            
      }       
  }catch(err){
      res.status(500).json({message: "The user information could not be modified"})
  }
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(res => {
      res.status(200).json(res.data)
    })
    .catch(err => {
    res.status(400).json({message: err.message})
  })
})

server.use("*", (req, res) => {
  res.status(404).json({message: "That aint it, Chief."})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
