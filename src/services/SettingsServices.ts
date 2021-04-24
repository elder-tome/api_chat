import { getCustomRepository, Repository } from "typeorm";

import Setting from "../entities/Setting";
import SettingsRepository from "../repositories/SettingsRepository";

interface ISettingsServices {
  username: string,
  chat: boolean
}

class SettingsServices {

  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ username, chat }: ISettingsServices) {


    const userAlreadyExists = await this.settingsRepository.findOne({
      username
    });

    if (userAlreadyExists) {
      throw new Error('Usuário já existe');
    }

    const settings = this.settingsRepository.create({
      username,
      chat
    });

    await this.settingsRepository.save(settings);

    return settings;

  }

}

export default SettingsServices;