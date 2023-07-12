const express = require('express')
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOption = require('./config/corsOption')
const PORT = process.env.PORT || 3500
const app = express()

app.use(logger)
app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())
app.use('/', require('./routes/root'))

app.use('/', express.static(path.join(__dirname, '/public')))

app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`server has running on ${PORT}`))