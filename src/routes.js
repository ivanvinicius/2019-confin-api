import { Router } from 'express';

import EstadoController from './app/controllers/EstadoController';
import CidadeController from './app/controllers/CidadeController';

const routes = new Router();

routes.get('/estados', EstadoController.index);
routes.get('/cidades', CidadeController.index);

// boas vindas
routes.get('/hello', (req, res) => res.json({ message: 'Hello world!' }));

export default routes;
