import { Command } from "../../../Lib";
import { Message } from "discord.js";

export = class extends Command {
  constructor() {
    super("echo", {
      aliases: ["say"],
      cooldown: 5000
    });
  }
  async run(message: Message, args: string[]) {
    message.sem(args.join(' '), {type: 'base'});
  }
};
