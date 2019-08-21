import * as Yup from 'yup';
import { Op } from 'sequelize';

import Estado from '../models/Estado';
import Cidade from '../models/Cidade';
import Pessoa from '../models/Pessoa';

class PessoaController {
  // listagem
  async index(req, res) {
    const pessoas = await Pessoa.findAll({
      attributes: ['pes_codigo', 'nome', 'idade', 'email'],
      include: [
        {
          model: Cidade,
          as: 'cidade',
          attributes: ['cid_codigo', 'nome'],
          include: [
            {
              model: Estado,
              as: 'estado',
              attributes: ['est_sigla', 'nome'],
            },
          ],
        },
      ],
    });

    return res.json(pessoas);
  }

  // cadastro
  async store(req, res) {
    const schema = Yup.object().shape({
      pes_codigo: Yup.number()
        .integer()
        .required(),
      nome: Yup.string()
        .max(100)
        .required(),
      idade: Yup.number()
        .integer()
        .required(),
      email: Yup.string()
        .email()
        .max(120)
        .required(),
      cid_codigo: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: `Os dados informados no formulário não estão corretos `,
      });
    }

    const { pes_codigo, nome, email } = req.body;
    const pessoaExist = await Pessoa.findOne({
      where: {
        [Op.or]: [{ pes_codigo }, { email }],
      },
    });

    if (pessoaExist) {
      return res
        .status(400)
        .json({ error: `O email ${email} já foi cadastrado` });
    }

    await Pessoa.create(req.body);

    return res.json({ success: `A pessoa ${nome} foi cadastrada` });
  }

  // atualização
  async update(req, res) {
    const schema = Yup.object().shape({
      pes_codigo: Yup.number()
        .integer()
        .required(),
      nome: Yup.string()
        .max(100)
        .required(),
      idade: Yup.number()
        .integer()
        .required(),
      email: Yup.string()
        .email()
        .max(120)
        .required(),
      cid_codigo: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: `Os dados informados no formulário não estão corretos `,
      });
    }

    const { pes_codigo, nome } = req.body;
    const pessoa = await Pessoa.findByPk(pes_codigo);

    if (!pessoa) {
      return res
        .status(400)
        .json({ error: `A pessoa${pes_codigo}: ${nome} não existe ` });
    }

    await pessoa.update(req.body);

    return res.json({
      success: `A pessoa ${pes_codigo}: ${nome} foi atualizada`,
    });
  }

  //  deleção
  async delete(req, res) {
    const pessoa = await Pessoa.findByPk(req.params.pes_codigo);

    if (!pessoa) {
      return res
        .status(400)
        .json({ error: `A pessoa ${req.params.pes_codigo} não existe` });
    }

    const { nome } = pessoa;

    try {
      await pessoa.destroy();
    } catch (err) {
      return res.status(401).json({ error: err.parent.detail });
    }

    return res.json({
      success: `A pessoa ${req.params.pes_codigo}: ${nome} foi apagada`,
    });
  }
}

export default new PessoaController();
