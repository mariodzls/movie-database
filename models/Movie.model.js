const { Schema } = require("mongoose");

const movieSchema = new Schema(
    {
        title: { type: String, required: true },
        year: { type: Number },
        genre: { type: String },
        cast: [String],
        director: [String],
    })

const Movie = model("Movie", movieSchema)

module.exports = Movie