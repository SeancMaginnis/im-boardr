var express = require('express')
var bp = require('body-parser')
var server = express()
var cors = require('cors')
var port = 3000

var whitelist = ['http://localhost:8080'];
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
server.use(cors(corsOptions))

//Fire up database connection
require('./server-assets/db/gearhost-config')


//REGISTER MIDDLEWEAR
server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))

//REGISTER YOUR AUTH ROUTES BEFORE YOUR GATEKEEPER, OTHERWISE YOU WILL NEVER GET LOGGED IN
let auth = require('./server-assets/auth/routes')

server.use(auth.session)
server.use(auth.router)


//Gate Keeper Must login to access any route below this code
server.use((req, res, next) => {
  if (!req.session.uid) {
    return res.status(401).send({
      error: 'please login to continue'
    })
  }
  next()
})

//YOUR ROUTES HERE!!!!!!
let boardRoutes = require('./server-assets/routes/board-router')
let listRoutes = require('./server-assets/routes/list-router')
let taskRoutes = require('./server-assets/routes/task-router')
let commentRoutes = require('./server-assets/routes/comment-router')
server.use('/api/boards', boardRoutes)
server.use('/api/boards/:id/lists', listRoutes)
server.use('/api/boards/:id/lists/:id/tasks', taskRoutes)
server.use('/api/boards/:id/lists/:id/tasks/:id/comments', commentRoutes)







//Catch all
server.use('*', (req, res, next) => {
  res.status(404).send({
    error: 'No matching routes'
  })
})


server.listen(port, () => {
  console.log('server running on port', port)
})