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

  @Column("eco") public eco: MemberEco = {
    coins: 50,
    level: 1,
    xp: 0
  };
  @Column("config") public config: MemberConfig = { XPMsg: false };

  constructor(memberID: string, guildID: string) {
    super();
    this.guildID = guildID;
    this.mid = memberID;
  }
}

export interface MemberConfig {
  XPMsg: boolean;
}

export interface MemberEco {
  coins: number;
  level: number;
  xp: number;
}
