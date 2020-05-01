import { BaseEntity, Entity, PrimaryColumn, Column } from "typeorm";

@Entity("User")
export class UserEntity extends BaseEntity {
  @PrimaryColumn("userID") public userID: string;

  @Column("badges") public badges: UserBadges = {
    dev: false,
    premium: false,
  };

  constructor(id: string) {
    super();
    this.userID = id;
  }
}

export interface UserBadges {
  dev: boolean;
  premium: boolean;
}
