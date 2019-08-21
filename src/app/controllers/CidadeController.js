import { Op } from 'sequelize';
import * as Yup from 'yup';

import Estado from '../models/Estado';
import Cidade from '../models/Cidade';

class CidadeController {
  // listagem
  async index(req, res) {
    const cidades = await Cidade.findAll({
      attributes: ['cid_codigo', 'nome'],
      include: [
        {
          model: Estado,
          as: 'estado',
          attributes: ['est_sigla', 'nome'],
        },
      ],
    });

    return res.json(cidades);
  }

  // cadastro
  async store(req, res) {
    const schema = Yup.object().shape({
      cid_codigo: Yup.number()
        .integer()
        .required(),
      nome: Yup.string()
        .min(3)
        .max(100)
        .required(),
      est_sigla: Yup.string()
        .min(2)
        .max(2)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Os dados informados no formulário não estão corretos ',
      });
    }

    const { cid_codigo, nome } = req.body;
    const cidadeExist = await Cidade.findOne({
      where: {
        [Op.or]: [{ cid_codigo }, { nome }],
      },
    });

    if (cidadeExist) {
      return res
        .status(400)
        .json({ error: `A cidade ${nome} já foi cadastrada` });
    }

    await Cidade.create(req.body);

    return res.json({ success: `A cidade ${nome} foi cadastrada` });
  }

  // async update(req, res) {}
}

export default new CidadeController();
