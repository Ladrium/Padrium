import { Structures } from "discord.js";
import { GuildEntity } from "../../";

export = () =>
  Structures.extend(
    "Guild",
    (Guild) =>
      class extends Guild {
        public db: GuildEntity | null = null;

        constructor() {
          super(arguments[0], arguments[1]);
          this.init();
        }

        init() {
          GuildEntity.findOne({ gid: this.id }).then((guild) => {
            this.db = guild || new GuildEntity(this.id);
          });
        }
      }
  );
