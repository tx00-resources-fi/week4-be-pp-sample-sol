const Tour = require("../models/tourModel");

// GET /tours
const getAllTours = (req, res) => {
  const tours = Tour.getAll();
  res.json(tours);
};

// POST /tours
const createTour = (req, res) => {
  const newTour = Tour.addOne({ ...req.body }); // Spread the req.body object

  if (newTour) {
    res.status(201).json(newTour); // 201 Created
  } else {
    // Handle error (e.g., failed to create tour)
    res.status(400).json({ message: "Invalid tour data" });
  }
};
 
// GET /tours/:tourId
const getTourById = (req, res) => {
  const tourId = req.params.tourId;
  const tour = Tour.findById(tourId);
  if (tour) {
    res.json(tour);
  } else {
    res.status(404).json({ message: "Tour not found" });
  }
};

// PUT /tours/:tourId
const updateTour = (req, res) => {
  const tourId = req.params.tourId;
  const updatedTour = Tour.updateOneById(tourId, { ...req.body }); // Spread the req.body object

  if (updatedTour) {
    res.json(updatedTour);
  } else {
    // Handle update failure (e.g., tour not found)
    res.status(404).json({ message: "Tour not found" });
  }
};

// DELETE /tours/:tourId
const deleteTour = (req, res) => {
  const tourId = req.params.tourId;
  const isDeleted = Tour.deleteOneById(tourId);

  if (isDeleted) {
    res.status(204).send(); // 204 No Content
  } else {
    // Handle deletion failure (e.g., tour not found)
    res.status(404).json({ message: "Tour not found" });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
};
