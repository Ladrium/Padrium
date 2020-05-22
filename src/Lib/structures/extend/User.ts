import { Structures } from "discord.js";
import { UserEntity } from "../../";

export = () =>
  Structures.extend(
    "User",
    (User) =>
      class extends User {
        public db: UserEntity | null = null;

        constructor() {
          super(arguments[0], arguments[1]);
          this.command = {};
          (async () => await this.init())();
        }

        async init() {
          this.db =
            (await UserEntity.findOne({ uid: this.id })) ||
            new UserEntity(this.id);
        }
      }
  );
