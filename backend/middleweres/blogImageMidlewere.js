const multer = require("multer");
const path = require("path");

// Rasmlar saqlanadigan papka
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../blogImages")); // "siteImages" papkasiga saqlanadi
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.random();
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Unikal nom berish
    }
});

// Multer sozlamalari
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 10MB dan katta bo‘lmasligi kerak
});

module.exports = upload