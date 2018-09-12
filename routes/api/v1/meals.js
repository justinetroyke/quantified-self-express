const express = require('express');
const router = express.Router();
var cors = require('cors')

const MealsController = require('../../../controllers/mealsController')
const MealFoodsController = require('../../../controllers/mealFoodsController')

router.get('', MealsController.index)
router.get('/:meal_id/foods', MealsController.show)

module.exports = router;
