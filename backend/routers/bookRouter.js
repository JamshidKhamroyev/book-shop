const router = require("express").Router()
const BookController = require("../controllers/bookController")
const adminMiddlewere = require("../middleweres/adminMiddlewere")
const findsiteMiddlere = require("../middleweres/findsiteMiddlere")

router.post("/create/:userID", adminMiddlewere, findsiteMiddlere, BookController.Create)
router.put("/update/:userID/:bookId", adminMiddlewere, findsiteMiddlere, BookController.Update)
router.put("/add-eyes/:bookId", findsiteMiddlere, BookController.AddEyes)
router.delete("/delete/:userID/:bookId", adminMiddlewere, findsiteMiddlere, BookController.Delete)
router.get("/get-one/:bookId", findsiteMiddlere, BookController.GetOne)
router.get("/get-all", findsiteMiddlere, BookController.GetAll)

module.exports = router