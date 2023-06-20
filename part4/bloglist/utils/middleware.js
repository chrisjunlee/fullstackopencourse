const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}


const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('bearer ')) {
        const token = authorization.replace('bearer ', '')
        console.log('token extracted:', token)
        req.token = token
    }
    next()
}

// extracts user info from token
// must be chained after tokenExtractor
const userExtractor = (req, res, next) => {
    if (request.token) {
        const decodedToken =
            jwt.verify(request.token, process.env.TOKEN_SECRET)
        req.decodedUsername = decodedToken.username
        req.decodedId = decodedToken.id
    }
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name == 'JsonWebTokenError') {
        return response.status(400).json({error: error.message})
    }

    next(error)
}

module.exports = {
    requestLogger,
    tokenExtractor,
    unknownEndpoint,
    errorHandler
}