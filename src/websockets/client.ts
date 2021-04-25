import { io } from '../http';
import ConnectionsServices from '../services/ConnectionsServices';
import UsersServices from '../services/UsersServices';
import MessageServices from '../services/MessagesServices';

interface IParams {
  email: string,
  text: string
}

io.on('connect', (socket) => {

  const usersServices = new UsersServices();
  const connectionsServices = new ConnectionsServices();
  const messageServices = new MessageServices();

  socket.on('client_first_access', async (params: IParams) => {
    const socket_id = socket.id;
    const { email, text } = params;
    let user_id = null;

    const userExists = await usersServices.findByEmail(email);

    if (!userExists) {
      const user = await usersServices.create(email);

      await connectionsServices.create({
        user_id: user.id,
        socket_id,
      });

      user_id = user_id;

    } else {
      user_id = userExists.id;
      const connection = await connectionsServices.findByUserId(userExists.id);

      if (!connection) {
        await connectionsServices.create({
          user_id: userExists.id,
          socket_id,
        });
      } else {
        connection.socket_id = socket_id;
        await connectionsServices.create(connection);
      }
    }

    await messageServices.create({
      text,
      user_id
    });
  });
});
