import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn
} from "typeorm";

@Entity("GuildMember")
export class GuildMemberEntity extends BaseEntity {
  @ObjectIdColumn({ name: "_id" })
  public _id?: ObjectID;
  @PrimaryColumn("guildID") public guildID: string;
  @PrimaryColumn("mid") public mid: string;

  constructor(memberID: string, guildID: string) {
    super();
    this.guildID = guildID;
    this.mid = memberID;
  }
}
