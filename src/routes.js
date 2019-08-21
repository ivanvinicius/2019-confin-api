import { Router } from 'express';

import EstadoController from './app/controllers/EstadoController';
import CidadeController from './app/controllers/CidadeController';
import PessoaController from './app/controllers/PessoaContoller';
import ContaController from './app/controllers/ContaController';

const routes = new Router();

// inserção
routes.post('/estados', EstadoController.store);
routes.post('/cidades', CidadeController.store);
routes.post('/pessoas', PessoaController.store);
// routes.post('/contas', ContaController.store);

// listagem
routes.get('/estados', EstadoController.index);
routes.get('/cidades', CidadeController.index);
routes.get('/pessoas', PessoaController.index);
routes.get('/contas', ContaController.index);

// boas vindas
routes.get('/hello', (req, res) => res.json({ message: 'Hello world!' }));

export default routes;
