import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.entity";
import { Books } from "./book.entity";

@Entity()
export class BorrowingRecords {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, user => user.id)
    user: Users;

    @ManyToOne(() => Books, book => book.id)
    book: Books;

    @Column({ type: "int", nullable: true })
    rating: number | null;

    @CreateDateColumn()
    borrowDate: Date;

    @Column({ type: "timestamp", nullable: true })
    returnDate: Date | null;
}