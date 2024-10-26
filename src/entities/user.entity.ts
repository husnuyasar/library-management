import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BorrowingRecords } from "./borrowingRecord.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt : Date;

  @UpdateDateColumn()
  updatedAt : Date;

  @OneToMany((type)=> BorrowingRecords, borrowingRecord=>borrowingRecord.user)
  borrowingRecords: BorrowingRecords []
}