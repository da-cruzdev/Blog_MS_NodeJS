const isLogin = async (req, res, next) => {
  try {
    if (req.session.user_id && req.session.isAdmin == 1) {
    } else {
      res.redirect("/login");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

const isLogout = async (req, res, next) => {
  try {
    if (req.session.user_id && req.session.isAdmin == 1) {
      res.redirect("/dashboard");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isLogin, isLogout };
