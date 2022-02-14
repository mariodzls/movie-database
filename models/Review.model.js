const { Schema, Mongoose } = require("mongoose");

const reviewSchema = new Schema({
    text: { type: String },
    movieId: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
})

const Review = model("Review", reviewSchema)

module.exports = Review