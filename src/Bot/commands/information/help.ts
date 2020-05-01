import { Command } from "../../../Lib";
import { Message } from "discord.js";

export = class extends Command {
  constructor() {
    super("help");
  }
  run(message: Message, args: string[]) {
    message.reply("Yes");
  }
};
