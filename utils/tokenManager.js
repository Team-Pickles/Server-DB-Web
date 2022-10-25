const ExpiredToken = require("../repository/expired_token.repository");
const LoginInfo = require("../repository/login_info.repository");

module.exports = {
    expireToken: async (token) => {
        const result = await ExpiredToken.expireToken(token);
        if(result === undefined) {
            return {
                code: 400,
                data: {message: "expiredToken err"}
            };
        } else {
            return {
                code: 200,
                data: {
                    token_id: result.id,
                }
            };
        }
    },
    expireAllToken: async (accessToken, refreshToken) => {
        const accessResult = await ExpiredToken.expireToken(accessToken);
        if(accessResult === undefined) {
            return {
                code: 400,
                data: {message: "expiredToken err"}
            };
        } else {
            const refreshResult = await ExpiredToken.expireToken(refreshToken);
            if(refreshResult === undefined) {
                return {
                    code: 400,
                    data: {message: "expiredToken err"}
                };
            } else {
                return {
                    code: 200,
                    data: {
                        access_token_id: accessResult.id,
                        refresh_token_id: refreshResult.id
                    }
                };
            }
        }
    },
    getAllExpiredToken: async () => {
        let result;
        const func = async () => {
            const tmp = await ExpiredToken.findAllExpiredToken();
            result = tmp;
        }
        await func();

        if(result !== undefined){
            return {
                code: 400,
                data: {
                    message: "getAllExpiredToken err"
                }
            };
        } else {
            return {
                code: 200,
                data: {result}
            };
        }
    },
    getExpiredTokenById: async (id) => {
        let result;
        const func = async () => {
            const tmp = await ExpiredToken.findExpiredTokenById(id);
            result = tmp;
        };
        await func();

        if(result !== undefined){
            return {
                code: 400,
                data: {
                    message: "getExpiredTokenById err"
                }
            };
        } else {
            return {
                code: 200,
                data: {result}
            };
        }
    },
    getExpiredTokenByToken: async (token) => {
        let result;
        const func = async () => {
            const tmp = await ExpiredToken.findExpiredTokenByToken(token);
            result = tmp;
        };
        await func();

        if(result === undefined){
            return {
                code: 400,
                data: {
                    message: "getExpiredTokenByToken err"
                }
            };
        } else {
            return {
                code: 200,
                data: result
            };
        }
    },
    createLoginInfo: async (id, accessToken, refreshToken) => {
        let result;
        const func = async () => {
            const tmp = await LoginInfo.createInfo(id, accessToken, refreshToken);
            result = tmp;
        };
        await func();

        if(result !== undefined){
            return {
                code: 400,
                data: {
                    message: "createLoginInfo err"
                }
            };
        } else {
            return {
                code: 200,
                data: {
                    ok: true,
                    tokens: [{
                        accessToken,
                        refreshToken,
                    }],
                }
            };
        }
    },
    updateLoginInfo: async (id, updateInfo) => {
        let result;
        const func = async () => {
            const tmp = await LoginInfo.updateLoginInfo(id, updateInfo);
            result = tmp;
        };
        await func();

        if(result === undefined){
            return {
                code: 400,
                data: {
                    message: "updateLoginInfo err"
                }
            };
        } else {
            return {
                code: 200,
                data: result
            };
        }
    },
    getLoginInfoById: async (id) => {
        let result;
        const func = async () => {
          const tmp = await LoginInfo.findLoginInfoById(id);
          result = tmp;
        };
        await func();
        return { ok: result !== undefined, info: result };
    },
    getLoginInfoByAccessToken: async (token) => {
        let result;
        const func = async () => {
            const tmp = await LoginInfo.findLoginInfoByAccessToken(token);
            result = tmp;
        };
        await func();
        return { ok: result !== undefined, info: result };
    },
    getLoginInfoByRefreshToken: async (token) => {
        let result;
        const func = async () => {
          const tmp = await LoginInfo.findLoginInfoByRefreshToken(token);
          result = tmp;
        };
        await func();
        return { ok: result !== undefined, info: result };
    },
    deleteLoginInfoByUserId: async (user_id) => {
        let result;
        const func = async () => {
          const tmp = await LoginInfo.deleteLoginInfoById(user_id);
          result = tmp;
        };
        await func();
        return result;
    },
    deleteLoginInfoByAccessToken: async (accessToken) => {
        let result;
        const func = async () => {
          const tmp = await LoginInfo.deleteLoginInfoByAccessToken(accessToken);
          result = tmp;
        };
        await func();

        return result;
    },
    deleteLoginInfoByRefreshToken: async (refreshToken) => {
        let result;
        const func = async () => {
          const tmp = await LoginInfo.deleteLoginInfoByRefreshToken(refreshToken);
          result = tmp;
        };
        await func();

        return result;
    }
}