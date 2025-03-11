const router = require("express").Router()
const adminMiddlewere = require("../middleweres/adminMiddlewere")
const findsiteMiddlere = require("../middleweres/findsiteMiddlere")
const BlogController = require("../controllers/blogController")
const upload = require("../middleweres/blogImageMidlewere")

router.post("/create/:userID", adminMiddlewere, findsiteMiddlere, upload.single("image"), BlogController.Create)
router.delete("/delete/:bookId/:userID", adminMiddlewere, findsiteMiddlere, BlogController.Delete)
router.get("/get-all", findsiteMiddlere, BlogController.GetAll)
router.get("/get-one/:blogId", findsiteMiddlere, BlogController.GetOne)

module.exports = router