const Sequelize = require('sequelize');
const dbConfig = require("../config/config");
const Order = require('./order');
const Map = require('./map')
const db = {};

// dba, root, admin
const sequelize = new Sequelize(dbConfig.database,dbConfig.username,dbConfig.password,dbConfig);

// db dictionary에 삽입
db.sequelize = sequelize;
db.Order = Order;
db.Map = Map;

Order.init(sequelize);
Map.init(sequelize);

module.exports = db;
