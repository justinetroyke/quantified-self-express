const express = require('express');
const router = express.Router();

const MealsController = require('../../../controllers/mealsController')

router.get('/', MealsController.index)

module.exports = router;
