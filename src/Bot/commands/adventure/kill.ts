import { Command } from "../../../Lib";
import { Message } from "discord.js";

export = class extends Command {
  constructor() {
    super("kill");
  }
  run(message: Message) {
    if (!message.guild?.attacking)
      return message.sem("There's no monster attacking at the moment!", {
        type: "error"
      });

    if (!message.author.db?.eco.adventure.type)
      return message.sem(
        `You haven't started with your adventure yet, so you cannot attack monsters! (${
          message.guild!.db!.prefix
        }adstart)`,
        { type: "error" }
      );
    message.sem("You killed that fucking bitch");
    message.guild.slain = true;
    message.guild!.attacking = false;
  }
};
