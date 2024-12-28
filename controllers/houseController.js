// controllers/houseController.js
const House = require('../model/maison');

// Get all houses
const getAllHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.status(200).json(houses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch houses' });
  }
};

// Get a house by ID
const getHouseById = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) return res.status(404).json({ error: 'House not found' });
    res.status(200).json(house);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch house' });
  }
};

// Create a new house
const createHouse = async (req, res) => {
  try {
    const { title, price, location, description, imageUrl } = req.body;
    const newHouse = new House({ title, price, location, description, imageUrl });
    await newHouse.save();
    res.status(201).json(newHouse);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create house' });
  }
};

// Update a house
const updateHouse = async (req, res) => {
  try {
    const { title, price, location, description, imageUrl } = req.body;
    const updatedHouse = await House.findByIdAndUpdate(
      req.params.id,
      { title, price, location, description, imageUrl },
      { new: true }
    );
    if (!updatedHouse) return res.status(404).json({ error: 'House not found' });
    res.status(200).json(updatedHouse);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update house' });
  }
};

// Delete a house
const deleteHouse = async (req, res) => {
  try {
    const deletedHouse = await House.findByIdAndDelete(req.params.id);
    if (!deletedHouse) return res.status(404).json({ error: 'House not found' });
    res.status(200).json({ message: 'House deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete house' });
  }
};

module.exports = {
  getAllHouses,
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse,
};
