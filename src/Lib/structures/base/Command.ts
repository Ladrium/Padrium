import { CommandData } from "../../";
import { Message, PermissionResolvable } from "discord.js";

export class Command implements CommandData {
  public name: string;
  public aliases: string[] = [];
  public userPerms: PermissionResolvable = [];
  public botPerms: PermissionResolvable = [];
  public dev: boolean = false;
  public owner: boolean = false;
  public cooldown: number = 5000;
  constructor(name: string, data: CommandData = {}) {
    this.name = name;

    if (data.aliases) this.aliases = data.aliases;
    if (data.userPerms) this.userPerms = data.userPerms;
    if (data.botPerms) this.botPerms = data.botPerms;
    if (data.dev) this.dev = data.dev;
    if (data.owner) this.owner = data.owner;
    if (data.cooldown) this.cooldown = data.cooldown;
  }
  run(message: Message, args: string[]) {
    message.reply("Command not ready!");
  }
}
