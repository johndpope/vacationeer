const express = require('express')
const { readdirSync } = require('fs')
const morgan = require('morgan')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

connectDB()

// const authRoutes = require('./routes/authenticationRoutes')


const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
	app.use(cors({ origin: 'http://localhost:3000' }))
}

app.use(bodyParser.json({ limit: '3mb' }))

// app.use('/api', authRoutes)

console.log("./routes")

readdirSync('./backend/routes').map((r) => app.use('/api', require('./routes/' + r)))

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on port ${port} ${process.env.NODE_ENV}`))
