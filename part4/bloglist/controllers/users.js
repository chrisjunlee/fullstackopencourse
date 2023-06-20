const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    // password minlength check
    if(request.body.password.length < 3) {

        return response.status(400).json({error: "Password minlength: 3"})
    }


    const saltRounds = 10
    console.log('p1', request.body)
    console.log('pass', password, saltRounds)

    const passwordHash = await bcrypt.hash(password, saltRounds)

    try {
        const user = new User({
            username,
            name,
            passwordHash,
        })
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (ex) {
        next(ex)
    }
})

usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({}).populate('blogs', {url: 1, title: 1, author: 1})
    res.json(users)
})

module.exports = usersRouter