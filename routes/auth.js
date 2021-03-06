const { User } = require("../db/models");

const restoreUser = async (req, res, next) => {

    if (req.session.auth) {
      const { userId } = req.session.auth

      try {
        const user = await User.findByPk(userId)

        if (user) {
          res.locals.authenticated = true
          res.locals.user = user;
          next()
        }

      } catch (error) {
        res.locals.authenticated = false
        next(error)
      }

    } else {

      res.locals.authenticated = false
      next()
    }
  }

  const requireAuth = (req, res, next) => {
    if (!res.locals.authenticated) {
      return res.redirect('/users/login');
    }
    return next()
  }

module.exports = { restoreUser, requireAuth }
