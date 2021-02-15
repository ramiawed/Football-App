import express, { json } from "express";
import cors from "cors";
import globalErrorHandler from "./controllers/errorController.js";
import CompetitionRouter from "./routes/competitionRouter.js";
import clubRouter from "./routes/clubRouter.js";
import playerRouter from "./routes/playerRouter.js";
import seasonRouter from "./routes/seasonRouter.js";

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
app.use("/api/v1/competitions", CompetitionRouter);
app.use("/api/v1/clubs", clubRouter);
app.use("/api/v1/players", playerRouter);
app.use("/api/v1/seasons", seasonRouter);

// GLOBAL ERROR HANDLER
// GLOBAL ERROR HANDLER HAVE 4 PARAMETERS
// (ERROR, REQUEST, RESPONSE, NEXT)
app.use(globalErrorHandler);

export default app;
