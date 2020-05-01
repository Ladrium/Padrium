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

    if (message.guild.db) message.guild.init();

    console.log(message.guild.db);
    const args = message.content.trim().split(/ +/g);
    const cmd = args.shift()!.toLowerCase();
    const command = bot.handler.getCommand(cmd);

    if (command) command.run(message, args);
  }
};
