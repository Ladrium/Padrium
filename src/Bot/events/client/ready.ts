import { Event, PadClient } from "../../../Lib";
import start from "../../../server/server";

export = class extends Event {
  constructor() {
    super("ready");
  }
  async run(bot: PadClient) {
    console.log(`[${bot.user!.tag}] => ready`);
    start(bot);
  }
};
