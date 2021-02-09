import express, { json } from "express";
import cors from "cors";
import LeagueRouter from "./routes/leagueRouter.js";
import TeamRouter from "./routes/teamRoute.js";
import globalErrorHandler from "./controllers/errorController.js";

const app = express();

// MIDDLEWARE
app.use(json());
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
}

app.use(express.static("public"));

// ROUTERS
app.use("/api/v1/leagues", LeagueRouter);
app.use("/api/v1/teams", TeamRouter);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
