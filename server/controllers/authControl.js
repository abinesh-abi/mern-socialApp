let bcrypt = require("bcrypt");
const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../config/basicConfig");

module.exports = {
  register: async (req, res) => {
    try {
      let { fullname, username, email, password } = req.body;
      let isUserexists = await userService.getUserByUserEmail(email);
      let isUserNameTaken = await userService.getUserByUserUserName(username);

      // username or email exits
      if (isUserexists)
        return res.json({
          status: false,
          message: "This Email Already taken by other user",
        });
      if (isUserNameTaken)
        return res.json({
          status: false,
          message: "This User Name is Already taken by other user",
        });

      req.body.password = await bcrypt.hash(password, 10);
      let user = await userService.saveUser(req.body);

      const acces_tocken = createAccessToken({
        name: user.fullname,
        id: user._id,
      });
      const refresh_tocken = createRefreshToken({
        name: user.fullname,
        id: user._id,
      });

      res.cookie("refreshtoken", refresh_tocken, {
        httpOnly: true,
        path: "/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      res.json({
        status: true,
        message: "User created",
        acces_tocken,
        user: { ...user._doc, password: "" },
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error });
    }
  },
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      let user = await userService.getUserByUserEmail(email);

      if (!user)
        return res.json({
          status: false,
          message: "You don't have account",
        });

      let passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
        return res.json({ status: false, message: "Incorrect Password" });

      const acces_tocken = createAccessToken({
        name: user.fullname,
        id: user._id,
      });
      const refresh_tocken = createRefreshToken({
        name: user.fullname,
        id: user._id,
      });

      res.cookie("refreshtoken", refresh_tocken, {
        httpOnly: true,
        path: "/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      res.json({
        status: true,
        message: "Login Success",
        acces_tocken,
        user: { ...user._doc, password: "" },
        // refresh_tocken
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/refresh_token" });
      res.json({ status: true, message: "Logged Out" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  generateAccessTocken: async (req, res) => {
    try {
      let refresToken = req.cookies.refreshtoken;
      if (!refresToken)
        return res.json({ status: false, message: "Please Login" });
      jwt.verify(refresToken, REFRESH_TOKEN_SECRET, async (err, result) => {
        if (err)
          return res
            .status(400)
            .json({ status: false, messate: "Please login" });
        let user = await userService.getUserByUserId(result.id);

        if (!user)
          return res.json({ status: true, message: "Tocken not valied" });
        const acces_tocken = createAccessToken({
          name: user.fullname,
          id: user._id,
        });

        res.json({
          status: true,
          acces_tocken,
          user,
        });
      });

      // res.json({refresToken})
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
};
