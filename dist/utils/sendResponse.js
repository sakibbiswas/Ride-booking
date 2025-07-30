"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, { statusCode, success, message, data, }) => {
    res.status(statusCode).json({
        success,
        message,
        data,
    });
};
exports.default = sendResponse;
