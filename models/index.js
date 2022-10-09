const Sequelize = require('sequelize');
const dbConfig = require("../config/config");
const Map = require('./map');
const User = require('./user');
const ExpiredToken = require('./expired_token');
const LoginInfo = require('./login_info');
const db = {};

// dba, root, admin
// 여기서 DB 연결
const sequelize = new Sequelize(dbConfig.database,dbConfig.username,dbConfig.password,dbConfig);

// db dictionary에 삽입
db.sequelize = sequelize;
db.Map = Map;
db.User = User;
db.ExpiredToken = ExpiredToken;
db.LoginInfo = LoginInfo;

Map.init(sequelize);
User.init(sequelize);
ExpiredToken.init(sequelize);
LoginInfo.init(sequelize);

Map.associate(db);
User.associate(db);
LoginInfo.associate(db);

module.exports = db;
