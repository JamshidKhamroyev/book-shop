const siteModel = require("../models/siteModel")
const fs = require('fs');
const path = require('path');

class BlogController {
    async Create(req, res){
        try {
            const saytId = req.saytId
            const image = req.file.filename

            const site = await siteModel.findById(saytId)
            if(!site){
                const filePath = path.join(__dirname, "../blogImages", image);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
                return res.status(400).json({ok: false, message: "Xatolik yuz berdi. Iltimos ma'lumotlarni tekshirib ko'ring! Site undefined"})
            }

            if(site.block){
                return res.status(400).json({ok: false, message: "Sizning hisobingiz ishlamayapti! Ma'lumotlarni tekshirib ko'ring!"})
            }

            if(site.system === "Standart" && site.blogs.length == 1){
                const filePath = path.join(__dirname, "../blogImages", image);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
                return res.status(400).json({ok: false, message: "Sizning tarifingizga ko'ra siz faqat 1 dona blog qo'ya olasiz!"}) 
            }else if(site.system === "Pro" && site.blogs.length == 3){
                const filePath = path.join(__dirname, "../blogImages", image);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
                return res.status(400).json({ok: false, message: "Sizning tarifingizga ko'ra siz faqat 3 dona blog qo'ya olasiz!"}) 
            }

            const newBlog = req.body
            const blog = site.blogs.push({...newBlog, "image": image})
            await site.save()
            res.json({ok: true, message: "Blog qo'shildi!", data: blog})
        } catch (error) {
            const image = req.file.filename
            const filePath = path.join(__dirname, "../blogImages", image);
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

            
            
            const bookId = req.params.bookId
            const oldBook = site.blogs.find(book => book._id.toString() === bookId)
            if(oldBook){
                site.blogs = site.blogs.filter(book => book._id.toString() !== bookId)
                await site.save()

                const filePath = path.join(__dirname, "../blogImages", oldBook.image);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
                return res.status(200).json({ok: true, message: "Blog o'chirildi!", data: oldBook})
            }else{
                return res.status(400).json({ok: false, message: "Blog topilmadi!"})
            }
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }
    
    async GetAll(req, res){
        try {
            const site = await siteModel.findById(req.saytId)
            if(!site){
                return res.status(400).json({ok: false, message: "Xatolik"})
            }

            if(site.block){
                return res.status(400).json({ok: false, message: "Sizning hisobingiz ishlamayapti! Ma'lumotlarni tekshirib ko'ring!"})
            }
            res.json({ok: true, message: "Ok", data: site.blogs})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async GetOne(req, res){
        try {
            const saytId = req.saytId
            const {blogId} = req.params

            const site = await siteModel.findById(saytId)
            if(!site){
                return res.status(400).json({ok: false, message: "Site topilmadi!"})
            }
            if(site.block){
                return res.status(400).json({ok: false, message: "Sizning hisobingiz ishlamayapti! Ma'lumotlarni tekshirib ko'ring!"})
            }
            const blog = site.blogs.find(b => b._id.toString() === blogId)
            res.json({ok: true, message: "Blog olindi!", data: blog})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }
}

module.exports = new BlogController()