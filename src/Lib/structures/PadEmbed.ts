import {
  MessageEmbed
} from "discord.js";
import {
  PadClient
} from "./Client/PadClient";
import {
  Message
} from "discord.js";
import {
  colors
} from "../../config.json";

export class PadEmbed extends MessageEmbed {
  public readonly bot: PadClient;
  public readonly message: Message;

  constructor(message: Message, bot: PadClient) {
    super();
    this.message = message;
    this.bot = bot;
  }

  base(content ? : string) {
    this.setAuthor(this.message.author.username, this.message.author.displayAvatarURL({
        dynamic: true
      }))
      .setFooter(this.bot.user!.username, this.bot.user!.displayAvatarURL({
        dynamic: true
      }))
      .setColor(colors.normal)
      .setTimestamp();
    if (content) this.setDescription(content);
    return this;
  }
  error(content: string = "") {
    return this.base(content).setColor(colors.error);
  }
}