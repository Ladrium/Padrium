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
          this.init();
        }

        init() {
          UserEntity.findOne({ uid: this.id }).then((user) => {
            this.db = user || new UserEntity(this.id);
          });
        }
      }
  );
