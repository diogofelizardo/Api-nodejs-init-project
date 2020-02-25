import User from "../models/User";
import * as Yup from 'yup';
import roles from '../../config/roles';

class UserController {

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(401).json({ message: error.errors[0] })
    }

    const userExists = await User.findOne({ where : { email: req.body.email } });

    if(userExists){
      return res.status(400).json({ message: 'User already exists.' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email
    });
  }


  async update(req, res){
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6).when('oldPassword',(oldPassword,field) =>
        oldPassword ? field.required() : field
      ),
      confirmPassword: Yup.string().when('password',(password,field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      role: Yup.string(),
    });

    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(401).json({ message: error.errors[0] })
    }

    const { email, oldPassword, password } = req.body;

    if(password && !oldPassword){
      return res.status(401).json({ message: "oldPassword is required" });
    }


    if( (req.user.id != req.params.uid) && (req.user.role != roles.ADMIN) ){
      return res.status(400).json({ message: 'User not found!' })
    }

    const user = await User.findById(req.params.uid);

    if(email && (email != user.email)){
      const userExists = await User.findOne({ where: { email } });

      if(userExists){
        return res.status(400).json({ message: 'User already exists!' })
      }
    }

    if(oldPassword && !(await user.checkPassword(oldPassword))){
      return res.status(401).json({ message: 'Password does not match!' });
    }

    await User.update(req.body,{where:{id:req.params.uid}});

    return res.status(200).json({ message: "User updated!" });
  }

  async index(req, res){
    const users = await User.findAll();
    res.set({
      'X-Total-Count': users.length,
    });
    return res.json(users);
  }

  async delete(req, res){
    return res.json({ message: "Deletado!" });
  }

  async view(req, res){
    if( (req.params.uid != req.user.id) && (req.user.role != roles.ADMIN)){
      return res.status(401).json({ message: "User not found!" });
    }

    const user = await User.findById(req.params.uid);

    return res.json(user);
  }
}

export default new UserController();
