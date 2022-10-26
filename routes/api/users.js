const express = require("express");

const ctrl = require("../../controllers/users");

const { ctrlWrapper } = require("../../helpers");

const {
  validateBody,
  validateBodySubscription,
  authenticate,
  upload,
} = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

// verify
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

// verify repeat, if email didn't receive by new user
router.post(
  "/verify",
  validateBody(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendVerify)
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

// patch avatar
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
