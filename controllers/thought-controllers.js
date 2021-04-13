//  The thoughtController provides methods to be used by the API routes for the Thought Model - thought-routes.js

const {
    User,
    Thought,
} = require('../models');

const thoughtController = {
    //  Get all thoughts in database
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
    //  Get a single thought with the ID as a parameter
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
    //  Add a new thought to the database, and add it to the thoughts array for it's associated user
    //  For this, the user is located by username
    //  Expects: { "thoughtText": "Deep thoughts... by you", "username": "yourNameHere" }
    addThought({
        body
    }, res) {
        console.log(body);
        Thought.create(body)
            .then(thoughtData => {
                return User.findOneAndUpdate({
                    username: body.username
                }, {
                    $push: {
                        thoughts: thoughtData._id
                    }
                }, {
                    new: true,
                    runValidators: true
                })
            })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json();
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //  Create a new reaction and add it to the reaction's array in the associated thought
    //  Expects: {"reactionBody": "Fascinating quip... ","username": "someUser"}
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
    //  Update the text of a thought using it's ID
    //  Expects: { "thoughtText": "Even deeper thoughts!",  "username": "jackHandy" }
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
    //  Delete a thought using the ID
    //  Remove from the User's thought array
    removeThought({
        params
    }, res) {
        Thought.findOneAndDelete({
                _id: params.id
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({
                        message: "No thought found with this id"
                    });
                }
                return User.findOneAndUpdate({
                    username: thoughtData.username
                }, {
                    $pull: {
                        thoughts: params.id
                    }
                }, {
                    new: true,
                })
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({
                        message: "No user found with this username"
                    });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //  Delete a reaction by it's ID
    removeReaction({
        params
    }, res) {
        Thought.findOneAndUpdate({
                _id: params.thoughtId
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
            .then(thoughtData => {
                if (!thoughtData) {
                    return res.status(404).json({
                        message: "This ID is not in the database"
                    });
                }
                res.json({
                    message: "Reaction was Deleted"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};


// Export the thoughtController
module.exports = thoughtController;