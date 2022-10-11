const Sequelize = require("sequelize");

module.exports = class LoginInfo extends Sequelize.Model {
    static init(sequelize) {
      return super.init(
        {
          id: {
            type: Sequelize.STRING(255),
            primaryKey: true,
          },
          access_token: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          refresh_token: {
            type: Sequelize.STRING(255),
            allowNull: false,
          }
        },
        {
          sequelize,
          timestamps: true,
          tableName: "login_info",
          paranoid: false, // 삭제일 (복구용)
          charset: "utf8",
          collate: "utf8_general_ci", // 삭제일 (복구용)
        }
      );
    }
    static associate(db) {
      db.LoginInfo.belongsTo(db.User, { foreignKey: 'id', targetKey: "user_id" });
    }
  };