const express=require("express");
const router=express.Router();
const driverController=require("../controller/DriverController");

router.get("/", driverController.getAllDriver);
router.get("/:id", driverController.getDriverById);
router.post("/", driverController.createDriver);
router.put("/:id", driverController.updateDriver);
router.delete("/:id", driverController.deleteDriver);

module.exports = router;