import { Request, Response } from "express";
import UsersServices from "../services/UsersServices";

class SettingsController {

  async create(request: Request, response: Response): Promise<Response> {

    const { email } = request.body;

    const user = await new UsersServices().create(email);

    return response.json(user);

  }

}

export default SettingsController;