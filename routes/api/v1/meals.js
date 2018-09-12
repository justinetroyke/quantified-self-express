const express = require('express');
const router = express.Router();
var cors = require('cors')

const MealsController = require('../../../controllers/mealsController')

router.get('', MealsController.index)

module.exports = router;
