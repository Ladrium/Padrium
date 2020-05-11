import { Command } from "../../../Lib";
import { Message } from "discord.js";
import os from "os";
import ms from "ms";
const version = require("../../../../package.json").dependencies["discord.js"];

export = class extends Command {
  constructor() {
    super("stats", {
      aliases: ["stat", "statistics"]
    });
  }
  run(message: Message) {
    const infoEmbed = message
      .embed()
      .setTitle("Stats")
      .addField(
        "System Statistics",
        [
          `>>> **NodeJS Version**: ${process.version}`,
          `**Platform**: ${process.platform}`,
          `**Uptime**: ${ms(os.uptime() * 1000)}`,
          `**CPUs**: \n${os
            .cpus()
            .map(
              (x, i) => `CPU ${i + 1}: Model: ${x.model}, Speed: ${x.speed}MHz`
            )
            .join(",\n")}`,
          `**Memory**:\n Total: ${Math.floor(
            os.totalmem() / 1000000000
          )}GB\nUsed: ${Math.floor(
            (os.totalmem() - os.freemem()) / 1000000000
          )}GB`
        ].join("\n"),
        true
      )
      .addField(
        "Bot Statistics",
        [
          `>>> **Discord.js Version**: ${version}`,
          `**Uptime**: ${ms(this.bot!.uptime!)}`,
          `**Guilds(Servers)**: ${this.bot!.guilds.cache.size}`,
          `**Users**: ${this.bot!.users.cache.size}`
        ].join("\n"),
        true
      );

    message.channel.send(infoEmbed);
  }
};
