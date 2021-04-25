import { Request, Response } from "express";
import SettingsServices from "../services/SettingsServices";

class SettingsController {

  async create(request: Request, response: Response): Promise<Response> {

    const { username, chat } = request.body;

    try {

      const settings = await new SettingsServices().create({ username, chat });

      return response.json(settings);

    } catch (error) {
      return response.status(400).json({
        message: error.message
      })
    }

  }

  async findByUsername(request: Request, response: Response) {

    const { username } = request.params;

    const settings = await new SettingsServices().findByUsername(username);

    return response.json(settings);

  }

  async update(request: Request, response: Response) {

    const { username } = request.params;
    const { chat } = request.body;

    const settings = await new SettingsServices().update(username, chat);

    return response.json(settings);

  }

}

export default SettingsController;