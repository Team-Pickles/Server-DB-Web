const model = require("../models");
const { Op } = require("sequelize");
const sequelize = model.sequelize;

const LoginInfo = {};

LoginInfo.createInfo = async (id, accessToken, refreshToken) => {
    let loginToken;
    try {
        loginToken = await sequelize.transaction(async trans => {
            await model.LoginInfo.create({
                id: id,
                access_token: accessToken,
                refresh_token: refreshToken
            }, {transaction: trans});
        })
    } catch (err) {
        console.log("createInfo err", err);
    }
    console.log(loginToken);
    console.log("createInfo success");
    return loginToken;
}

LoginInfo.findAllLoginInfo = (resultFunc) => {
    model.LoginInfo.findAll({
        raw: true,
        where: {},
        attributes: ['id', 'access_token', 'refresh_token']
    }).then((result) => {
        console.log("Find All LoginInfo");
        return resultFunc(null, result);
    }).catch((err) => {
        console.log("findAllLoginInfo err", err);
        return resultFunc(err, null);
    });
}

LoginInfo.findLoginInfoById = async (id) => {
    const result = await model.LoginInfo.findOne({raw: true,
        where: {id: id},
        attributes: ['id', 'access_token', 'refresh_token']});
    if(result === null) {
        console.log("not found");
    } else {
        return result;
    }
}

LoginInfo.findLoginInfoByAccessToken = async (accessToken) => {
    const result = await model.LoginInfo.findOne({raw: true,
        where: {access_token: accessToken},
        attributes: ['id', 'access_token', 'refresh_token']});
    if(result === null) {
        console.log("not found");
    } else {
        return result;
    }
}

LoginInfo.findLoginInfoByRefreshToken = async (refreshToken) => {
    const result = await model.LoginInfo.findOne({raw: true,
        where: {refresh_token: refreshToken},
        attributes: ['id', 'access_token', 'refresh_token']});
    if(result === null) {
        console.log("not found");
    } else {
        return result;
    }
}

LoginInfo.updateLoginInfo = async (id, updateInfo) => {
    try {
        await sequelize.transaction(async trans => {
            await model.LoginInfo.update(
                updateInfo,
                {
                    where: {id: id},
                    transaction: trans
                }
            );
        });
    } catch(err) {
        console.log("updateLoginInfo err", err);
    }

    console.log(`LoginInfo(${id}) is updated.`);
    return {id: id};
}

LoginInfo.deleteLoginInfoById = async (id) => {
    try {
        await sequelize.transaction(async trans => {
            await model.LoginInfo.destroy({
                where: {id: id}
            }, {transaction: trans});
        });
    } catch(err) {
        console.log("deleteLoginInfoById err", err);
        return {
            code: 400,
            data: { message : "deleteLoginInfoById err" }
        };
    }

    console.log(`LoginInfo(${id}) is deleted.`);
    return {
        code: 200,
        data: { message : `LoginInfo(${id}) is deleted.` }
    };
}

LoginInfo.deleteLoginInfoByAccessToken = async (accessToken) => {
    try {
        await sequelize.transaction(async trans => {
            await model.LoginInfo.destroy({
                where: {access_token: accessToken}
            }, {transaction: trans});
        });
    } catch(err) {
        console.log("deleteLoginInfoByAccessToken err", err);
        return {
            code: 400,
            data: { message : "deleteLoginInfoByAccessToken err" }
        };
    }

    console.log(`LoginInfo is deleted.`);
    return {
        code: 200,
        data: { message : "deleteLoginInfoByAccessToken done" }
    };
}

LoginInfo.deleteLoginInfoByRefreshToken = async (refreshToken) => {
    try {
        await sequelize.transaction(async trans => {
            await model.LoginInfo.destroy({
                where: {refresh_token: refreshToken}
            }, {transaction: trans});
        });
    } catch(err) {
        console.log("deleteLoginInfoByRefreshToken err", err);
        return {
            code: 400,
            data: { message : "deleteLoginInfoByRefreshToken err" }
        };
    }

    console.log(`LoginInfo is deleted.`);
    return {
        code: 200,
        data: { message : "deleteLoginInfoByRefreshToken done" }
    };
}

module.exports = LoginInfo;