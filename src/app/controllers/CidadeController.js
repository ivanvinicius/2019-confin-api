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

  // atualização
  async update(req, res) {
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
    const cidade = await Cidade.findByPk(cid_codigo);

    if (!cidade) {
      return res
        .status(400)
        .json({ error: `A cidade ${cid_codigo}: ${nome} não existe ` });
    }

    await cidade.update(req.body);

    return res.json({
      success: `A cidade ${cid_codigo}: ${nome} foi atualizada`,
    });
  }

  //  deleção
  async delete(req, res) {
    const cidade = await Cidade.findByPk(req.params.cid_codigo);

    if (!cidade) {
      return res
        .status(400)
        .json({ error: `A cidade ${req.params.cid_codigo} não existe` });
    }

    const { nome } = cidade;

    try {
      await cidade.destroy();
    } catch (err) {
      return res.status(401).json({ error: err.parent.detail });
    }

    return res.json({
      success: `A cidade ${req.params.cid_codigo}: ${nome} foi apagada`,
    });
  }
}

export default new CidadeController();
