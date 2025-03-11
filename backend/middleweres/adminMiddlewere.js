module.exports = (req, res, next) => {
    try {
        const {userID} = req.params    
        const [name, password, text] = userID.split("-")
        if(name === "admin213" || password === "423423567618" || text === "sdniewlask"){
            next()
        }else{
            return res.status(400).json({ok: false, message: "Sizga adminlik huquqi berilmagan!"})
        }
    } catch (error) {
        return error.message
    }
}