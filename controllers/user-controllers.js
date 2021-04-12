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
                new: true
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
    }
};

module.exports = userController;