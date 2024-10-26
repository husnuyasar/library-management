import { Users } from "../entities/user.entity";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";


export class UsersRepository extends Repository<Users>{
    constructor() {
      super(Users,AppDataSource.createEntityManager())
    }
    
    async findAll() {
      return this.find();
    }
  
    async findById(id: number) {
      return this.findOne({ where: {id} });
    }

    async findWithBooks(id : number) {
      return this.createQueryBuilder('u')
        .leftJoinAndSelect('u.borrowingRecords','br')
        .leftJoinAndSelect('br.book','b')
        .where('u.id =:id', { id })
        .getOne();
    }
  
    async add(user: Users) {
      return this.save(user);
    }
}