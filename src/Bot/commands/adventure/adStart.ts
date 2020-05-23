import { Command, searchQuery } from "../../../Lib";
import { Message } from "discord.js";
import { adventure } from "../../../settings.json";

const questions = [
  {
    description: `Choose your adventure type! (${adventure.types
      .map((x) => x.name)
      .join(", ")})`,
    output: "type"
  }
];
export = class extends Command {
  constructor() {
    super("adventurestart", {
      aliases: ["adstart"]
    });
  }
  async run(message: Message) {
    if (message.author.db?.eco.adventure.type || message.author.started)
      return message.sem("You've already started!");

    message.author.started = true;

    for await (const question of questions) {
      const msg = await message.promptMessage(question.description);
      if (question.output === "type") {
        const type = adventure.types.find((type) =>
          searchQuery(msg!.content, type.name)
        );
        if (!type) {
          message.sem("Uhhhh doesnt exist");
          break;
        }
        message.author.db!.eco.adventure.type = type.id;
      }
    }
    message.guild!.slain = true;
    message.author.started = false;
    message.author.db?.save();
  }
};
