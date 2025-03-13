module.exports =(req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ ok: false, message: "Authorization talab qilinadi!" });
    }

    // `Basic ` dan keyin kelgan qismni olish
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
    const [username, password] = credentials.split(":");

    if (!username || !password) {
        return res.status(401).json({ ok: false, message: "Foydalanuvchi yoki parol noto‘g‘ri!" });
    }

    // **🔍 BU YERDA BAZADAN FOYDALANUVCHINI TEKSHIRISH KERAK**
    if (username !== "Jamshid0811@#!@#!@#!" || password !== "12345slug_342342-34234+423423jfkjs92") {
        return res.status(403).json({ ok: false, message: "Noto‘g‘ri login yoki parol!" });
    }else{
        next();
    }
}