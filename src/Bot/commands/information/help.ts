import { Command, PadClient, PadEmbed } from "../../../Lib";
import { Message, User } from "discord.js";

export = class extends Command {
  constructor() {
    super("help", {
      aliases: ["info"]
    });
  }

  run(message: Message, [command]: string[]) {
    let helpEmbed = new PadEmbed(message, this.bot!).base();

    if (!command) {
      all(this.bot!, helpEmbed, message.author);
    } else {
      const cmd = this.bot!.handler.getCommand(command);
      if (cmd) {
        helpEmbed
          .setTitle(cmd.name[0].toUpperCase() + cmd.name.slice(1).toLowerCase())
          .addField(
            "Category",
            cmd.category![0].toUpperCase() +
              cmd.category!.slice(1).toLowerCase(),
            true
          )
          .addField(
            "Aliases",
            cmd.aliases.map((x) => `\`${x}\``).join(", ") || "None",
            true
          )
          .addField("Description", cmd.description || "No Description", true)
          .addField("Cooldown", cmd.cooldown + "ms", true)
          .addField("Owner Only", cmd.owner, true)
          .addField("Dev Only", cmd.dev, true)
          .addField(
            "User Permissions Needed",
            (cmd.userPerms as string[])
              .map(
                (x) =>
                  `\`${x
                    .split("_")
                    .map((z) => z[0].toUpperCase() + z.slice(1).toLowerCase())
                    .join(" ")}\``
              )
              .join(", ") || "None",
            true
          )
          .addField(
            "Bot Permissions Needed",
            (cmd.botPerms as string[])
              .map(
                (x) =>
                  `\`${x
                    .split("_")
                    .map((z) => z[0].toUpperCase() + z.slice(1).toLowerCase())
                    .join(", ")}\``
              )
              .join(", ") || "None",
            true
          );
      } else all(this.bot!, helpEmbed, message.author);
    }
    message.channel.send(helpEmbed);
  }
};

function all(bot: PadClient, helpEmbed: PadEmbed, author: User) {
  let categories = bot!.handler.commands(true);
  categories.forEach((category: unknown) => {
    if (category === "developer" && !author.db!.badges.dev) return;
    helpEmbed.setTitle("Commands").addField(
      (category as string)[0].toUpperCase() +
        (category as string).slice(1).toLowerCase(),
      (bot!.handler.commands() as Command[])
        .filter((x: Command) => x.category === category)
        .map((cmd) => `\`${cmd.name}\``)
        .join(", ")
    );
  });
}
