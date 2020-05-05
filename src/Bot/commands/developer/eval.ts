import { Command } from "../../../Lib";
import { Message } from "discord.js";

export = class extends Command {
  constructor() {
    super("eval");
  }
  run(message: Message, args: string[]) {}
};
