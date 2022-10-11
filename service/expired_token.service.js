const TokenManager = require("../utils/tokenManager");

// 토큰 테스트용
exports.expireToken = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "req.body can not be empty!",
        });
    } else {
        const result = TokenManager.expireToken(req.body.accessToken, req.body.refreshToken);
        res.status(result.code).send(result.data);
    }
}

exports.getAllExpiredTokenList = async (req, res) => {
    const result = await TokenManager.getAllExpiredToken();
    res.status(result.code).send(result.data);
}

exports.getExpiredTokenById = async (req, res) => {
    if (!req.params) {
        res.status(400).send({
          message: "req.params can not be empty!",
        });
    } else {
        const result = await TokenManager.getExpiredTokenById(req.params.id);
        res.status(result.code).send(result.data);
    }
}

exports.getExpiredTokenByToken = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "req.body can not be empty!",
        });
    } else {
        const result = await TokenManager.getExpiredTokenByToken(req.body.token);
        res.status(result.code).send(result.data);
    }
}