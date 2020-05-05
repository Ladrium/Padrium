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
          this.init();
        }

        init() {
          GuildMemberEntity.findOne({
            guildID: this.guild.id,
            mid: this.id
          }).then((member) => {
            this.db = member || new GuildMemberEntity(this.id, this.guild.id);
          });
        }
      }
  );
