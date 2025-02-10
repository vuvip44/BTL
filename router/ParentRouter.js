const express=require("express");
const router=express.Router();
const parentController=require("../controller/ParentController");

router.get("/", parentController.getAllParent);
router.get("/:id", parentController.getParentById);
router.post("/", parentController.createParent);
router.put("/:id", parentController.updateParent);
router.delete("/:id", parentController.deleteParent);

module.exports = router;