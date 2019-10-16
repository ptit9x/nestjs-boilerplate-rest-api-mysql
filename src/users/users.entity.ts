import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ length: 500 })
  password: string;

  @Column()
  email: string;

  @Column({ length: 500 })
  url: string;

  @Column('int')
  status: number;

  @Column()
  dispayName: string;
}
