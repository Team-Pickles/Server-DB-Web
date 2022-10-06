const jwt = require("../../utils/jwt_utils");

const authJwt = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    const result = jwt.verify(token);
    if (result.ok) {
      req.user = result.id;
      next();
    } else {
      res.status(401).send({
        ok: false,
        message: result.message,
      });
    }
  } else {
    res.status(401).send({
      ok: false,
      message: "Unathorized",
    });
  }
};

module.exports = authJwt;
