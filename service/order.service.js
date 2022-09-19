const order = require("../repository/order.repository.js");

exports.applyOrder = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "req.body can not be empty!"
        });
    } else {
        order.createOrder({
            order_num: req.body.order_num,
            stuff_id: req.body.stuff_id,
        }, (err, result) => {
            if(err) {
                res.status(400).send({
                    message: "applyOrder err"
                });
            } else {
                res.send({
                    order_id: result.order_id
                });
            }
        });
    }
}

exports.getList = (req, res) => {
    //에러 조건 넣기
    if (false) {
        res.status(401).send({
          message: "Unauthorized"
        });
    } else {
        order.findAllOrder( (err, results) => {
            if (err) {
                res.status(400).send({
                    message: "getList err"
                });
            } else {
                res.send(results);
            }
        })
    }
}

exports.deleteOrder = (req, res) => {
    //order.deleteOrder
    if (!req.params) {
        res.status(400).send({
          message: "req.params can not be empty!"
        });
    } else if (!req.user) {
        res.status(401).send({
            message: "Unauthorized"
          });
    } else {
        order.deleteOrder(req.params.order_id, (err, results) => {
            if(err) {
                res.status(400).send({
                    message: "deleteOrder err"
                });
            } else {
                res.send({
                    message: "order was successfully deleted"
                });
            }
        })
    }
}