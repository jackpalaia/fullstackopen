const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// default route = /api/users
usersRouter.route('/')
  .get(async (req, res) => {
    const users = await User.find({}).populate('blogs', { user: 0 })
    res.send(users.map(u => u.toJSON()))
  })
  .post(async (req, res) => {
    const body = req.body
  
    if (!body.password || body.password.length < 3) {
      res.status(400).json({ error: 'password missing or password under 3 characters' })
    }
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })
  
    const savedUser = await user.save()
  
    res.send(savedUser.toJSON())
  })

usersRouter.route('/:id')
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(204).end()
  })

module.exports = usersRouter