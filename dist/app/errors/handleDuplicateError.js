"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const regex = /"([^"]*)"/;
    const match = err.message.match(regex);
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: "",
            message: `${extractedMessage} is already exists`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Validation Error",
        errorSources,
    };
};
exports.default = handleDuplicateError;
