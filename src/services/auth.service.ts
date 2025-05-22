import bycrypt from "bcrypt";
import UserRepository from "../repositories/user.repository";
import jwt from "jsonwebtoken";
class AuthService {
  register = async (username: string, password: string) => {
    const exitsUser = await UserRepository.findUserByUsername(username);
    if (exitsUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    return await UserRepository.createUser(username, hashedPassword);
  };

  login = async (username: string, password: string) => {
    
    const user = await UserRepository.loginUser(username);
    if (!user) {
      throw new Error("Invalid username or password");
    }
    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid username or password");
    }
    const payload ={userId:user.id,username:user.username};
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return {user_id:user.id, username:user.username, token};
  };
}
export default new AuthService();