//  The thoughtController provides methods to be used by the API routes for the Thought Model - thought-routes.js

const {
    User,
    Thought
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
            .then(({
                _id
            }) => {
                return User.findOneAndUpdate({
                    username: body.username
                }, {
                    $addToSet: {
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
    //  Delete a reaction by it'd ID
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

// Export the thoughtController
module.exports = thoughtController;