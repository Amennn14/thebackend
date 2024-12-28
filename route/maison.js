// routes/houseRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllHouses,
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse,
} = require('../controllers/houseController');

// CRUD Routes
router.get('/', getAllHouses);
router.get('/:id', getHouseById);
router.post('/', createHouse);
router.put('/:id', updateHouse);
router.delete('/:id', deleteHouse);

module.exports = router;
