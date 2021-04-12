const router = require("express").Router();
const {
    addThought,
    removeThought,
    getOneUser,
    deleteUser,
    addReaction,
    removeReaction
} = require("../../controllers/thought-controller");

router.route("/")
    .post(addThought)
    .delete(removeThought)


router.route("/:id")
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

router.route("/:thoughtId/reactions")
    .delete(removeReaction)
    .post(addReaction);

module.exports = router;