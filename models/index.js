const Sequelize = require('sequelize');
const dbConfig = require("../config/config");
const Map = require('./map')
const db = {};

// dba, root, admin
// 여기서 DB 연결
const sequelize = new Sequelize(dbConfig.database,dbConfig.username,dbConfig.password,dbConfig);

// db dictionary에 삽입
db.sequelize = sequelize;
db.Map = Map;

Map.init(sequelize);

module.exports = db;
