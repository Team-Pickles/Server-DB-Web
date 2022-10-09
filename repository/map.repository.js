const model = require("../models");
const sequelize = model.sequelize;

const Map = {};

Map.createMap = async (map, resultFunc) => {
    let createdMap;
    let map_maker = map.map_maker;
    try {
        await sequelize.transaction(async trans => {
            createdMap = await model.Map.create({
                map_info: map.map_info,
                map_tag: map.map_tag != null ? map.map_tag : "none",
                map_grade: map.map_grade != null ? map.map_grade : 0,
                map_difficulty: map.map_difficulty != null ? map.map_grade : 0,
                map_maker: map_maker
            }, {transaction: trans});
        })
    } catch(err) {
        console.log("createMap err", err);
        return resultFunc(err, null);
    }
    console.log("Map is created.");
    return resultFunc(null, createdMap);
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
        return resultFunc(err, null);
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
        return resultFunc(err, null);
    });
}

Map.updateMapInfo = async (map_id, forUpdate, resultFunc) => {
    try {
        await sequelize.transaction(async trans => {
            await model.Map.update(
                forUpdate,
                {
                    where: {map_id: map_id},
                    transaction: trans
                }
            );
        })
    } catch(err) {
        console.log("updateMapInfo err", err);
        return resultFunc(err, null);
    }
    console.log("updateMapInfo done");
    return resultFunc(null, "done");
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

Map.findMapByIdForGetData = async (map_id) => {
    const result = await model.Map.findOne({raw: true,
        where: {map_id: map_id},
        attributes: ['map_id', 'map_info', 'map_tag', 'map_grade', 'map_difficulty', 'map_maker']});
    if(result === null) {
        console.log("not found");
    } else {
        return result;
    }
}

module.exports = Map;