import { Client, Collection, TextChannel } from "discord.js";
import { Handler } from "./Handler";
import { Command } from "../..";
export class PadClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public handler: Handler;
  public dbh: string | TextChannel = "";

  constructor(
    token: string,
    { commands, events }: { commands: string; events: string }
  ) {
    super(...arguments);
    super.login(token);

    this.handler = new Handler(this, { commands, events });
    this.handler.load();
  }
}
