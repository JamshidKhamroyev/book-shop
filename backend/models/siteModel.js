const {model, Schema} = require("mongoose")

const bookSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: {type: Date, required: false, default: Date.now()},
    price: {type: Number, required: true},
    eyes: {type: Number, required: false, default: 0},
    category: {type: String, required: true}
})

const commentSchema = new Schema({
    userTitle: {type: String, required: true},
    createdAt: {type: Date, required: false, default: Date.now()},
    text: {type: String, required: true},
    rating: {type: Number, required: true},
})

const blogSchema = new Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: {type: Date, required: false, default: Date.now()},
    eyes: {type: Number, required: false, default: 0},
})

const siteSchema = new Schema({
    block: {type: Boolean, required: false, default: false},
    siteName: {type: String, required: true},
    logo: {type: String, required: true},
    title: {type: String, required: true},
    home_image: {type: String, required: true},
    about_image: {type: String, required: true},
    about_description: {type: String, required: true},
    adminChatId: {type: Number, required: true},
    adminChatToken: {type: String, required: true},
    adminTme: {type: String, required: true},
    adminIns: {type: String, required: true},
    adminEmail: {type: String, required: true},
    adminNumber: {type: String, required: true},
    comunityTme: {type: String, required: true},
    comunityIns: {type: String, required: true},
    comunityYouTube: {type: String, required: true},
    comunityFacebook: {type: String, required: true},
    time: {type: Date, required: false, default: Date.now()},
    system: {type: String, required: false, default: "Standart"},
    books: [bookSchema],
    comments: [commentSchema],
    blogs: [blogSchema]
}, {timestamps: true})

module.exports = model("Site", siteSchema)