const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Transportation',
  password: 'human',
  port: 5432,
})

const getVehicle = (request, response) => {
    pool.query('SELECT * FROM tbl_vehicle ORDER BY "VehicleId" ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getVehicleId = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM tbl_vehicle WHERE "VehicleId" = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createVehicle = (request, response) => {
    const { Price, StartPoint,EndPoint,VoyageCount,typeid,FirstVoyage,LastVoyage } = request.body
  
    pool.query(
        'INSERT INTO tbl_vehicle("Price", "StartPoint", "EndPoint", "VoyageCount", typeid, "FirstVoyage", "LastVoyage") VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [Price, StartPoint,EndPoint,VoyageCount,typeid,FirstVoyage,LastVoyage], (error, results) => {
      if (error) {
        throw error
      }
      //response.status(201).send(`Vehicle added with ID: ${result.insertId}`)
      response.status(201).send(`Vehicle added!!`)
    })
}

const updateVehicle = (request, response) => {
    const id = parseInt(request.params.id)
    const { Price } = request.body
  
    pool.query(
      'UPDATE tbl_vehicle SET "Price" = $1 WHERE "VehicleId" = $2',
      [ Price, id ],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Vehicle modified with ID: ${id}`)
      }
    )
}

const deleteVehicle = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM tbl_vehicle WHERE "VehicleId" = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Vehicle deleted with ID: ${id}`)
    })
  }

  module.exports = {
    getVehicle,
    getVehicleId,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  }