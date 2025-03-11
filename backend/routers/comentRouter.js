const router = require("express").Router()
const adminMiddlewere = require("../middleweres/adminMiddlewere")
const findsiteMiddlere = require("../middleweres/findsiteMiddlere")
const comentController = require("../controllers/comentController")

router.post("/create", findsiteMiddlere, comentController.Create)
router.delete("/delete/:comentId/:userID", adminMiddlewere, findsiteMiddlere, comentController.Delete)
router.get("/get-all", findsiteMiddlere, comentController.GetAll)

module.exports = router