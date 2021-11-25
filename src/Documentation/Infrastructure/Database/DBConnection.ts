import { createConnection } from "typeorm";
import DocumentationDBEntity from "./DBEntities/DocumentationDBEntity";

const dbConnection = createConnection({
  type: "sqlite",
  database: "./database.sql",
  logging: false,
  synchronize: true,
  entities: [DocumentationDBEntity],
});

export default dbConnection;
