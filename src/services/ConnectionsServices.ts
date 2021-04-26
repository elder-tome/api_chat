import { getCustomRepository, Repository } from "typeorm";

import Connection from "../entities/Connection";
import ConnectionsRepository from "../repositories/ConnectionsRepository";

interface IConnectionsServices {
  admin_id?: string,
  user_id: string,
  socket_id?: string,
  id?: string
}

class ConnectionsServices {

  private ConnectionsRepository: Repository<Connection>;

  constructor() {
    this.ConnectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ admin_id, user_id, socket_id, id }: IConnectionsServices) {

    const connection = this.ConnectionsRepository.create({
      admin_id,
      user_id,
      socket_id,
      id
    });

    await this.ConnectionsRepository.save(connection);

    return connection;

  }

  async findByUserId(user_id: string) {

    const connection = await this.ConnectionsRepository.findOne({
      user_id
    });

    return connection;

  }

  async findAllWithoutAdmin() {

    const connections = await this.ConnectionsRepository.find({
      where: { admin_id: null },
      relations: ['user']
    })

    return connections;

  }

  async findBySocketId(socket_id: string) {
    const connections = await this.ConnectionsRepository.findOne({
      socket_id
    });

    return connections;
  }

  async updateAdminId(user_id: string, admin_id: string) {
    await this.ConnectionsRepository.createQueryBuilder().
      update(Connection).
      set({ admin_id }).
      where('user_id = :user_id', {
        user_id
      }).
      execute();
  }

}

export default ConnectionsServices;