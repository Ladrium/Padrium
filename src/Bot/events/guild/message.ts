import { Event, PadClient } from "../../../Lib";
import {
  BitFieldResolvable,
  GuildMember,
  Message,
  PermissionString
} from "discord.js";

export = class extends Event {
  constructor() {
    super("message");
  }

  async run(bot: PadClient, message: Message) {
    if (message.author.bot || !message.guild) return;
    if (!message.member)
      // @ts-ignore
      message.member! = await message.guild.members.fetch(message.author);

    if (!message.guild.db) await message.guild.init();
    if (!message.member.db) await message.member.init();
    if (!message.author.db) await message.author.init();

    if (message.content.match(new RegExp(`^<@!?${bot.user!.id}>$`)))
      return message.sem(
        `Use ${message.guild.db!.prefix}help for all commands!`,
        { reply: true }
      );
    if (!message.content.startsWith(message.guild.db!.prefix)) return;

    const args = message.content
      .trim()
      .slice(message.guild.db!.prefix.length)
      .split(/ +/g);
    const cmd = args.shift()!.toLowerCase();
    const command = bot.handler.getCommand(cmd)!;

    if (command) {
      if (command.category === "developer" && !message.author.db!.badges.dev)
        return;
      if ((command.userPerms as string[])[0]) {
        if (
          !(command.userPerms as string[]).some((perm) =>
            checkPerm(message.member!, perm)
          )
        )
          return message.sem(
            `Insufficient permissions, use ${message.guild.db!.prefix}help ${
              command.name
            } for more info!`
          );
      }
      if ((command.botPerms as string[])[0]) {
        if (
          !(command.botPerms as string[]).some((perm) =>
            checkPerm(message.member!, perm)
          )
        )
          return message.sem(
            `The bot has insufficient permissions, use ${
              message.guild.db!.prefix
            }help ${command.name} for more info!`
          );
      }
      command.run(message, args);
    }
  }
};

function checkPerm(member: GuildMember, perm: string) {
  if (member.user.db!.badges.dev) return true;
  return member.hasPermission(perm as BitFieldResolvable<PermissionString>, {
    checkAdmin: true,
    checkOwner: true
  });
}
