const express = require("express");
const { schemas } = require("../../models/user");
const { validateBody, isValidId } = require("../../middlewars");
const router = express.Router();
const ctrl = require("../../controllers/users");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;
