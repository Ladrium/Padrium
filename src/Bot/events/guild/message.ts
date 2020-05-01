import { Event, PadClient } from "../../../Lib";
import { Message } from "discord.js";

export = class extends Event {
  constructor() {
    super("message");
  }

  async run(bot: PadClient, message: Message) {
    if (message.author.bot || !message.guild) return;
    if (!message.member)
      // @ts-ignore
      message.member! = await message.guild.members.fetch(message.author);

    if (!message.guild.db) message.guild.init();
    if (!message.member.db) message.member.init();
    if (!message.author.db) message.author.init();

    if (!message.content.startsWith(message.guild.db!.prefix)) return;

    const args = message.content
      .trim()
      .slice(message.guild.db!.prefix.length)
      .split(/ +/g);
    const cmd = args.shift()!.toLowerCase();
    const command = bot.handler.getCommand(cmd);

    if (command) command.run(message, args);
  }
};
