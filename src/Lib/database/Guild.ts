import { BaseEntity, Column, PrimaryColumn } from "typeorm";

export class GuildEntity extends BaseEntity {
  @PrimaryColumn("guildID") public guildID: string;
  @Column("prefix") public prefix: string = "p!";

  constructor(id: string) {
    super();
    this.guildID = id;
  }
}
