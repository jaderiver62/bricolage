const {
    User
} = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({
                _id: -1
            })
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: "No users are in the database"
                });
            });
    },

    getUserById({
        params
    }, res) {
        User.findOne({
                _id: params.id
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            }, {
                path: "friends",
                select: "-__v -friends",
                options: {
                    lean: true
                }
            })
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(404).json({
                    message: "This ID isn't in our database"
                });
            });
    },

    createUser({
        body
    }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    updateUser({
        params,
        body
    }, res) {
        User.findOneAndUpdate({
                _id: params.id
            }, body, {
                new: true,
                runValidators: true
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({
                        message: "This ID isn't in our database"
                    });
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: "This ID isn't in our database"
                });
            });
    },

    deleteUser({
        params
    }, res) {

        User.findOneAndDelete({
                _id: params.id
            }, function(err, docs) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Deleted: ", docs);
                }
            })
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: "This ID isn't in our database"
                });
            });
    },
    addFriend({
        params
    }, res) {
        User.findOneAndUpdate({
                _id: params.userId
            }, {
                $addToSet: {
                    friends: params.friendId
                }
            }, {
                new: true,
                runValidators: true
            })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({
                        message: "This ID isn't in our database"
                    });
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    removeFriend({
        params
    }, res) {
        User.findOneAndUpdate({
                _id: params.userId
            }, {
                $pull: {
                    friends: params.friendId
                }
            }, {
                new: true,
                runValidators: true
            })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({
                        message: "This ID isn't in our database"
                    });
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};



module.exports = userController;