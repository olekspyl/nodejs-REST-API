const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const express = require("express");
const { schemas } = require("../../models/user");
const { validateBody, authenticate } = require("../../middlewars");
const router = express.Router();
const ctrl = require("../../controllers/users");

const tempDir = path.join(__dirname, "temp");
const multerConfig = multer.diskStorage({
  destination: tempDir,
});

const upload = multer({
  storage: multerConfig,
});

router.post(
  "/register",
  upload.single("cover"),
  validateBody(schemas.registerSchema),
  ctrl.register
);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrentUser);
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
