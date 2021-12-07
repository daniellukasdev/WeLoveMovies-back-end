const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router
  .route("/:movieId/theaters")
  .get(controller.getTheatersByMovie)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.getReviewsByMovie)
  .all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
