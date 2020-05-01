import { config } from "dotenv";
import conf from "../../config.json";

config({
  path: __dirname + "/../../../.env",
});

export const Config = {
  get(wot: "uri" | "token" | "id") {
    return conf[process.env.ENVIRONMENT! as "DEVELOPMENT" | "PRODUCTION"][wot];
  },
};
