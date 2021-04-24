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

}

export default SettingsController;