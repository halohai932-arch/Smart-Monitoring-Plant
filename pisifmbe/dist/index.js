"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const user_controller_1 = __importDefault(require("./user/user.controller"));
const dailyReport_router_1 = __importDefault(require("./routes/dailyReport.router"));
const hourlyReport_router_1 = __importDefault(require("./routes/hourlyReport.router"));
const electricalReport_router_1 = __importDefault(require("./routes/electricalReport.router"));
require("./utils/pgTimezoneFix");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "http://localhost:30",
        "http://localhost:31",
        "http://10.125.48.102",
        "http://10.125.48.102:30",
        "http://localhost",
    ],
    credentials: true,
}));
// Disable caching for all API responses
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    next();
});
// const PORT = Number(process.env.PORT);
app.get("/api", (_req, res) => {
    res.send("Sukses landing ke endpoint api");
});
// Dynamic LVMDP routes (frontend uses: /api/lvmdp/{panelId}/latest, /api/lvmdp/{panelId}/hmi, etc)
app.use("/api/lvmdp", require("./routes/lvmdp.router").default);
// User authentication
app.use("/api/user", user_controller_1.default);
// Daily Report routes
app.use("/api/daily-report", dailyReport_router_1.default);
// Hourly Report routes
app.use("/api/hourly-report", hourlyReport_router_1.default);
// Electrical Report routes
app.use("/api/report", electricalReport_router_1.default);
exports.default = app;
