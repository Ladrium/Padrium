import { PermissionResolvable } from "discord.js";

export interface CommandData {
  aliases?: string[];
  category?: string;
  dev?: boolean;
  owner?: boolean;
  userPerms?: PermissionResolvable;
  botPerms?: PermissionResolvable;
  cooldown?: number;
}
