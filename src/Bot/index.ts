import { Config, PadClient, GuildEntity } from "../Lib";
import { createConnection } from "typeorm";

declare module "discord.js" {
  interface Guild {
    db: GuildEntity | null;
    init(): void;
  }
}

const bot = new PadClient(Config.get("token"), {
  commands: __dirname + "/commands",
  events: __dirname + "/events",
});
