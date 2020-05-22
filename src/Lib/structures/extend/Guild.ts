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
          (async () => await this.init())();
        }

        async init() {
          this.db =
            (await GuildEntity.findOne({ gid: this.id })) ||
            new GuildEntity(this.id);
        }
      }
  );
