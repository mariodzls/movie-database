const { Schema } = require("mongoose");



const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: String,
    profileImg: { type: String, default: 'https://i.stack.imgur.com/l60Hf.png' },
    description: { type: String, default: 'No existe descripción.' },
    // add roles setup here
    role: {
      type: String,
      enum: ["USER", "ADMIN", "MOD"],
      default: 'USER'
    },
    isPM: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  })

const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    year: { type: Number },
    genre: { type: String },
    cast: [Schema.Types.ObjectId],
    director: [Schema.Types.ObjectId],
  })

const reviewSchema = new Schema({
  text: { type: String },
  movieId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId
})

const listSchema = new Schema({
  movieIds: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId
})



const User = model("User", userSchema)
const Movie = model("Movie", movieSchema)
const Review = model("Review", reviewSchema)
const List = model("List", listSchema)

module.exports = User, Movie, Review, List