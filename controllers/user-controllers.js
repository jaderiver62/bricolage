//  The user-controller provides methods to be used by the API routes for the User Model - user-routes.js

const {
    User,
    Thought
} = require('../models');

const userController = {
    //  Get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: "No users are in the database"
                });
            });
    },
    // Get one user by ID as the parameter
    getUserById({
        params
    }, res) {
        User.findOne({
                _id: params.id
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
            })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({
                        message: "This ID isn't in our database'"
                    });
                }
                Thought.deleteMany({
                        username: userData.username
                    })
                    .then(result => console.log(`Deleted ${result.deletedCount} item(s).`))
                    .catch(err => console.error(`Delete failed with error: ${err}`));

                res.json("User and all associated thoughts have been deleted.");
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
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