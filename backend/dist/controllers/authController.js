"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.loginUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@cyberryt.com';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '';
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (email !== ADMIN_EMAIL) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcryptjs_1.default.compare(password, ADMIN_PASSWORD_HASH);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({
        email: ADMIN_EMAIL,
        isAdmin: true,
        token: (0, generateToken_1.default)('admin'),
    });
};
exports.loginUser = loginUser;
const getProfile = (req, res) => {
    res.json({ email: ADMIN_EMAIL, isAdmin: true });
};
exports.getProfile = getProfile;
