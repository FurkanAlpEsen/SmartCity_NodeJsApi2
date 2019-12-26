const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/vehicle', db.getVehicle)
app.get('/vehicle/:id', db.getVehicleId)
app.post('/vehicle', db.createVehicle)
app.put('/vehicle/:id', db.updateVehicle)
app.delete('/vehicle/:id', db.deleteVehicle)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
  


