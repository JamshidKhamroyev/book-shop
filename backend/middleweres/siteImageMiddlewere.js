const multer = require("multer");
const path = require("path");
const fs = require("fs");
const siteModel = require("../models/siteModel");

// Rasmlar saqlanadigan papka
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../siteImages")); // "siteImages" papkasiga saqlanadi
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.random();
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Unikal nom berish
    }
});

// Multer sozlamalari
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB dan katta bo‘lmasligi kerak
});

// Rasmlarni tekshirib, eski rasmni o‘chiradigan middleware
const uploadMiddleware = async (req, res, next) => {
    upload.fields([
        { name: "logo", maxCount: 1 },
        { name: "about_image", maxCount: 1 },
        { name: "home_image", maxCount: 1 }
    ])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "Fayl yuklashda xatolik!", error: err.message });
        }

        try {
            const saytId = req.params.saytId;
            const site = await siteModel.findById(saytId);
            if (!site) return next();

            const images = ["logo", "about_image", "home_image"];
            images.forEach(field => {
                if (req.files[field]) {
                    // Eski rasmni o‘chiramiz
                    if (site[field]) {
                        const oldFilePath = path.join(__dirname, "../siteImages", site[field]);
                        if (fs.existsSync(oldFilePath)) {
                            fs.unlinkSync(oldFilePath);
                        }
                    }
                }
            });
            next();
        } catch (error) {
            console.error("Eski faylni o‘chirishda xatolik:", error);
            next();
        }
    });
};

module.exports = { uploadMiddleware };
