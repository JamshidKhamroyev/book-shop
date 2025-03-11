const siteModel = require("../models/siteModel")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const path = require("path")

class SiteController {
    async Create(req, res){
        try {
            const data = req.body
            const images = ["logo", "about_image", "home_image"]

            if(!data){
                images.forEach(field => {
                    if (req.files[field]){
                        const imagePath3 = path.join(__dirname, "../siteImages", req.files[field]); // Faylning to‘liq yo‘li
                        if (fs.existsSync(imagePath3)) {
                            fs.unlinkSync(imagePath3); // Faylni o‘chirish
                        }
                    }
                });
                return res.status(400).json({ok: false, message: "Ma'lumotlar mavjud emas"})
            }

            images.forEach(field => {
                if (req.files[field]) data[field] = req.files[field][0].filename;
            });

            const newSite = await siteModel.create(data)
            const token = await jwt.sign({saytId: newSite._id}, process.env.JWT_SECRET, {expiresIn: "1y"})
            res.json({ok: true, message: "Yangi kitob do'koni muvoffaqiyatli ishga tushirildi!", data: token})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async Update(req, res){
        try {
            const data = req.body
            const images = ["logo", "about_image", "home_image"]

            if(!data){
                images.forEach(field => {
                    if (req.files[field]){
                        const imagePath3 = path.join(__dirname, "../siteImages", req.files[field]); // Faylning to‘liq yo‘li
                        if (fs.existsSync(imagePath3)) {
                            fs.unlinkSync(imagePath3); // Faylni o‘chirish
                        }
                    }
                });
                return res.status(400).json({ok: false, message: "Ma'lumotlar mavjud emas"})
            }

            images.forEach(field => {
                if (req.files[field]) {
                    // Yangi rasmni bazaga saqlaymiz
                    data[field] = req.files[field][0].filename;
                }
            });

            const saytId = req.params.saytId
            const site = await siteModel.findByIdAndUpdate(saytId, data)
            if(!site){
                images.forEach(field => {
                    if (req.files[field]){
                        const imagePath3 = path.join(__dirname, "../siteImages", req.files[field]); // Faylning to‘liq yo‘li
                        if (fs.existsSync(imagePath3)) {
                            fs.unlinkSync(imagePath3); // Faylni o‘chirish
                        }
                    }
                });

                if(req.files["logo"]){
                    const imagePath3 = path.join(__dirname, "../siteImages", site.logo); // Faylning to‘liq yo‘li
                    if (fs.existsSync(imagePath3)) {
                        fs.unlinkSync(imagePath3); // Faylni o‘chirish
                    }
                }

                if(req.files["about_image"]){
                    const imagePath3 = path.join(__dirname, "../siteImages", site.about_image); // Faylning to‘liq yo‘li
                    if (fs.existsSync(imagePath3)) {
                        fs.unlinkSync(imagePath3); // Faylni o‘chirish
                    }
                }

                if(req.files["home_image"]){
                    const imagePath3 = path.join(__dirname, "../siteImages", site.home_image); // Faylning to‘liq yo‘li
                    if (fs.existsSync(imagePath3)) {
                        fs.unlinkSync(imagePath3); // Faylni o‘chirish
                    }
                }
                return res.status(400).json({ok: false, messsage: "Sayt topilmadi. Id ni tekshirib ko'ring!"})
            }

            res.json({ok: true, message: `Ushbu do'kon ${site.siteName} ma'lumotlari yangilandi!`})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async Delete(req, res){
        try {
            const saytId = req.params.saytId
            const site = await siteModel.findByIdAndDelete(saytId)
            if(!site){
                return res.status(400).json({ok: false, messsage: "Sayt topilmadi. Id ni tekshirib ko'ring!"})
            }

            const imagePath1 = path.join(__dirname, "../siteImages", site.logo); // Faylning to‘liq yo‘li
            if (fs.existsSync(imagePath1)) {
                fs.unlinkSync(imagePath1); // Faylni o‘chirish
            }

            const imagePath2 = path.join(__dirname, "../siteImages", site.home_image); // Faylning to‘liq yo‘li
            if (fs.existsSync(imagePath2)) {
                fs.unlinkSync(imagePath2); // Faylni o‘chirish
            }

            const imagePath3 = path.join(__dirname, "../siteImages", site.about_image); // Faylning to‘liq yo‘li
            if (fs.existsSync(imagePath3)) {
                fs.unlinkSync(imagePath3); // Faylni o‘chirish
            }

            res.json({ok: true, message: "Ushbu sayt o'chirib tashlandi!"})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async Activate(req, res){
        try {
            const saytId = req.params.saytId

            const site = await siteModel.findById(saytId)
            if(!site){
                return res.status(400).json({ok: false, messsage: "Sayt topilmadi. Id ni tekshirib ko'ring!"})
            }

            const currentTime = new Date(site.time)
            const newTime = new Date(currentTime.setMonth(currentTime.getMonth() + 1));
            site.time = newTime
            site.block = false
            await site.save()
            res.json({ok: true, message: "Aktivatsiya muvoffaqiyatli yakunlandi!"})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async StopWork(req, res){
        try {
            const saytId = req.params.saytId
            const site = await siteModel.findById(saytId)
            if(!site){
                return res.status(400).json({ok: false, messsage: "Sayt topilmadi. Id ni tekshirib ko'ring!"})
            }

            site.time = new Date()
            site.block = true
            await site.save()
            res.json({ok: true, message: "Site ishdan to'xtadi!"})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async giveToken(req, res){
        try {
            const saytId = req.params.saytId
            const token = jwt.sign({saytId: saytId}, process.env.JWT_SECRET, {expiresIn: "1y"})
            res.json({ok: true, message: "Sayt muvoffaqiyatli tuzatildi!", data: token})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async GetOne(req, res){
        try {
            const saytId = req.saytId
            const site = await siteModel.findById(saytId)
            if(!site){
                return res.status(400).json({ok: false, messsage: "Sayt topilmadi. Id ni tekshirib ko'ring!"})
            }

            if(site.block){
                return res.status(400).json({ok: false, message: "Saytning amal qilish muddati tugagan!"})
            }

            res.status(200).json({ok: true, message: "Sayt muvoffaqiyatli olindi!", data: site})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async GetOneMe(req, res){
        try {
            const saytId = req.params.saytId
            const site = await siteModel.findById(saytId)
            if(!site){
                return res.status(400).json({ok: false, messsage: "Sayt topilmadi. Id ni tekshirib ko'ring!"})
            }


            res.status(200).json({ok: true, message: "Sayt muvoffaqiyatli olindi!", data: site})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async GetAllSite(req, res){
        try {
            const sites = await siteModel.find()
            if(!sites){
                return res.status(400).json({ok: false, messsage: "Sayt topilmadi. Id ni tekshirib ko'ring!"})
            }            
            res.json({ok: true, messsage: "Barcha sayt topildi!", data: sites})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }
}

module.exports = new SiteController()
