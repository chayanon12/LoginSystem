import { Request, Response } from "express";
import AuthService  from "../services/auth.service";

class AuthController {
  registerController: (req: Request, res: Response) => Promise<Response> =
    async (req, res) => {
      try {
        const { username, password } = req.body;
        const user = await AuthService.register(username, password);
        return res.status(201).json(user);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    };
  loginController: (req: Request, res: Response) => Promise<Response> = async (
    req,
    res
  ) => {
    try {
      const { username, password } = req.body;
      const user = await AuthService.login(username, password);
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export default new AuthController();