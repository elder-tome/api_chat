import { Request, Response } from "express";
import MessagesServices from "../services/MessagesServices";

class MessagesController {

  async create(request: Request, response: Response): Promise<Response> {

    const { admin_id, user_id, text } = request.body;

    const message = await new MessagesServices().create({ admin_id, user_id, text });

    return response.json(message);

  }

  async showByUser(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const list = await new MessagesServices().listByUser(id);

    return response.json(list);

  }

}

export default MessagesController;