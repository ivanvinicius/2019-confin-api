import Login from '../models/Login';

class LoginController {
  async store(req, res) {
    const { email } = req.body;
    const LoginExist = await Login.findOne({ where: { email } });

    if (LoginExist) {
      return res
        .status(400)
        .json({ message: `O e-mail '${email}' já existe!` });
    }

    await Login.create(req.body);

    return res.json({
      message: `O email: ${email} foi cadastrado com sucesso`,
    });
  }
}

export default new LoginController();
