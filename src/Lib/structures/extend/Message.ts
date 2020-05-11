import { Structures, GuildMember, User, Message as msg } from "discord.js";
import { PadEmbed, PadClient, searchQuery } from "../../";

export = () =>
  Structures.extend(
    "Message",
    (Message) =>
      class extends Message {
        sem(
          content: string,
          options?: {
            type: "error" | "base";
            reply: boolean;
          }
        ): Promise<msg> {
          if (!options)
            options = {
              type: "base",
              reply: false
            };

          const embed = new PadEmbed(this, this.client as PadClient)[
            options!.type || "base"
          ](content);
          return options!.reply ? this.reply(embed) : this.channel.send(embed);
        }
        embed(type?: "error" | "base"): unknown {
          return new PadEmbed(this, this.client as PadClient)[type || "base"]();
        }
        async find(
          type: "member" | "user",
          query: string
        ): Promise<User | GuildMember | undefined | null> {
          if (type === "member") {
            if (this.mentions.members!.first())
              return this.mentions.members!.first()!;
            if (
              this.mentions.users.first() &&
              !this.mentions.members!.first()
            ) {
              return await this.guild!.members.fetch(
                this.mentions.users.first()!
              );
            }
            return (
              this.guild!.members.cache.get(query) ||
              this.guild!.members.cache.find((x) =>
                searchQuery(query, x.user.username)
              ) ||
              null
            );
          } else {
            if (this.mentions.users.first()) return this.mentions.users.first();
            return (
              this.client.users.cache.get(query) ||
              this.client.users.cache.find((u) =>
                searchQuery(query, u.username)
              )
            );
          }
        }
      }
  );
