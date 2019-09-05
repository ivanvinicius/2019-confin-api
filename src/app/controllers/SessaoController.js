import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import Login from '../models/Login';

class SessaoController {
  async store(req, res) {
    const { email, senha } = req.body;

    const login = await Login.findOne({ where: { email } });

    if (!login) {
      return res.status(400).json({ error: 'O email informado não existe' });
    }

    if (!(await login.checaSenha(senha))) {
      return res.status(400).json({ error: 'Email ou senha inválido' });
    }

    const { id, name } = login;

    return res.json({
      login: { id, name, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessaoController();
