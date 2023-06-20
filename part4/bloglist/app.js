const config = require('./utils/config') 
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleWare = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogRouter')
const loginRouter = require('./controllers/login')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleWare.tokenExtractor)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// these middleware must come last
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app