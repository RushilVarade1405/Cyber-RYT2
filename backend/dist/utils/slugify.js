"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slugify = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, '-')
        .replace(/[^\w-]/g, '')
        .replace(/--+/g, '-');
};
exports.default = slugify;
