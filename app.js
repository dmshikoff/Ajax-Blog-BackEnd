const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/posts', require('./routes/post'))

app.use(function(req, res, next){
    next({status: 404, message: 'Route not found' })
  })
  
  app.use(function(err, req, res, next){
    const errorMessage = {}
  
    if(process.env.NODE_ENV !== 'production' && err.stack)
      errorMessage.stack = err.stack
  
    errorMessage.status = err.status || 500
    errorMessage.message = err.message || 'Internal Server Error'
  
    res.status(errorMessage.status).send(errorMessage)
  })
  
  const port = process.env.PORT || 3000
  
  app.listen(port, function(){
    console.log(`Listening on port ${port}`)
  })