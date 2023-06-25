/* eslint-disable consistent-return */
const asyncHandler = require("../middleware/asyncHandler");
const busDetails = require("../models/bus");
const { constants } = require("../constants");

// @desc: Get all bus list
// @route GET /api/buses
const getAllBusList = asyncHandler(async (req, res) => {
    const busesList = await busDetails.find({});
    res.status(constants.SUCCESSFUL_REQUEST).json(busesList);
});

// @desc: Create New Bus Details
// @route POST /api/buses
// @access private
const createBusDetails = asyncHandler(async (req, res) => {
    const {
        busNum,
        busType,
        departure,
        destination,
        totalSeats,
        availableSeats,
    } = req.body;

    if (!busNum || !busType || !departure || !destination || !totalSeats || !availableSeats) {
        res.status(constants.VALIDATION_ERROR).json({ message: "All fields are required" });
    }

    // eslint-disable-next-line new-cap
    const bus = new busDetails({
        busNum,
        busType,
        departure,
        destination,
        totalSeats,
        availableSeats,
        busId: req.body.id,
    });
    const result = await bus.save();

    res.status(constants.SUCCESSFUL_REQUEST).json(result);
});

// @desc Get bus details
// @route GET /api/busesList/:id
const getBusDetails = asyncHandler(async (req, res) => {
    const bus = await busDetails.findById(req.params.id);

    if (!bus) {
        res.status(constants.NOT_FOUND).json({ message: "bus details not found" });
    }

    res.status(constants.SUCCESSFUL_REQUEST).json(bus);
});

// @desc update bus details
// @route PUT /api/busesList/:id
// @access private
const updateBusDetails = asyncHandler(async (req, res) => {
    const bus = await busDetails.findById(req.params.id);

    if (!bus) {
        return res.status(constants.NOT_FOUND).json({ message: "Bus not found" });
    }

    const updatedBusDetails = await busDetails.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
    );

    res.status(constants.SUCCESSFUL_REQUEST).json(updatedBusDetails);
});

// @desc delete bus details
// @route DELETE /api/busesList/:id
// @access private
const deleteBusDetails = asyncHandler(async (req, res) => {
    const bus = await busDetails.findById(req.params.id);

    if (!bus) {
        throw new Error(constants.NOT_FOUND);
    }

    await bus.deleteOne({ _id: req.params.id });

    res.status(constants.SUCCESSFUL_REQUEST).json({ message: "deleted successfully" });
});

module.exports = {
    getAllBusList,
    createBusDetails,
    getBusDetails,
    updateBusDetails,
    deleteBusDetails,
};
