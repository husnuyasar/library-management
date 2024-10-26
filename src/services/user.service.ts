import { Users } from "../entities/user.entity";
import { UserResponse } from "../interfaces/userResponse.interface";
import { UsersRepository } from "../repositories/user.repository";

export class UsersService {
    private userRepository= new UsersRepository();

    async getAll() : Promise<Users [] | null>{
        return await this.userRepository.findAll();
    }

    async getById(id : number) : Promise<Users | null>{
        return await this.userRepository.findById(id);
    }

    async getWithBooksById(id : number) : Promise<UserResponse | null>{
        const user = await this.userRepository.findWithBooks(id);
        if(!user) return null;
        const past = user?.borrowingRecords.filter(br=> br.returnDate!==null).map(br=> {
            return {
                name : br.book?.name,
                userScore: br.rating
            }
        })
        const present = user?.borrowingRecords.filter(br=> br.returnDate===null).map(br=> {
            return {
                name : br.book?.name
            }
        })
        return {
            id : user.id,
            name: user.name,
            books: {
                past,
                present
            }
        } as UserResponse
    }

    async create(name : string) : Promise<Users> {
        const user = new Users;
        user.name = name;
        return await this.userRepository.add(user);
    }
}