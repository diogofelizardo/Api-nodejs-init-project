import User from '../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import * as Yup from 'yup';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(401).json({ message: error.errors[0] })
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where : { email: req.body.email } });

    if(!user){
      return res.status(401).json({ message: 'User not found.' });
    }

    if(!(await user.checkPassword(password))){
      return res.status(401).json({ message: 'Password incorrect.' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret,{
        expiresIn: authConfig.expiresIn,
      }),
    });

  }
}

export default new SessionController();
