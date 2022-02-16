const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
    text: { type: String },
    movieId: String,
    userId: String,
    movieId: String,
    rating: Number
})

const Review = model("Review", reviewSchema)

module.exports = Review