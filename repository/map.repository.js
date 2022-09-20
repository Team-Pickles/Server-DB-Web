const model = require("../models");
const { Op } = require("sequelize");
const sequelize = model.sequelize;

const Map = {}

Map.createMap = async (map, resultFunc) => {
    let createdMap;
    try {
        await sequelize.transaction(async trans => {
            createdMap = await model.Map.create({
                map_info: map.map_info,
                map_tag: map.map_tag != null ? map.map_tag : "none",
                map_grade: map.map_grade != null ? map.map_grade : 0,
                map_difficulty: map.map_difficulty != null ? map.map_grade : 0,
                map_maker: map.map_maker != null ? map.map_maker : "unknown"
            }, {transaction: trans});
        })
    } catch(err) {
        console.log("createMap err", err);
        return resultFunc(err, null);
    }
    console.log("Map is created.");
    return resultFunc(err, createdMap);
}

Map.findAllMaps = (resultFunc) => {
    model.Map.findAll({
        raw: true,
        where: {},
        attributes: ['map_id', 'map_info', 'map_tag', 'map_grade', 'map_difficulty', 'map_maker']
    }).then((result) => {
        console.log("Find All Maps");
        return resultFunc(null, result);
    }).catch((err) => {
        console.log("findAllMaps err", err);
        return results(err, null);
    });
}

Map.findAllMapsByTag = (map_tag, resultFunc) => {
    model.Map.findAll({
        raw: true,
        where: {map_tag: map_tag},
        attributes: ['map_id', 'map_info', 'map_tag', 'map_grade', 'map_difficulty', 'map_maker']
    }).then((result) => {
        console.log(`Find all maps with map_tag(${map_tag}).`);
        return resultFunc(null, result);
    }).catch((err) => {
        console.log("findAllMapsByTag err", err);
        return results(err, null);
    });
}

Map.updateMapInfo = async (forUpdate, resultFunc) => {
    try {
        await sequelize.transaction(async trans => {
            await model.Map.update(
                forUpdate,
                {}
            )
        })
    } catch(err) {

    }
}

Map.deleteMap = async (map_id, resultFunc) => {
    try {
        await sequelize.transaction(async trans => {
            await model.Map.destroy({
                where: {map_id: map_id}
            });
        });
    } catch(err) {
        console.log("deleteMap err", err);
        return resultFunc(err, null);
    }

    console.log(`Map(${map_id}) is deleted.`);
    return resultFunc(null, "done");
}

module.exports = Map;