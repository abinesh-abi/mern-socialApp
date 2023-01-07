const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../../config/basicConfig');

let admin = {
    name:'admin',
    email:'abi@gmail.com',
    password:'$2b$10$aEqDpjFf.hLjOg0enxshC.mXDNGiCfNRfMW5d8PTmH4S9izLdVCBq',
    avatar:"avatar"
}

module.exports ={
  login: async (req, res) => {
    try {
      let { email, password } = req.body;

      if (admin.email !== email)
        return res.json({
          status: false,
          message: "You don't have account",
        });

      let passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch)
        return res.json({ status: false, message: "Incorrect Password" });

      const acces_tocken = createAccessToken({
        name: admin.name,
        email:admin.email
      });
      const refresh_tocken = createRefreshToken({
        name: admin.name,
        email:admin.email
      });

      res.cookie("adminLogin", refresh_tocken, {
        httpOnly: true,
        path: "/admin/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      res.json({
        status: true,
        message: "Login Success",
        acces_tocken,
        admin: {admin:admin.name,email:admin.email},
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  generateAdminAccessTocken: async (req, res) => {
    try {
      let refresToken = req.cookies.adminLogin
      if (!refresToken)
        return res.json({ status: false, message: "Please Login" });
      jwt.verify(refresToken, REFRESH_TOKEN_SECRET, async (err, result) => {
        if (err)
          return res
            .status(400)
            .json({ status: false, messate: "Please login" });


        let adminExits = result.email === admin.email


        if (!adminExits)
          return res.json({ status: true, message: "Tocken not valied" });
        const acces_tocken = createAccessToken({
          name: admin.name,
          email:admin.email
        });

        res.json({
          status: true,
          acces_tocken,
          admin: {admin:admin.name,email:admin.email},
        });
      });

      // res.json({refresToken})
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  admnLogout: async (req, res) => {
    try {
      res.clearCookie("adminLogin", { path: "/admin/refresh_token" });
      res.json({ status: true, message: "Logged Out" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
}
const createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
};