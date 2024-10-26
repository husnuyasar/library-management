import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BorrowingRecords } from "./borrowingRecord.entity";

@Entity()
export class Books {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column({ type: 'decimal', precision: 3, scale: 2, default: -1 })
    averageRating : number;
  
    @CreateDateColumn()
    createdAt : Date;
  
    @UpdateDateColumn()
    updatedAt : Date;

    @OneToMany((type)=> BorrowingRecords, borrowingRecord=>borrowingRecord.book)
    borrowingRecords : BorrowingRecords []
}