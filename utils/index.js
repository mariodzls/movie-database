const mongoose = require("mongoose")
const isAdmin = user => user.role === "ADMIN"
const isUser = user => user.role === "USER"
const isMod = user => user.role === "MOD"
module.exports = { isAdmin, isUser, isMod }