import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("Guild")
export class GuildEntity extends BaseEntity {
  @PrimaryColumn("guildID") public guildID: string;
  @Column("prefix") public prefix: string = "p!";

  constructor(id: string) {
    super();
    this.guildID = id;
  }
}
