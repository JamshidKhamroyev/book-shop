const siteModel = require("../models/siteModel")
const fs = require('fs');
const path = require('path');

class ComentController {
    async Create(req, res){
        try {
            const saytId = req.saytId

            const site = await siteModel.findById(saytId)
            if(!site){
                return res.status(400).json({ok: false, message: "Xatolik yuz berdi. Iltimos ma'lumotlarni tekshirib ko'ring! Site undefined"})
            }

            if(site.system === "Standart" && site.comments.length > 12){
                return res.status(400).json({ok: false, message: "Sizning tarifingizga ko'ra siz faqat 12 dona fikr yoza olasiz!"}) 
            }else if(site.system === "Pro" && site.blogs.length > 20){
                return res.status(400).json({ok: false, message: "Sizning tarifingizga ko'ra siz faqat 20 dona fikr yoza olasiz!"}) 
            }

            const comment = site.comments.push(req.body)
            await site.save()
            if(!comment){
                return res.status(400).json({ok: false, message: "Ma'lumotlarni tekshirib ko'ring. Xatolik bor!"})
            }
            res.json({ok: true, message: "Coment qo'shildi!", data: comment})
        } catch (error) {
            const filePath = path.join(__dirname, "../bookImages", image);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async Delete(req, res){
        try {
            const saytId = req.saytId
            const site = await siteModel.findById(saytId)
            if(!site){
                return res.status(400).json({ok: false, message: "Xatolik yuz berdi. Iltimos ma'lumotlarni tekshirib ko'ring! Site undefined"})
            }
            
            const comentId = req.params.comentId
            site.comments = site.comments.filter(book => book._id.toString() !== comentId)
            await site.save()
            res.json({ok: true, message: "Coment o'chirib tashlandi!"})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async GetAll(req, res){
        try {
            const saytId = req.saytId
            const site = await siteModel.findById(saytId)
            res.json({ok: true, message: "Barcha comentlar olindi!", data: site.comments})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }
}

module.exports = new ComentController()