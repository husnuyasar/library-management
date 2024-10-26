import { UsersRepository } from "../repositories/user.repository";

export const seedUsers = async () => {
    const userRepository = new UsersRepository
  
    // Check the table is empty or not
    const users = await userRepository.find();
    if(users && users.length>0) return;
  
    // Example users data
    const newUsers = [
      { name: "Eray Aslan" },
      { name: "Enes Faruk Meniz" },
      { name: "Kadir Mutlu" },
      { name: "Sefa Eren Şahin" },
    ];
  
    await userRepository.save(newUsers);
};