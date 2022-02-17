const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
    text: { type: String, required: true },
    movieId: String,
    userId: String,
    username: String,
    movieId: String,
    rating: Number
})

const Review = model("Review", reviewSchema)

module.exports = Review