const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ ok: false, message: "Token talab qilinadi!" });
        }
    
        // `Bearer ` dan keyin kelgan qismni olish
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // 🔑 Tokenni tekshirish
            req.saytId = decoded.saytId;
            next();
        } catch (error) {
            return res.status(403).json({ ok: false, message: "Noto‘g‘ri sorov!" });
        }
}