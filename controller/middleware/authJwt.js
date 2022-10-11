const jwt = require("../../utils/jwt_utils");
const TokenManager = require("../../utils/tokenManager");

const authJwt = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    const result = jwt.verify(token);
    const dbResult = await TokenManager.getExpiredTokenByToken(token);
    if (result.ok) {
      if(dbResult.code === 400) {
        req.user = result.id;
        next();
      } else {
        res.status(401).send({
          ok: false,
          message: `Unathorized. Not Found. ${result.id}`,
        });
      }
    } else {
      if(dbResult.code === 400){
        res.status(401).send({
          ok: false,
          message: result.message,
        });
      } else {
        res.status(401).send({
          ok: false,
          message: "Unathorized. Already logout.",
        });
      }
    }
  } else {
    res.status(401).send({
      ok: false,
      message: "Unathorized",
    });
  }
};

module.exports = authJwt;
