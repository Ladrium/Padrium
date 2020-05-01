import { Event, PadClient } from "../../../Lib";
import { createConnection } from "typeorm";
import { Config } from "../../../Lib";

export = class extends Event {
  constructor() {
    super("ready");
  }
  async run(bot: PadClient) {
    console.log(`[${bot.user!.tag}] => ready`);
  }
};
