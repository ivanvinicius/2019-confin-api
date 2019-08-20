import Estado from '../models/Estado';
import Cidade from '../models/Cidade';
import Pessoa from '../models/Pessoa';
import Conta from '../models/Conta';

class ContaController {
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

  //  async store(req, res) {}

  // async update(req, res) {}
}

export default new ContaController();
