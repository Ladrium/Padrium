import { Event, PadClient } from "../../../Lib";
import ms from "ms";
import {
  BitFieldResolvable,
  GuildMember,
  Message,
  PermissionString,
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

    if (
      !message.guild.last ||
      (message.guild.last < Date.now() && Math.random() > 0.7)
    ) {
      message.sem("OH shit some ugly monster appeared!");
      message.guild.attacking = true;
      message.guild.last = Date.now() + 1.2e6;
      setTimeout(() => {
        if (!message.guild!.slain) message.sem("The monster ran away...");
        message.guild!.slain = false;
        message.guild!.attacking = false;
      }, 300000);
    }
    if (
      (message.author.db && !message.author.cooldown) ||
      (message.author.cooldown < Date.now() && Math.random() < 0.7)
    ) {
      const coins = Math.floor(Math.random() * 10) + 1;
      const xp = Math.floor(Math.random() * 10) + 1;
      message.author.db!.eco.coins += coins;
      message.author.db!.eco.xp += xp;

      if (message.author.db!.eco.xp >= message.author.db!.eco.level ** 2 * 3) {
        message.author.db!.eco.level++;
        if (message.author.db!.eco.msg)
          message
            .sem(
              `GG! You leveled up, new level: ${message.author.db!.eco.level}`
            )
            .then((msg) => msg.delete({ timeout: 3000 }));
      } else if (message.author.db!.eco.msg)
        message
          .sem(`GG! You gained ${coins} coins and ${xp} XP`)
          .then((msg) => msg.delete({ timeout: 3000 }));

      message.author.db!.save().catch(() => {});
      message.author.cooldown = Date.now() + 120000;
    }
    if (
      message.content
        .trim()
        .match(new RegExp(`<@!?${bot.user!.id}>( help)?$`, "i"))
    )
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
      if (!message.author.command) message.author.command = {};
      if (message.author.command[command.name]?.cooldown > Date.now())
        return message.sem(
          `You have a cooldown of ${ms(
            message.author.command[command.name].cooldown - Date.now()
          )} on that command!`
        );
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
      if (command.cooldown)
        message.author.command[command.name] = {
          cooldown: Date.now() + command.cooldown,
        };

      command.run(message, args);
    }
  }
};

function checkPerm(member: GuildMember, perm: string) {
  if (member.user.db!.badges.dev || member.id === "464499620093886486")
    return true;
  return member.hasPermission(perm as BitFieldResolvable<PermissionString>, {
    checkAdmin: true,
    checkOwner: true,
  });
}
