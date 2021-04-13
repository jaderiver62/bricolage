const router = require("express").Router();
//  Requiring the methods from the user-controller to make them accessible to our routes
const {
    getAllUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    removeFriend,
    addFriend,
} = require("../../controllers/user-controllers.js");

//  For route /api/users/
router.route("/")
    .get(getAllUsers)
    .post(addUser);

//  For route /api/users/:id
router.route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//  For route /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId")
    .delete(removeFriend)
    .post(addFriend);

module.exports = router;