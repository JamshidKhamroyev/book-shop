const siteModel = require("../models/siteModel")
const fs = require('fs');
const path = require('path');

class BookController {
    async Create(req, res){
        try {
            const data = req.body
            const saytId = req.saytId
            const site = await siteModel.findById(saytId)
            if(!site || site.block){
                const filePath = path.join(__dirname, '../bookImages', image);
                if(image){
                    if (fs.existsSync(filePath)) {
                        fs.unlink(filePath);
                    }
                }
                return res.status(400).json({ok: false, message: "Sayt mavjud emas!"})
            }
            
            if(site.system === "Standart" && site.books.length > 500){
                return res.status(400).json({ok: false, message: "Sizning tarifingiz bo'yicha joy tugadi!"})
            }

            if(site.system === "Pro" && site.books.length > 1000){
                return res.status(400).json({ok: false, message: "Sizning tarifingiz bo'yicha joy tugadi!"})
            }

            site.books.push(data)
            await site.save()
            res.json({ok: true, message: "Kitob qo'shildi!"})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async Update(req, res){
        try {
            const saytId = req.saytId
            const data = req.body
            const bookId = req.params.bookId

            const site = await siteModel.findById(saytId)
            if(!site || site.block){
                return res.status(400).json({ok: false, message: "Sayt mavjud emas!"})
            }

            const book = site.books.find(book => book._id.toString() === bookId);

            if (!book) {
                return res.status(404).json({ ok: false, message: "Kitob topilmadi!" });
            }

            if (data.title) book.title = data.title;
            if (data.description) book.description = data.description;
            if (data.price) book.price = data.price;
            if (data.category) book.category = data.category;
            await site.save();
            res.json({ ok: true, message: "Kitob yangilandi!", data: book });
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async Delete(req, res){
        try {
            const saytId = req.saytId
            const {bookId} = req.params

            const site = await siteModel.findById(saytId)
            if(!site || site.block){
                return res.status(400).json({ok: false, message: "Sayt mavjud emas!"})
            }

            const initialLength = site.books.length;
            site.books = site.books.filter(book => book._id.toString() !== bookId);

            
            // Agar hech narsa o‘zgarmagan bo‘lsa, kitob topilmagan
            if (site.books.length === initialLength) {
                return res.status(404).json({ ok: false, message: "Kitob topilmadi!" });
            }
    
            await site.save();
            res.json({ok: true, message: "Kitob o'chirib tashlandi!"})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async GetAll(req, res){
        try {
            const saytId = req.saytId
            const site = await siteModel.findById(saytId)
            if(!site || site.block){
                return res.status(400).json({ok: false, message: "Sayt topilmadi!"})
            }
            
            res.json({ok: true, message: "Barcha kitoblar olindi!", data: site.books.reverse()})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async GetOne(req, res){ 
        try {
            const saytId = req.saytId
            const {bookId} = req.params
            const site = await siteModel.findById(saytId)
            if(!site || site.block){
                return res.status(400).json({ok: false, message: "Sayt topilmadi!"})
            }

            const oneBook = site.books.find(book => book._id.toString() === bookId)
            if(!oneBook){
                return res.status(400).json({ok: false, message: "Kitob topilmadi!"})
            }

            res.json({ok: true, message: "Kitob olindi!", data: oneBook})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }

    async AddEyes(req, res){
        try {
            const {bookId} = req.params
            const saytId = req.saytId

            const site = await siteModel.findById(saytId)
            if(!site){
                return res.status(400).json({ok: false, message: "Sayt topilmadi!"})
            }

            const oneBook = site.books.find(book => book._id.toString() === bookId)
            if(!oneBook){
                return res.status(400).json({ok: false, message: "Kitob topilmadi!"})
            }

            oneBook.eyes += 1
            await site.save()
            res.json({ok: true, message: "Yaxshi"})
        } catch (error) {
            res.status(400).json({ok: false, message: error.message})
        }
    }
}

module.exports = new BookController()

