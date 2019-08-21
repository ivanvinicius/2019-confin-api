import * as Yup from 'yup';

import Estado from '../models/Estado';
import Cidade from '../models/Cidade';
import Pessoa from '../models/Pessoa';
import Conta from '../models/Conta';

class ContaController {
  // listagem
  async index(req, res) {
    const contas = await Conta.findAll({
      attributes: [
        'cnt_numero',
        'descricao',
        'data',
        'valor',
        'tipo',
        'situacao',
      ],
      include: [
        {
          model: Pessoa,
          as: 'pessoa',
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
        },
      ],
    });

    return res.json(contas);
  }

  // cadastro
  async store(req, res) {
    const schema = Yup.object().shape({
      cnt_numero: Yup.number()
        .integer()
        .required(),
      descricao: Yup.string()
        .max(120)
        .required(),
      data: Yup.date().required(),
      valor: Yup.number().required(),
      tipo: Yup.string()
        .min(1)
        .max(1)
        .required(),
      situacao: Yup.string()
        .min(1)
        .max(1)
        .required(),
      pes_codigo: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Os dados informados no formulário não estão corretos ',
      });
    }

    const { cnt_numero, descricao } = req.body;
    const contaExist = await Conta.findByPk(cnt_numero);

    if (contaExist) {
      return res.status(400).json({
        error: `A conta ${cnt_numero}: ${descricao} já foi cadastrada`,
      });
    }

    await Conta.create(req.body);

    return res.json({
      success: `A conta ${cnt_numero}: ${descricao} foi cadastrada`,
    });
  }

  // atualização
  async update(req, res) {
    const schema = Yup.object().shape({
      cnt_numero: Yup.number()
        .integer()
        .required(),
      descricao: Yup.string()
        .max(120)
        .required(),
      data: Yup.date().required(),
      valor: Yup.number().required(),
      tipo: Yup.string()
        .min(1)
        .max(1)
        .required(),
      situacao: Yup.string()
        .min(1)
        .max(1)
        .required(),
      pes_codigo: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Os dados informados no formulário não estão corretos ',
      });
    }

    const { cnt_numero, descricao } = req.body;
    const conta = await Conta.findByPk(cnt_numero);

    if (!conta) {
      return res
        .status(400)
        .json({ error: `A conta ${cnt_numero}: ${descricao} não existe ` });
    }

    await conta.update(req.body);

    return res.json({
      success: `A conta ${cnt_numero}: ${descricao} foi atualizada`,
    });
  }

  //  deleção
  async delete(req, res) {
    const conta = await Conta.findByPk(req.params.cnt_numero);

    if (!conta) {
      return res
        .status(400)
        .json({ error: `A conta ${req.params.cnt_numero} não existe` });
    }

    const { descricao } = conta;

    try {
      await conta.destroy();
    } catch (err) {
      return res.status(401).json({ error: err.parent.detail });
    }

    return res.json({
      success: `A conta ${req.params.cnt_numero}: ${descricao} foi apagada`,
    });
  }
}

export default new ContaController();
