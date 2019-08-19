import { Router } from 'express';

import EstadoController from './app/controllers/EstadoController';

const routes = new Router();

routes.get('/estados', EstadoController.index);

// boas vindas
routes.get('/hello', (req, res) => res.json({ message: 'Hello world!' }));

export default routes;
