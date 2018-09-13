const express = require('express');
const router = express.Router();
var cors = require('cors')

const favoriteFoodsController = require('../../../controllers/favoriteFoodsController')

router.get('', favoriteFoodsController.index)

module.exports = router;
