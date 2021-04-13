const router = require("express").Router();
const {
    getAllUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    removeFriend,
    addFriend,
} = require("../../controllers/user-controllers.js");

router.route("/")
    .get(getAllUsers)
    .post(addUser);

router.route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router.route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;