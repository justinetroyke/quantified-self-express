const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class Food {

  static all() {
    return database('foods').select('id', 'name', 'calories')
  }

  static find(id) {
    return database('foods').where('id', id).select('id', 'name', 'calories')
    .then(rows => rows[0])
  }

  static create(attributes) {
    return database('foods')
    .insert(attributes)
    .returning(['id', 'name', 'calories'])
    .then(rows => rows[0])
  }

  static favorites() {
   return database.raw(
     `SELECT timesEaten, json_agg(json_build_object('name', name, 'calories', calories, 'mealsWhenEaten', meals)) AS foods
     FROM (
       SELECT foods.name, foods.calories, COUNT(foods.id) AS timesEaten, array_agg(DISTINCT meals.name) AS meals
       FROM foods
       LEFT JOIN meal_foods ON foods.id = meal_foods.food_id
       LEFT JOIN meals ON meals.id = meal_foods.meals_id
       GROUP BY foods.id
       ORDER BY timesEaten DESC
     ) joinsQuery
     GROUP BY timesEaten
     ORDER BY timesEaten DESC
     LIMIT 5`)
 }
}

module.exports = Food
