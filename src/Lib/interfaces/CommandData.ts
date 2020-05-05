import { PermissionResolvable } from "discord.js";

export interface CommandData {
  aliases?: string[];
  category?: string;
  dev?: boolean;
  description?: string;
  owner?: boolean;
  userPerms?: PermissionResolvable;
  botPerms?: PermissionResolvable;
  cooldown?: number;
}
