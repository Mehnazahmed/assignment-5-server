"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const noDataFound_1 = __importDefault(require("./app/middlewares/noDataFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://assignment-5-client-three.vercel.app",
    ],
    credentials: true,
    // methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send({ message: "Welcome to Assignment-5" });
});
app.use(globalErrorHandler_1.default);
//Not Found
app.use(notFound_1.default);
app.use(noDataFound_1.default);
exports.default = app;
