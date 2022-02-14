const res = require("express/lib/response")
const bcryptjs = require('bcryptjs')
const { isLoggedIn } = require('./../middleware/route-guard')
const router = require("express").Router()

router.get("/perfil", (req, res, next) => {

    console.log(req.session.currentUser)
    res.render("../views/profile/profile", {user: req.session.currentUser})
})

module.exports = router