const express = require("express")
const mongoose = require("mongoose")
const cron = require("node-cron");
const cors = require("cors")
require("dotenv").config()
const siteRouter = require("./routers/siteRouter")
const bookRouter = require("./routers/bookRouter")
const blogRouter = require("./routers/blogRouter")
const comentRouter = require("./routers/comentRouter")
const Site = require("./models/siteModel")
const rateLimit = require("express-rate-limit")


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// So'rov tezligini cheklash (Rate Limiting)
const limiter = rateLimit({
    windowMs: 1 * 1000, // 15 daqiqa
    max: 80, // Har bir IP uchun maksimal 100 ta so'rov
    message: "Nosozlik yuz berdi! Iltimos keyinroq urinib ko'ring!"
});

// CRON job: Har kuni 00:00 da ishlaydi
cron.schedule("0 0 * * *", async () => {
    console.log("CRON ishga tushdi:", new Date().toLocaleString());
    try {
        const outdatedSites = await Site.find({block: false}); // Barcha saytlarni olib kelamiz
        const now = new Date();

        for (const site of outdatedSites) {
            if (site.time < now) { // Agar `time` hozirgi vaqtdan o‘tgan bo‘lsa
                site.block = true;
                await site.save(); // O‘zgarishlarni saqlaymiz
            }
        }
        console.log(`${outdatedSites.length} ta sayt bloklandi.`);
    } catch (err) {
        console.error("Xatolik yuz berdi:", err);
    }
});

app.use(limiter)

// Routers
app.use("/api/site", siteRouter)
app.use("/api/blog", blogRouter)
app.use("/api/coment", comentRouter)
app.use("/api/book", bookRouter)

app.use("/site-image" , express.static("./siteImages"))
app.use("/blog-image", express.static("./blogImages"))

const startApp = async () => {
    const port = process.env.PORT
    try {
        app.listen(port, () => console.log(`Server running on localhost:${port}`))
        await mongoose.connect(process.env.MONGO_URL).then(() => console.log("Data Base connected succesfully")).catch(err => console.log(err))
    } catch (error) {
        return error.message
    }
}

startApp()