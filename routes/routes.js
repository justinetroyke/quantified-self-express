var express = require('express');
var router = express.Router()
var cors = require('cors')
express().use(cors())

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
router.use(cors());

router.get('/foods', (request, response, next)=>{
  database('foods').select()
    .then((foods)=>{
      response.status(200).json(foods)
    })
    .catch((error)=>{
      response.status(500).json({error})
    });
});

router.get('/foods/:id', (request, response, next)=>{
  let id = request.params.id
  database('foods').select().where('id', id)
    .then((foods)=>{
      response.status(200).json(foods[0])
    })
    .catch((error)=>{
      response.status(500).json({error})
    });
});

module.exports = router;
