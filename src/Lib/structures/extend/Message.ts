import {
  Structures,
  Message as msg
} from "discord.js";
import {
  PadEmbed,
  PadClient
} from "../../";

export = () =>
Structures.extend(
  "Message",
  (Message) =>
  class extends Message {
    sem(content: string, options ? : {
      type: "error" | "base",
      reply: boolean
    }): Promise < msg > {
      if (!options) options = {
        type: "base",
        reply: false
      };

      const embed = new PadEmbed(this, this.client as PadClient)[options!.type || "base"](content);
      return options!.reply ? this.reply(embed) : this.channel.send(embed);
    }
  }
);