const model = require("../models");
const { Op, Model } = require("sequelize");
const sequelize = model.sequelize;

const User = {};

User.createUser = async (user, resultFunc) => {
  let createUser;
  try {
    await sequelize.transaction(async (trans) => {
      createUser = await model.User.create(
        {
          user_id: user.user_id,
          username: user.username,
          password: user.password,
          email: user.email,
        },
        { transaction: trans }
      );
    });
  } catch (err) {
    console.log("createUser err", err);
    return resultFunc(err, null);
  }
  console.log("User is created.");
  return resultFunc(null, createUser);
};

User.findAllUsers = (resultFunc) => {
  model.User.findAll({
    raw: true,
    where: {},
    attributes: ["user_id", "username", "password", "email"]
  })
    .then((result) => {
      console.log("Find All Users");
      return resultFunc(null, result);
    })
    .catch((err) => {
      console.log("FindAllUsers err", err);
      return resultFunc(err, null);
    });
};

User.findUserById = (user_id, resultFunc) => {
    model.User.findOne({
        raw: true,
        where: {user_id: user_id},
        attributes: ["user_id", "username", "password", "email"]
    }).then((result) => {
        console.log(`Find User By Id(${user_id})`);
        return resultFunc(null, result);
    }).catch((err) => {
        console.log("findUserById err", err);
        return resultFunc(err, null);
    });
}

User.updateUsername = async (user_id, username, resultFunc) => {
    try{
        await sequelize.transaction(async trans => {
            await model.User.update(
                {username: username},
                {
                    where: {user_id: user_id},
                    transaction: trans
                }
            );
        });
    }catch(err){
        console.log("updateUsername err", err);
        return resultFunc(err, null);
    }
    console.log("updateUsername done");
    return resultFunc(null, "done");
}

User.deleteUser = async (user_id, resultFunc) => {
    try {
        await sequelize.transaction(async trans => {
            await model.User.destroy({
                where: {user_id: user_id}
            });
        });
    } catch(err) {
        console.log("deleteUser err", err);
        return resultFunc(err, null);
    }

    console.log(`User(${user_id}) is deleted.`);
    return resultFunc(null, "done");
}

User.findUserByIdForGetData = async (user_id) => {
  const result = await model.User.findOne({raw: true,
    where: {user_id: user_id},
    attributes: ["user_id", "username", "password", "email"]});
  if(result === null) {
      console.log("not found");
  } else {
      return result;
  }
}

module.exports = User;