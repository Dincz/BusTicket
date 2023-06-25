const express = require("express");

const router = express.Router();
const {
    getAllBusList,
    createBusDetails,
    getBusDetails,
    updateBusDetails,
    deleteBusDetails,
} = require("../controllers/busController");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/").get(getAllBusList);
router.route("/:id").get(getBusDetails);

router.use(validateToken);
router.route("/").post(createBusDetails);
router.route("/:id").put(updateBusDetails).delete(deleteBusDetails);
module.exports = router;
