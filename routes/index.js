//  Sets the routes up
const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

//  When a route is not found...
router.use((req, res) => res.status(404).send("<div style='text-align:center;'><div style='color: green; font-weight: bold;'><h1><br/>404 Error...</h1></br><span style='font-size:100px; '>&#127921;</span><br/><h4>This page isn't doing anything today.</h4></div></div>"));

// Exports the routes to the server
module.exports = router;