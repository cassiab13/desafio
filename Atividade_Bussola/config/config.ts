import { randomUUID } from "node:crypto";

const randomName = randomUUID().slice(0, 4);

const dbHost = process.env.DB_HOST || "0.0.0.0";
const dbPort = process.env.DB_PORT || "27017";
const dbName = process.env.DB_NAME || `${randomName}-test`;

const config = {
  dbName,
  collection: "esoft-5a",
  dbURL: `mongodb://${dbHost}:${dbPort}`,
};
console.log("Criei uma database");
export default config;
