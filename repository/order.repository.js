const model = require("../models");
const { Op } = require("sequelize");
const sequelize = model.sequelize;
const moment = require("moment");

const Order = {}

Order.createOrder = async (order, results) => {
    const date = moment().format("YYYY-MM-DD");
    
    let createdOrder;
    try {
        await sequelize.transaction(async t => {
            createdOrder = await model.Order.create({
                order_num: order.order_num,
                order_cost: order.order_num * 500,
                stuff_id: order.stuff_id,
                order_date: date,
            },{transaction:t});
        });
        
    } catch(err) {
        console.log("createOrder err", err);
        return results(err,null);
    }

    console.log("order is created");
    return results(null, createdOrder);
}

Order.findAllOrder = ( results) => {
    model.Order.findAll({
        raw: true,
        where: {
        },
        attributes:['order_id','order_num','order_cost','order_date'],
    })
    .then(result => {
        console.log("find All Orders");
        return results(null, result);
    })
    .catch(err => {
        console.log("findAllOrders err", err);
        return results(err, null);
    });
}

Order.deleteOrder = async (order_id, branch_id, results) => {
    try{
        await sequelize.transaction(async t => {
            await model.Order.destroy({
                where: {
                    order_id: order_id,
                },
            });
        });
    } catch (err) {
        console.log("deleteOrder err", err);
        return results(err, null);
    }

    console.log("Order is deleted");
    return results(null, "done");
}


module.exports = Order;