"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const toolRoutes_1 = __importDefault(require("./routes/toolRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => res.json({ status: 'OK' }));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/tools', toolRoutes_1.default);
app.use(errorMiddleware_1.errorHandler);
exports.default = app;
