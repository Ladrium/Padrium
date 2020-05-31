import { Command } from "../../../Lib";
import { GuildMember, Message } from "discord.js";
import settings from "../../../settings.json";

export = class extends Command {
  constructor() {
    super("profile");
  }

  async run(message: Message, args: string[]) {
    let member = args[0]
      ? ((await message.find("member", args.join(" "))) as GuildMember)
      : message.member!;

    if (!member.db) await member.init();

    const pfEmbed = message
      .embed()
      .setTitle(
        `${
          member.user.username +
          (member.user.username.endsWith("s") ? "'" : "'s")
        } Profile`
      )
      .addField(
        "Adventure",
        member.user.db?.eco.adventure.type
          ? [
              `>>> Type: ${
                settings.adventure.types.find(
                  (x: { id: number }) =>
                    x.id === member.user.db!.eco.adventure.type
                )!.name
              }`,
            ].join("\n")
          : "> Not Started",
        true
      )
      .addField(
        "Business",
        member.user.db?.eco.business.type
          ? ">>> How do you have this"
          : "> Not Started",
        true
      );
    message.channel.send(pfEmbed);
  }
};
