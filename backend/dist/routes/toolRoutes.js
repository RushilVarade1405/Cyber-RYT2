"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const toolsContent_json_1 = __importDefault(require("../data/toolsContent.json"));
const router = (0, express_1.Router)();
// Convert object to array
const tools = Object.entries(toolsContent_json_1.default).map(([slug, data]) => ({
    slug,
    ...data,
}));
router.get('/', (_req, res) => {
    res.json(tools);
});
router.get('/:slug', (req, res) => {
    const tool = tools.find((t) => t.slug === req.params.slug);
    if (!tool)
        return res.status(404).json({ message: 'Tool not found' });
    res.json(tool);
});
exports.default = router;
