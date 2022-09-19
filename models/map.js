const Sequelize = require('sequelize');

module.exports = class Map extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        map_id : {
            type: Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        map_info:{
          type: Sequelize.JSON,
          allowNull:false,
        },
        map_tag:{
          type: Sequelize.STRING(255),
          allowNull:true,
        },
        map_grade:{
          type: Sequelize.INTEGER,
          allowNull:true,
        },
        map_difficulty:{
            type: Sequelize.INTEGER,
            allowNull:true,
        },
        map_maker:{
            type: Sequelize.STRING(255),
            allowNull:true,
        },
    }, {
        sequelize,
        timestamps:true,
        tableName: 'map',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
};