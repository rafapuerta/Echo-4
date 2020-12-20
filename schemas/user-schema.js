const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    _id: String,
    steamID: String
})

module.exports = mongoose.model("users", userSchema)