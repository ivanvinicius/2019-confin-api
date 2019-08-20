import { Router } from 'express';

import EstadoController from './app/controllers/EstadoController';
import CidadeController from './app/controllers/CidadeController';
import PessoaController from './app/controllers/PessoaContoller';

const routes = new Router();

// listagem
routes.get('/estados', EstadoController.index);
routes.get('/cidades', CidadeController.index);
routes.get('/pessoas', PessoaController.index);

// boas vindas
routes.get('/hello', (req, res) => res.json({ message: 'Hello world!' }));

export default routes;
