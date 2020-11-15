import { Command } from "../../../Lib";
import { Message } from "discord.js";
import { utc } from "moment";

export = class extends Command {
  constructor() {
    super("serverinfo", {
      aliases: ["si"]
    });
  }
  async run(message: Message, args: string[]) {


    const infoEmbed = message
      .embed()
      .setTitle("Serverinfo")
      .setThumbnail(message.guild!.iconURL({dynamic: true}))
      .addField(
          "General Info",
          [
              `>>> **Name** ${message.guild!.name.length >= 30 ? message.guild!.name.slice(0, 30) + '...' : message.guild!.name}`,
              `**Description** ${message.guild!.description ? message.guild!.description : "None"}`,
              `**Members** ${message.guild!.memberCount}`,
              `**Region** ${message.guild!.region}`,
              `**Owner** ${message.guild!.owner}`
          ].join('\n')
      )
      .addField(
          "Channels",
          [
              `>>> **Store** ${message.guild!.channels.cache.filter(c => c.type === "store").size || 0}`,
              `**News** ${message.guild!.channels.cache.filter(c => c.type === "news").size || 0}`,
              `**Category** ${message.guild!.channels.cache.filter(c => c.type === "category").size || 0}`,
              `**Text** ${message.guild!.channels.cache.filter(c => c.type === "text").size || 0}`,
              `**Voice** ${message.guild!.channels.cache.filter(c => c.type === "voice").size || 0}`
          ].join('\n')
      )
      .addField(
          "Dates",
          [
              `**You Joined** ${utc(message.member!.joinedTimestamp).format(
                "Do MMMM YYYY HH:mm:ss"
              )}`,
              `**Server Created** ${utc(message.guild!.createdTimestamp).format(
                "Do MMMM YYYY HH:mm:ss"
              )}`
          ].join('\n')
      );

      message.channel.send(infoEmbed);
  }
};
