const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()

let index = require('./routes/index');
var remote = require('./routes/remote');

// Set Port
app.set('port', (process.env.PORT || 8080));

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// static files
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))

// Cookie
app.use(cookieParser());

app.get('/', index)
app.get('/:id', remote)

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 8080!')
})