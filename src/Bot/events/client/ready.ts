import { Event, PadClient } from "../../../Lib";

export = class extends Event {
  constructor() {
    super("ready");
  }
  run(bot: PadClient) {
    console.log(`[${bot.user!.tag}] => ready`);
  }
};
