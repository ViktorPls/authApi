const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('combined'))

app.get('/', (req, res)=>{
 res.send('<h1>Hello world!</h1>') 
})

app.listen(3000)