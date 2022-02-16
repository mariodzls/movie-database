const isLoggedIn = (req, res, next) => {
    if (!req.session || !req.session.currentUser) {
        res.redirect('/iniciar-sesion')
        return
    }
    next();
}

const checkRole = (...admittedRoles) => (req, res, next) => {
    admittedRoles.includes(req.session.currentUser.role) ? next() : res.render('auth/sign-in', {
        errorMessage: `Desautorizado, solo rol ${admittedRoles}`
    })
}

const check = (req, res, next) => {
    console.log(req.params, req.session.currentUser)
    if (["ADMIN"].includes(req.session.currentUser.role) || req.params.id == req.session.currentUser._id) {
        next()
    } else {
        res.render("auth/sign-in", {
            errorMessage: "No tienes permiso"
        })
    }
}

module.exports = {
    isLoggedIn, checkRole, check
}