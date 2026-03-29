"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/login', authController_1.loginUser);
router.get('/profile', authMiddleware_1.protect, authController_1.getProfile);
exports.default = router;
