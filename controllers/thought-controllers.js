const {
    User,
    Thought
} = require('../models');

const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find({})
            .select("-__v")
            .then(thoughtData => {
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getThoughtById({
        params
    }, res) {
        Thought.findOne({
                _id: params.id
            })
            .select("-__v")
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({
                        message: "This ID is not in our database"
                    });
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    addThought({
        params,
        body
    }, res) {
        console.log(body);
        Thought.create(body)
            .then(({
                _id
            }) => {
                return User.findOneAndUpdate({
                    username: body.username
                }, {
                    $push: {
                        thoughts: _id
                    }
                }, {
                    new: true
                });
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({
                        message: "This ID isn't in our database"
                    });
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    addReaction({
        params,
        body
    }, res) {
        Thought.findOneAndUpdate({
                _id: params.thoughtId
            }, {
                $addToSet: {
                    reactions: body
                }
            }, {
                new: true,
                runValidators: true
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({
                        message: "This ID is the in our database"
                    });
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    updateThought({
        params,
        body
    }, res) {
        Thought.findOneAndUpdate({
                _id: params.id
            }, {
                thoughtText: body.thoughtText
            }, {
                new: true,
                runValidators: true
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({
                        message: "That ID is not in our database"
                    });
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },


    removeThought({
        params
    }, res) {
        Thought.findOneAndDelete({
                _id: params.id
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({
                        message: "That ID is not in our database"
                    });
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    removeReaction({
        params
    }, res) {
        Reaction.findOneAndUpdate({
                _id: params.reactionId
            }, {
                $pull: {
                    reactions: {
                        reactionId: params.reactionId
                    }
                }
            }, {
                new: true,
                runValidators: true
            })
            .then(reactionData => res.json(reactionData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};


module.exports = thoughtController;