import { Router } from 'express';

import EstadoController from './app/controllers/EstadoController';
import CidadeController from './app/controllers/CidadeController';
import PessoaController from './app/controllers/PessoaContoller';
import ContaController from './app/controllers/ContaController';

const routes = new Router();

routes.delete('/estados/:est_sigla', EstadoController.delete);
routes.delete('/cidades/:cid_codigo', CidadeController.delete);
routes.delete('/pessoas/:pes_codigo', PessoaController.delete);
routes.delete('/contas/:cnt_numero', ContaController.delete);

// routes.put('/estados/:est_sigla', EstadoController.update);
// routes.put('/cidades/:cid_codigo', CidadeController.update);
// routes.put('/pessoas/:pes_codigo', PessoaController.update);
// routes.put('/contas/:cnt_numero', ContaController.update);

routes.post('/estados', EstadoController.store);
routes.post('/cidades', CidadeController.store);
routes.post('/pessoas', PessoaController.store);
routes.post('/contas', ContaController.store);

routes.get('/estados', EstadoController.index);
routes.get('/cidades', CidadeController.index);
routes.get('/pessoas', PessoaController.index);
routes.get('/contas', ContaController.index);

export default routes;
