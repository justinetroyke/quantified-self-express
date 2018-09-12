const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Meal {
  static all() {
    return database('meals').select('id', 'name')
  }

  static find(id) {
    return database('meals').where('id', id).select('id', 'name')
    .then(rows => rows[0])
  }
}

module.exports = Meal
