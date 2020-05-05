import {
  BaseEntity,
  Column,
  PrimaryColumn,
  ObjectIdColumn,
  ObjectID,
  Entity
} from "typeorm";

@Entity("Guild")
export class GuildEntity extends BaseEntity {
  @ObjectIdColumn({ name: "_id" })
  public _id?: ObjectID;
  @PrimaryColumn("gid") public gid: string;
  @Column("admin") public admin: string[] = [];
  @Column("prefix") public prefix: string = "p!";

  constructor(id: string) {
    super();
    this.gid = id;
  }
}
