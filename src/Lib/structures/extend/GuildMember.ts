import { Structures } from "discord.js";
import { GuildMemberEntity } from "../../";

export = () =>
  Structures.extend(
    "GuildMember",
    (GuildMember) =>
      class extends GuildMember {
        public db: GuildMemberEntity | null = null;

        constructor() {
          super(arguments[0], arguments[1], arguments[2]);
          (async () => await this.init())();
        }

        async init() {
          this.db =
            (await GuildMemberEntity.findOne({
              mid: this.id,
              guildID: this.guild.id
            })) || new GuildMemberEntity(this.id, this.guild.id);
        }
      }
  );
