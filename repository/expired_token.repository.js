const model = require("../models");
const { Op } = require("sequelize");
const sequelize = model.sequelize;

const ExpiredToken = {};

ExpiredToken.expireToken = async (token) => {
    let expiredToken;
    try {
        await sequelize.transaction(async trans => {
            expiredToken = await model.ExpiredToken.create({
                token: token,
            }, {transaction: trans});
        })
    } catch (err) {
        console.log("ExpireToken err", err);
    }
    console.log("Token is expired.");
    return expiredToken;
}

ExpiredToken.findAllExpiredToken = async () => {
    let tokens = await model.ExpiredToken.findAll({
        raw: true,
        where: {},
        attributes: ['id', 'token']
    });
    if (tokens.length < 1) {
        console.log("not found");
    } else {
        return tokens;
    }
}

ExpiredToken.findExpiredTokenById = async (id) => {
    const result = await model.ExpiredToken.findOne({raw: true,
        where: {id: id},
        attributes: ['id', 'token']});
    if(result === null) {
        console.log("not found");
    } else {
        return result;
    }
}

ExpiredToken.findExpiredTokenByToken = async (token) => {
    const result = await model.ExpiredToken.findOne({raw: true,
        where: {token: token},
        attributes: ['id', 'token']});
    if(result === null) {
        console.log("not found");
    } else {
        return result;
    }
}

ExpiredToken.deleteExpiredToken = async (id, resultFunc) => {
    try {
        await sequelize.transaction(async trans => {
            await model.ExpiredToken.destroy({
                where: {id: id}
            }, {transaction: trans});
        });
    } catch(err) {
        console.log("deleteExpiredToken err", err);
        return resultFunc(err, null);
    }

    console.log(`ExpiredToken(${id}) is deleted.`);
    return resultFunc(null, "done");
}

module.exports = ExpiredToken;