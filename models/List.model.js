const { Schema } = require("mongoose");

const listSchema = new Schema({
    movieIds: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

const List = model("List", listSchema)

module.exports = List