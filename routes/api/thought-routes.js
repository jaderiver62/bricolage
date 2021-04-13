const router = require("express").Router();
//  Requiring the methods from the thought-controller to make them accessible to our routes
const {
    addThought,
    getThoughtById,
    getAllThoughts,
    removeThought,
    updateThought,
    addReaction,
    removeReaction
} = require("../../controllers/thought-controllers.js");

// For route /api/thoughts/
router.route("/")
    .post(addThought)
    .get(getAllThoughts)

// For route /api/thoughts/:id
router.route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// For route api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions")
    .delete(removeReaction)
    .post(addReaction);

module.exports = router;