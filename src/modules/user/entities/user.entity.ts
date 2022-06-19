import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ select: true, unique: true })
  public email!: string;

  @Column()
  public password!: string;

  @CreateDateColumn()
  public createdAt!: Date;
}
