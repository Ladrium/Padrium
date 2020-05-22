import { Event, PadClient } from "../../../Lib";
import start from "../../../server/server";
import { TextChannel } from "discord.js";

export = class extends Event {
  constructor() {
    super("ready");
  }
  async run(bot: PadClient) {
    console.log(`[${bot.user!.tag}] => ready`);
    bot.dbh = bot.channels.cache.get("709429982677434420") as TextChannel;
    start(bot);
  }
};
