const jwt = require("../utils/jwt_utils");
const data = require("../utils/getData_utils");

const checkAuthorized = (token) => {
  const decoded = jwt.decode(token);
  if (decoded == null) {
    return {
      ok: false,
      message: "No authorized!",
    };
  }
  return { ok: true, id: decoded.id };
};

const getNewTokenProcess = (decoded, access, refresh) => {
  if (!access.ok && access.message === "jwt expired") {
    if (!refresh.ok)
      return {
        code: 401,
        result: {
          ok: false,
          message: "No authorized!",
        },
      };
    else {
      const newAccessToken = jwt.sign(decoded.id);
      return {
        code: 200,
        result: {
          ok: true,
          data: {
            accessToken: newAccessToken,
            refreshToken: refresh.token,
          },
        },
      };
    }
  } else
    return {
      code: 400,
      result: {
        ok: false,
        message: "Acess token is not expired!",
      },
    };
};

exports.login = async (req, res) => {
  const id = req.body.id;
  const password = req.body.password;

  const result = await data.findUserById(id);
  if (result.ok === false) {
    res.status(400).send({ message: `Id is incorrect` });
  } else if (result.user.password != password) {
    res.status(400).send({ message: "Password is incorrect" });
  } else {
    const accessToken = jwt.sign(result.user.user_id);
    const refreshToken = jwt.refresh(result.user.user_id);

    res.status(200).send({
      ok: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  }
};

exports.refresh = async (req, res) => {
  if (req.headers.authorization && req.headers.refresh) {
    const accessToken = req.headers.authorization.split("Bearer ")[1];
    const refreshToken = req.headers.refresh;

    const accessAuthorizeResult = checkAuthorized(accessToken);
    if (!accessAuthorizeResult.ok) {
      res.status(401).send(accessAuthorizeResult);
    }

    const refreshAuthorizeResult = checkAuthorized(refreshToken);
    if (!refreshAuthorizeResult.ok) {
      res.status(401).send(refreshAuthorizeResult);
    } else if(refreshAuthorizeResult.id != accessAuthorizeResult.id) {
      res.status(400).send({message : "Wrong token"});
    } else {
      const accessResult = jwt.verify(accessToken);
      const refreshResult = jwt.refreshVerify(refreshToken);

      const processResult = getNewTokenProcess(
        accessAuthorizeResult,
        accessResult,
        refreshResult
      );
      res.status(processResult.code).send(processResult.result);
    }
  } else {
    res.status(400).send({
      ok: false,
      message: "Access token and refresh token are need for refresh!",
    });
  }
};
