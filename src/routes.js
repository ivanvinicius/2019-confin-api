import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import EstadoController from './app/controllers/EstadoController';
import CidadeController from './app/controllers/CidadeController';
import PessoaController from './app/controllers/PessoaContoller';
import ContaController from './app/controllers/ContaController';
import LoginController from './app/controllers/LoginController';
import SessaoController from './app/controllers/SessaoController';

const routes = new Router();

routes.post('/criarLogin', LoginController.store);
routes.post('/sessao', SessaoController.store);

routes.use(authMiddleware); // todas as rotas abaixo precisam de login

routes.delete('/estados/:est_sigla', EstadoController.delete);
routes.delete('/cidades/:cid_codigo', CidadeController.delete);
routes.delete('/pessoas/:pes_codigo', PessoaController.delete);
routes.delete('/contas/:cnt_numero', ContaController.delete);

routes.put('/estados/', EstadoController.update);
routes.put('/cidades/', CidadeController.update);
routes.put('/pessoas/', PessoaController.update);
routes.put('/contas/', ContaController.update);

routes.post('/estados', EstadoController.store);
routes.post('/cidades', CidadeController.store);
routes.post('/pessoas', PessoaController.store);
routes.post('/contas', ContaController.store);

routes.get('/estados', EstadoController.index);
routes.get('/cidades', CidadeController.index);
routes.get('/pessoas', PessoaController.index);
routes.get('/contas', ContaController.index);

export default routes;
