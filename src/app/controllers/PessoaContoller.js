import Estado from '../models/Estado';
import Cidade from '../models/Cidade';
import Pessoa from '../models/Pessoa';

class PessoaController {
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

  // async store(req, res) {}

  // async update(req, res) {}
}

export default new PessoaController();
