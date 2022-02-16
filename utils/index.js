const mongoose = require("mongoose")
const isAdmin = user => user.role === "ADMIN"
// const user = (user, currentUser) => user._id == currentUser._id
const isUser = user => user.role === "USER"
const isMod = user => user.role === "MOD"
module.exports = { isAdmin, isUser, isMod }