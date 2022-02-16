const { Schema } = require("mongoose");

const listSchema = new Schema({
    movieIds: [String],
    userId: String
})

const List = model("List", listSchema)

module.exports = List