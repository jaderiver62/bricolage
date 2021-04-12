const router = require("express").Router();
const {
    addThought,
    getThoughtById,
    getAllThoughts,
    removeThought,
    updateThought,
    addReaction,
    removeReaction
} = require("C:/Users/jader/bricolage/controllers/thought-controllers.js");

router.route("/")
    .post(addThought)
    .get(getAllThoughts)


router.route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

router.route("/:thoughtId/reactions")
    .delete(removeReaction)
    .post(addReaction);

module.exports = router;