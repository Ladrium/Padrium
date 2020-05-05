import { Command } from "../../../Lib";
import { Message } from "discord.js";

export = class extends Command {
  constructor() {
    super("prefix", {
      description: "Set the prefix for the guild",
      userPerms: ["MANAGE_GUILD"],
      cooldown: 5000
    });
  }

  run(message: Message, [prefix]: string[]) {
    if (!prefix || prefix.length >= 4)
      return message.sem("The prefix can only be up to 3 characters!", {
        type: "error"
      });

    message.guild!.db!.prefix = prefix;
    message.guild!.db!.save();

    message.sem(`Successfully changed the guild prefix to ${prefix} !`);
  }
};
