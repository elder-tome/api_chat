import { Router } from 'express';

import MessagesController from './controllers/MessagesController';
import SettingsController from './controllers/SettingsController';
import UsersController from './controllers/UsersController';

const routes = Router();

routes.post('/settings', new SettingsController().create);
routes.post('/users', new UsersController().create);

routes.post('/messages', new MessagesController().create);
routes.get('/messages/:id', new MessagesController().showByUser);

export default routes;