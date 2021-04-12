const { User, Thought } = require('../models');

const thoughtController = {
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({ _id: params.userID }, { $push: { thoughts: _id } }, { new: true });
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with this ID found' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },


    addReaction({ params, body }, res) {
        Reaction.findOneAndUpdate({ _id: params.reactionId }, { $push: { reactions: body } }, { new: true })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user with this ID found' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    removeThought({ params }, res) {
        Reaction.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No id with this thought found' });
                }
                return User.findOneAndUpdate({ _id: params.userId }, { $pull: { thoughts: params.thoughtId } }, { new: true });
            })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No id with this thought found' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.json(err));
    },
    // remove reply
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.reactionId }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true })
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;