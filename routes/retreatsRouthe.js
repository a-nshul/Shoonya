const express = require('express');
const router = express.Router();
const { getRetreats ,createRetreat} = require('../controllers/retreatController');

router.get('/', getRetreats);
router.post('/',createRetreat)
module.exports = router;
