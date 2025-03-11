const router = require("express").Router()
const SiteController = require("../controllers/siteController")
const ownerMiddlewere = require("../middleweres/ownerMiddlewere")
const findSiteMiddlewere = require("../middleweres/findsiteMiddlere")
const {uploadMiddleware} = require("../middleweres/siteImageMiddlewere")

router.post("/create", ownerMiddlewere, uploadMiddleware, SiteController.Create)
router.put("/update/:saytId", ownerMiddlewere, uploadMiddleware, SiteController.Update)
router.delete("/delete/:saytId", ownerMiddlewere, SiteController.Delete)
router.put("/activate/:saytId", ownerMiddlewere, SiteController.Activate)
router.put("/stop/:saytId", ownerMiddlewere, SiteController.StopWork)
router.put("/give-new-token/:saytId", ownerMiddlewere, SiteController.giveToken)
router.get("/get-one", findSiteMiddlewere,  SiteController.GetOne)
router.get("/get-one-me/:saytId",  SiteController.GetOneMe)
router.get("/get-all", ownerMiddlewere, SiteController.GetAllSite)

module.exports = router