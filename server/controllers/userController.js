const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const config = require("../config/config");

const sendEmailForPassword = async (userName, email, token) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });

    const mailOptions = {
      from: config.emailUser,
      to: email,
      subject: "Reset password",
      html: `<p>Hii ${userName}, Please click here to <a href="http://127.0.0.1:4500/reset-password?token=${token}">Reset</a></p>`,
    };
    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent:- ", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

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

const userLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/login");
  } catch (error) {
    console.log(error.message);
  }
};

const forgetPass = async (req, res) => {
  try {
    res.render("forget-password");
  } catch (error) {
    console.log(error.message);
  }
};

const VerifyForgetPass = async (req, res) => {
  try {
    const email = req.body.email;

    const user = User.findOne({ email: email });

    let message = ""; // définir la variable message à une chaîne vide par défaut

    if (user) {
      const random = randomstring.generate();
      await User.updateOne({ email: email }, { $set: { token: random } });

      sendEmailForPassword(user.name, user.email, random);
      message = "Please check your mail to reset your password";
    } else {
      message = "User email is incorrect !";
    }

    res.render("forget-password", { message: message });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  userLogin,
  verifyLogin,
  profile,
  userLogout,
  forgetPass,
  VerifyForgetPass,
};
