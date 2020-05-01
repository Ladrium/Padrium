import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("GuildMember")
export class GuildMemberEntity extends BaseEntity {
  @PrimaryColumn("guildID") public guildID: string;
  @PrimaryColumn("memberID") public memberID: string;

  @Column("eco") public eco: MemberEco = {
    coins: 50,
    level: 1,
    xp: 0,
  };
  @Column("config") public config: MemberConfig = { XPMsg: false };

  constructor(memberID: string, guildID: string) {
    super();
    this.guildID = guildID;
    this.memberID = memberID;
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
