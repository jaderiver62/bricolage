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
                res.sendStatus(400);
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
            })
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createUser({
        body
    }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
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
                        message: 'No user was found with that id'
                    });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    deleteUser({
        params
    }, res) {
        User.findOneAndDelete({
                _id: params.id
            })
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
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
                        message: "No user found with this ID found"
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
                        message: "No user with this ID is found"
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