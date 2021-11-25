import "reflect-metadata";
import express, { Express } from "express";

import dbConnection from "./Documentation/Infrastructure/Database/DBConnection";

const startServer = async () => {
  await dbConnection;

  // Need to wait for connection to be ready because controllers imports the
  // dependency injection module which get repository specific implementations.
  // If the connection is not ready, trying to get the repositories will fail.
  const { default: DocumentationController } = await import(
    "./Documentation/Infrastructure/Controllers/DocumentationController"
  );

  const port = 5000;

  const app: Express = express();

  app.use(express.json());
  app.use("/api/documentation", new DocumentationController().router);

  app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`)
  );
};

startServer();
