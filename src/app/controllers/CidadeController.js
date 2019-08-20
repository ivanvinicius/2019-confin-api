import Cidade from '../models/Cidade';
import Estado from '../models/Estado';

class CidadeController {
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

  // async store(req, res) {}

  // async update(req, res) {}
}

export default new CidadeController();
