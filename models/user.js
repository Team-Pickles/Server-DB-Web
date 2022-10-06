const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: Sequelize.STRING(255),
          primaryKey: true,
        },
        username: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(255),
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
      },
      {
        sequelize,
        timestamps: true,
        tableName: "user",
        paranoid: false, // 삭제일 (복구용)
        charset: "utf8",
        collate: "utf8_general_ci", // 삭제일 (복구용)
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Map, { foreignKey: {name: "map_maker", allowNull: true}, sourceKey: "user_id" });
  }
};
