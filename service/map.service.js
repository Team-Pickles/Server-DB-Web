const map = require("../repository/map.repository.js");
const data = require("../utils/getData_utils");

exports.applyMap = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "req.body can not be empty!",
    });
  } else {
    map.createMap(req.body, (err, result) => {
      if (err) {
        res.status(400).send({
          message: "applyMap err",
        });
      } else {
        res.send({
          map_id: result.map_id,
        });
      }
    });
  }
};

exports.getAllMapList = (req, res) => {
  map.findAllMaps((err, results) => {
    if (err) {
      res.status(400).send({
        message: "getAllMapList err",
      });
    } else {
      res.send(results);
    }
  });
};

exports.getMapListByTag = (req, res) => {
  if (!req.params) {
    res.status(400).send({
      message: "req.body can not be empty!",
    });
  } else {
    map.findAllMapsByTag(req.params.map_tag, (err, result) => {
      if (err) {
        res.status(400).send({
          message: "getMapListByTag err",
        });
      } else {
        res.send(result);
      }
    });
  }
};

exports.updateMapInfo = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "req.body can not be empty!",
    });
  } else {
    map.updateMapInfo(req.body.map_id, req.body.forUpdate, (err, result) => {
      if (err) {
        res.status(400).send({
          message: "updateMap err",
        });
      } else {
        res.send({
          map_id: req.body.map_id,
        });
      }
    });
  }
};

exports.deleteMap = async (req, res) => {
  if (!req.params) {
    res.status(400).send({
      message: "req.params can not be empty!",
    });
  } else {
    const forDelete = await data.findMapById(req.params.map_id)
    if (forDelete.ok === false) {
      res.status(400).send({ message: `There is no map(${req.params.map_id})` });
    }
    else if (req.user !== forDelete.map.map_maker) {
      res.status(401).send({
          message: "Unauthorized. Can only delete my map."
      });
    } else {
      map.deleteMap(req.params.map_id, (err, results) => {
        if (err) {
          res.status(400).send({
            message: "deleteMap err",
          });
        } else {
          res.send({
            message: `map(${req.params.map_id}) was successfully deleted`,
          });
        }
      });
    }
  }
};
