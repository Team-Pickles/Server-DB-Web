const Sequelize = require("sequelize");

module.exports = class ExpiredToken extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        token: {
          type: Sequelize.STRING(255),
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: true,
        tableName: "expired_token",
        paranoid: false, // 삭제일 (복구용)
        charset: "utf8",
        collate: "utf8_general_ci", // 삭제일 (복구용)
      }
    );
  }
};