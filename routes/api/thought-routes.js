const router = require("express").Router();
//  require
const {
    addThought,
    getThoughtById,
    getAllThoughts,
    removeThought,
    updateThought,
    addReaction,
    removeReaction
} = require("../../controllers/thought-controllers.js");

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