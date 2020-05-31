import { Command, Config } from "../../../Lib";
import { Message } from "discord.js";
import os from "os";
import ms from "ms";
import { utc } from "moment";

const version = require("../../../../package.json").dependencies["discord.js"];

export = class extends Command {
  constructor() {
    super("stats", {
      aliases: ["stat", "statistics"],
    });
  }

  run(message: Message) {
    const core = os.cpus()[0];
    const infoEmbed = message
      .embed()
      .setTitle("Stats")
      .addField(
        "System Statistics",
        [
          `>>> **NodeJS Version**: ${process.version}`,
          `**Platform**: ${process.platform}`,
          `**Uptime**: ${ms(os.uptime() * 1000)}`,
          `**CPU (${os.cpus().length} Cores)**: \nModel: ${
            core.model
          }\nSpeed: ${core.speed}MHz`,
          `**Memory**:\n Total: ${Math.floor(
            os.totalmem() / 1000000000
          )}GB\nUsed: ${Math.floor(
            (os.totalmem() - os.freemem()) / 1000000000
          )}GB`,
        ].join("\n"),
        true
      )
      .addField(
        "Bot Statistics",
        [
          `>>> **Discord.js Version**: ${version}`,
          `**Uptime**: ${ms(this.bot!.uptime!)}`,
          `**Ping**: ${this.bot!.ws.ping}ms`,
          `**Guilds(Servers)**: ${this.bot!.guilds.cache.size}`,
          `**Users**: ${this.bot!.users.cache.size}`,
          `**Channels**: ${this.bot!.channels.cache.size}`,
          `**Creation Date**: ${utc(this.bot!.user!.createdTimestamp).format(
            "Do MMMM YYYY HH:mm:ss"
          )}`,
          `**Server Prefix**: ${message.guild!.db!.prefix}`,
          `**Default Prefix**: ${Config.get("prefix")}`,
        ].join("\n"),
        true
      );

    message.channel.send(infoEmbed);
  }
};
