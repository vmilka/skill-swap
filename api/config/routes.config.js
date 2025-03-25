const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const createError = require("http-errors");
const skills = require("../controllers/skills.controller");
const messages = require("../controllers/messages.controller");
const users = require("../controllers/users.controller");
const ratings = require("../controllers/ratings.controller");
const sessions = require("../controllers/sessions.controller");
const auth = require("../middlewares/session.middleware");
const storage = require("../config/storage.config");


// skills
router.get("/skills", skills.list);
router.get("/skills/:id", skills.detail);
router.post("/skills", skills.create);
// router.delete("/skills/:id", auth.isAuthenticated, skills.delete);
router.delete("/skills/:name", auth.isAuthenticated, skills.delete);
router.patch("/skills/:id", auth.isAuthenticated, skills.update);

// messages
router.post("/messages", messages.create);
router.get("/messages", messages.list);
router.get("/messages/:receiver", messages.detailChat);

// rating
router.get("/ratings/:id", ratings.list);
router.post("/ratings", ratings.create);

// users
router.get("/users/me", auth.isAuthenticated, users.profile);
router.post("/users", users.create);
router.patch("/users/me", auth.isAuthenticated, users.update);
router.get("/users/:id/validate", users.validate);

// sessions
router.post("/sessions", sessions.create);
router.delete("/sessions", auth.isAuthenticated, sessions.destroy);

router.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

router.use((error, req, res, next) => {
  if (
    error instanceof mongoose.Error.CastError &&
    error.message.includes("_id")
  )
    error = createError(404, "Resource not found");
  else if (error instanceof mongoose.Error.ValidationError)
    error = createError(400, error);
  else if (!error.status) error = createError(500, error.message);
  console.error(error);

  const data = {};
  data.message = error.message;
  if (error.errors) {
    data.errors = Object.keys(error.errors).reduce((errors, errorKey) => {
      errors[errorKey] =
        error.errors[errorKey]?.message || error.errors[errorKey];
      return errors;
    }, {});
  }
  res.status(error.status).json(data);
});

module.exports = router;
