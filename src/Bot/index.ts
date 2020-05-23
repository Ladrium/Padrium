import "reflect-metadata";

import {
  Config,
  GuildEntity,
  GuildMemberEntity,
  PadClient,
  UserEntity,
  PadEmbed
} from "../Lib";
import { createConnection } from "typeorm";

declare module "discord.js" {
  interface Guild {
    last?: number;
    slain: boolean;
    attacking?: boolean;
    db: GuildEntity | null;

    init(): void;
  }

  interface GuildMember {
    db: GuildMemberEntity | null;

    init(): void;
  }

  interface User {
    db: UserEntity | null;
    cooldown: number;
    started?: boolean;
    command: { [key: string]: { cooldown: number } };

    init(): void;
  }

  interface Message {
    sem(
      content: string,
      options?: { type?: "base" | "error"; reply?: boolean }
    ): Promise<Message>;
    find(
      type: "member" | "user",
      query: string
    ): Promise<GuildMember | User | null | undefined>;
    promptMessage(question: string): Promise<Message | null>;
    embed(type?: "error" | "base"): any;
  }
}
createConnection({
  type: "mongodb",
  url: Config.get("uri"),
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  entities: [__dirname + "/../Lib/database/*.js"]
}).then((connection) => {
  if (connection) console.log("[Database] => Connected");
});

require("../Lib/structures/extend/GuildMember")();
require("../Lib/structures/extend/Guild")();
require("../Lib/structures/extend/Message")();
require("../Lib/structures/extend/User")();

const bot = new PadClient(Config.get("token"), {
  commands: __dirname + "/commands",
  events: __dirname + "/events"
});
