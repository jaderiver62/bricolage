const router = require("express").Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    removeFriend,
    addFriend,
} = require("C:/Users/jader/bricolage/controllers/user-controllers.js");

router.route("/")
    .get(getAllUsers)
    .post(createUser);

router.route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router.route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;