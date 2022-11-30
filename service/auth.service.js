const jwt = require("../utils/jwt_utils");
const TokenManager = require("../utils/tokenManager");
const data = require("../utils/getData_utils");

const checkAuthorized = async (token, isRefreshToken) => {
  const verified = jwt.verify(token);
  // 잘못된 token인 경우
  if (verified.ok === false && verified.message !== "jwt expired") {
    return {
      code: 401,
      data: {message: "No authorized!"}
    };
  } else {
    const decoded = jwt.decode(token);
    const result = await TokenManager.getExpiredTokenByToken(token);
    if(result.code == 200 && isRefreshToken) {
      // 이미 파기된 token인 경우(logout 또는 refresh로 인한 파기)
      return {
        code: 400,
        data: {message: "jwt expired"}
      };
    } else {
      // 유효한 토큰인 경우
      return {
        code: 200,
        id: decoded.id
      };
    }
  }
};

const getNewTokenProcess = (decoded, refresh) => {
  if (refresh.ok === false) {
      // refresh 토큰이 유효하지 않은 경우
      return {
        code: 401,
        result: {
          ok: false,
          message: "No authorized!",
        },
      };
    } else {
      const newAccessToken = jwt.sign(decoded.id);
      return {
        code: 200,
        result: {
          ok: true,
          tokens: [{
            accessToken: newAccessToken,
            refreshToken: refresh.token,
          }],
        },
      };
    }
};

exports.login = async (req, res) => {
  const user_id = req.body.user_id;
  const password = req.body.password;

  const result = await data.findUserById(user_id);

  if (result.ok === false) {
    // 등록되지 않은 아이디인 경우
    return res.status(400).send({ message: `Id is incorrect` });
  } else if (result.user.password != password) {
    // 비밀번호 오류
    return res.status(400).send({ message: "Password is incorrect" });
  } else {
    // 아이디, 비밀번호 검증 통과
    // loginInfo를 만들 수 있는 경우 code 200, 오류가 발생하면 code 400
    const accessToken = jwt.sign(result.user.user_id);
    const refreshToken = jwt.refresh(result.user.user_id);

    const tokenResult = await TokenManager.createLoginInfo(user_id, accessToken, refreshToken, result.user.username);
    return res.status(tokenResult.code).send(tokenResult.data);
  }
};

exports.refresh = async (req, res) => {
  if (req.headers.authorization && req.headers.refresh) {
    // 헤더에 authorization과 refresh가 있는 경우
    const accessToken = req.headers.authorization.split("Bearer ")[1];
    const refreshToken = req.headers.refresh;

    const accessAuthorizeResult = await checkAuthorized(accessToken, false);
    if (accessAuthorizeResult.code != 200) {
      // accessToken이 유효하지 않은 경우
      return res.status(accessAuthorizeResult.code).send(accessAuthorizeResult.data);
    }

    const refreshAuthorizeResult = await checkAuthorized(refreshToken, true);
    if (refreshAuthorizeResult.code != 200) {
      // refreshToken이 유효하지 않은 경우
      return res.status(refreshAuthorizeResult.code).send(refreshAuthorizeResult.data);
    } else if(refreshAuthorizeResult.id != accessAuthorizeResult.id) {
      // refreshToken은 유효하지만 각 토큰의 소유자가 다른 경우
      return res.status(400).send({message : "Wrong token"});
    } else {
      const refreshResult = jwt.refreshVerify(refreshToken);

      const processResult = getNewTokenProcess(
        accessAuthorizeResult, refreshResult
      );

      if(processResult.code == 200){
        // 새로운 accessToken 발급 완료
        const updateResult = await TokenManager.updateLoginInfo(accessAuthorizeResult.id,
          {
            access_token: processResult.result.tokens.accessToken
          });

        if (updateResult.code == 200){
          // loginInfo에 새로운 토큰 업데이트 완료
          const result = await TokenManager.expireToken(accessToken);
          if(result.code == 200) {
            // 기존 토큰 파기 성공
            return res.status(result.code).send(processResult.result);
          } else {
            // 기존 토큰 파기 실패
            return res.status(result.code).send(result.data.message);
          }
        } else {
          // loginInfo에 새로운 토큰 업데이트 실패
          return res.status(updateResult.code).send(updateResult.data);
        }
      } else {
        // 새로운 accessToken 발급 실패
        return res.status(processResult.code).send(processResult.result);
      }
    }
  } else {
    // 헤더에 authorization과 refresh가 없는 경우
    return res.status(400).send({
      ok: false,
      message: "Access token and refresh token are need for refresh!",
    });
  }
};

exports.logout = async (req, res) => {
  const login_info = await TokenManager.getLoginInfoById(req.user);
  if(login_info.ok === false) {
    // 로그인 정보가 없는 경우
    return res.status(400).send({message: "Logout failed"});
  } else {
    // 로그인 정보가 있는 경우
    const token = login_info.info;
    const result = await TokenManager.expireAllToken(token.access_token, token.refresh_token);

    if(result.code == 200) {
      // 로그인 정보와 관련된 모든 토큰 파기 성공
      const tokenResult = await TokenManager.deleteLoginInfoByUserId(req.user);
      return res.status(tokenResult.code).send(tokenResult.data);
    } else {
      // 로그인 정보와 관련된 모든 토큰 파기 실패
      return res.status(result.code).send(result.data);
    }
  }
}