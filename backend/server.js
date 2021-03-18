import express from 'express'
import { readdirSync } from 'fs'
import mongoose from 'mongoose'
const morgan = require('morgan')
import cors from 'cors'
require('dotenv').config()

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
			useCreateIndex: true
		})

		console.log(`MongoDB Connected: ${conn.connection.host}`)
	} catch (error) {
		console.error(`Error: ${error.message}`)
		process.exit(1)
	}
}

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
	app.use(cors({ origin: 'http://localhost:3000' }))
}

app.use(express.json())

readdirSync('./backend/routes').map((r) => app.use('/api', require('./routes/' + r)))

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on port ${port} ${process.env.NODE_ENV}`))
