import { Command } from "../../../Lib";
import { Message } from "discord.js";

export = class extends Command {
  constructor() {
    super("economymessage", {
      aliases: ["ecomsg"],
      description:
        "Toggles the Economy Message for the current user(xp/coins and level up message)",
      cooldown: 5000
    });
  }
  run(message: Message) {
    message.author.db!.eco.msg = !message.author.db!.eco.msg;
    message.author.db!.save().catch(() => {});

    message.sem(
      `Successfully toggled your Economy Message, ${
        message.author.db!.eco.msg ? "Enabled" : "Disabled"
      }`
    );
  }
};
