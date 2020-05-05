import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn
} from "typeorm";

@Entity("User")
export class UserEntity extends BaseEntity {
  @ObjectIdColumn({ name: "_id" })
  public _id?: ObjectID;
  @PrimaryColumn("uid") public uid: string;
  @Column("badges") public badges: UserBadges = {
    dev: false,
    premium: false
  };

  constructor(id: string) {
    super();
    this.uid = id;
  }
}

export interface UserBadges {
  dev: boolean;
  premium: boolean;
}
