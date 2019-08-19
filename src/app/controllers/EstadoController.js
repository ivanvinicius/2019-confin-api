import Estado from '../models/Estado';

class EstadoController {
  async index(req, res) {
    const estados = await Estado.findAll({
      attributes: ['est_sigla', 'nome'],
    });

    return res.json({ estados });
  }

  // async store(req, res) {}

  // async update(req, res) {}
}

export default new EstadoController();
