const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const userLogin = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error);
  }
};

const verifyLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = await User.findOne({ email: email });

    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (passwordMatch) {
        req.session.user_id = userData._id;
        req.session.isAdmin = userData.isAdmin;
        if (userData.isAdmin == 1) {
          res.redirect("/dashboard");
        } else {
          res.redirect("/profile");
        }
      } else {
        res.render("login", { message: "Email and Password is incorrect" });
      }
    } else {
      res.render("login", { message: "Email and Password is incorrect" });
    }
  } catch (error) {}
};

const profile = async (req, res) => {
  try {
    res.send("here is my profile");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userLogin,
  verifyLogin,
  profile,
};
