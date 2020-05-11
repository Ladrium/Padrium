import { Command } from "../../../Lib";
import { Message, GuildMember } from "discord.js";
import { utc } from "moment";

export = class extends Command {
  constructor() {
    super("userinfo", {
      aliases: ["ui", "whois"]
    });
  }
  async run(message: Message, args: string[]) {
    let member = args[0]
      ? ((await message.find("member", args.join(" "))) as GuildMember)
      : message.member!;

    if (!member) member = message.member!;
    if (!member.db) await member.init();

    const infoEmbed = message
      .embed()
      .setTitle("Userinfo")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addField(
        "General Information",
        [
          `>>> **Username**: ${member.user.username}`,
          `**ID**: ${member.id}`,
          `**Created At**: ${utc(member.user.createdTimestamp).format(
            "Do MMMM YYYY HH:mm:ss"
          )}`
        ].join("\n"),
        true
      )
      .addField(
        "Server Information",
        [
          `>>> **Nickname**: ${member.displayName}`,
          `**Joined At**: ${utc(member.joinedTimestamp).format(
            "Do MMMM YYYY HH:mm:ss"
          )}`,
          `**Roles**: ${
            member.roles.cache
              .array()
              .filter((x) => x.name !== "@everyone")
              .sort((a, b) => b.position - a.position)
              .join(" **|** ") || "@everyone"
          }`
        ].join("\n"),
        true
      );
    if (member.db)
      infoEmbed.addField(
        "Economy Information",
        [
          `>>> **Level:** ${member.user.db!.eco.level}`,
          `**XP:** ${member.user.db!.eco.xp}`,
          `**Coins:** ${member.user.db!.eco.coins}`
        ].join("\n"),
        true
      );

    message.channel.send(infoEmbed);
  }
};
