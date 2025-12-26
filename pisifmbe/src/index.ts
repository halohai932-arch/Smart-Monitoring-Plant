import express from "express";
import "dotenv/config";
import cors from "cors";
import userController from "./user/user.controller";
import lvmdp1Controller from "./lvmdp/LVMDP_1/lvmdp_1.controller";
import lvmdp2Controller from "./lvmdp/LVMDP_2/lvmdp_2.controller";
import lvmdp3Controller from "./lvmdp/LVMDP_3/lvmdp_3.controller";
import lvmdp4Controller from "./lvmdp/LVMDP_4/lvmdp_4.controller";
import lvmdp1DailyReportController from "./lvmdp/LVMDP_1/lvmdp_1.dailyReport.controller";
import lvmdp2DailyReportController from "./lvmdp/LVMDP_2/lvmdp_2.dailyReport.controller";
import lvmdp3DailyReportController from "./lvmdp/LVMDP_3/lvmdp_3.dailyReport.controller";
import lvmdp4DailyReportController from "./lvmdp/LVMDP_4/lvmdp_4.dailyReport.controller";
import dailyReportRouter from "./routes/dailyReport.router";
import hourlyReportRouter from "./routes/hourlyReport.router";
import electricalReportRouter from "./routes/electricalReport.router";
import "./utils/pgTimezoneFix";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:30",
      "http://localhost:31",
      "http://10.125.48.102",
      "http://10.125.48.102:30",
      "http://localhost",
    ],
    credentials: true,
  })
);

// Disable caching for all API responses
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
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
app.use("/api/user", userController);

// Daily Report routes
app.use("/api/daily-report", dailyReportRouter);

// Hourly Report routes
app.use("/api/hourly-report", hourlyReportRouter);

// Electrical Report routes
app.use("/api/report", electricalReportRouter);

export default app;
