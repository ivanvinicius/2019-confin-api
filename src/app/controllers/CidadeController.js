// import Estado from '../models/Estado';
import Cidade from '../models/Cidade';

class CidadeController {
  async index(req, res) {
    const cidades = await Cidade.findAll({
      attributes: ['cid_codigo', 'nome'],
    });

    return res.json({ cidades });
  }

  // async store(req, res) {}

  // async update(req, res) {}
}

export default new CidadeController();
