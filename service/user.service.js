const user = require("../repository/user.repository");

exports.applyUser = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "req.body can not be empty!"
        });
    } else {
        user.createUser(req.body, (err, result) => {
            if(err){
                res.status(400).send({
                    message: "applyUser err"
                });
            } else {
                res.send({
                    user_id: result.user_id
                });
            }
        });
    }
}

exports.getAllUserList = (req, res) => {
    user.findAllUsers((err, results) => {
        if(err){
            res.status(400).send({
                message: "getAllUserList err"
            });
        } else {
            res.send(results);
        }
    })
}

exports.getUserById = (req, res) => {
    if(!req.params){
        res.status(400).send({
            message: "req.body can not be empty!"
        });
    } else {
        user.findUserById(req.params.user_id, (err, result) => {
            if(err) {
                res.status(400).send({
                    message: "getUserById err"
                });
            } else {
                res.send(result);
            }
        });
    }
}

exports.updateUsername = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "req.body can not be empty!"
        });
    } else {
        user.updateUsername(req.body.user_id, req.body.username, (err, result) => {
            if(err) {
                res.status(400).send({
                    message: "updateUsername err"
                });
            } else {
                res.send({
                    user_id: req.body.user_id
                });
            }
        });
    }
}

exports.deleteUser = (req, res) => {
    if (!req.params) {
        res.status(400).send({
            message: "req.params can not be empty!"
        });
    }
    // else if (!req.user) {
    //     res.status(401).send({
    //         message: "Unauthorized"
    //     });
    // }
    else {
        user.deleteUser(req.params.user_id, (err, results) => {
            if(err) {
                res.status(400).send({
                    message: "deleteUser err"
                });
            } else {
                res.send({
                    message: `User(${req.params.user_id}) was successfully deleted`
                });
            }
        })
    }
}