import * as Yup from 'yup';

import Estado from '../models/Estado';

class EstadoController {
  // listagem
  async index(req, res) {
    const estados = await Estado.findAll({
      attributes: ['est_sigla', 'nome'],
    });

    return res.json(estados);
  }

  // cadastro
  async store(req, res) {
    const schema = Yup.object().shape({
      est_sigla: Yup.string()
        .min(2)
        .max(2)
        .required(),
      nome: Yup.string()
        .min(3)
        .max(100)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Os dados informados no formulário não estão corretos',
      });
    }

    const { est_sigla } = req.body;
    const estadoExist = await Estado.findOne({ where: { est_sigla } });

    if (estadoExist) {
      return res
        .status(400)
        .json({ error: `O estado ${est_sigla} já foi cadastrado` });
    }

    await Estado.create(req.body);

    return res.json({ success: `O estado ${est_sigla} foi cadastrado` });
  }

  // atualização
  async update(req, res) {
    return res.json();
  }
}

export default new EstadoController();
