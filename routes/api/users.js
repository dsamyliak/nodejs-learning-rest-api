const express = require("express");

const ctrl = require("../../controllers/users");

const { ctrlWrapper } = require("../../helpers");

const {
  validateBody,
  validateBodySubscription,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

// signin
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

// current
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

// logout
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

// patch subscription
router.patch(
  "/subscription",
  authenticate,
  validateBodySubscription(schemas.subscriptionSchema),
  ctrlWrapper(ctrl.updateUser)
);

module.exports = router;
