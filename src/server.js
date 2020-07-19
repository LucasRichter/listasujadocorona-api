require('dotenv').config()

const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const glob = require('glob')
const compression = require('compression')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const expressSwagger = require('express-swagger-generator')(server)
const helmet = require('helmet')

let options = {
  swaggerDefinition: {
    info: {
      title: 'Lista Suja Corona',
      version: '1.0.0',
    },
    host: process.env.API_DOMAIN,
    basePath: '/api',
    produces: ['application/json'],
    schemes: ['http', 'https']
  },
  basedir: __dirname, //app absolute path
  files: ['./swagger/**/*.js'] //Path to the API handle folder
}
expressSwagger(options)

const rateLimit = require("express-rate-limit")

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

server.use(limiter)
server.use(helmet())
server.use(compression())
server.use(morgan('dev'))
server.disable('x-powered-by')
server.use(bodyParser.urlencoded({ extended: 'true' }))
server.use(bodyParser.json({ type: 'application/vnd.api+json' }))
server.use(methodOverride())
server.use(bodyParser.urlencoded({ extended: false }))
// Parse application/json
server.use(bodyParser.json())

// Allows for cross origin domain request:
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

// REST API routes
glob.sync(__dirname + '/api/*.js').forEach(controllerPath => {
  if (!controllerPath.includes('.test.js')) require(controllerPath)(server)
})

server.get('/health-check', (req, res) => res.status(200).send('OK'))

// Start server
server.listen(process.env.PORT, () => console.log(`listasujacorona-api running on http://localhost:${process.env.PORT}/`))
