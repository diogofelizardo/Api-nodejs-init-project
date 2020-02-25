import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { promisify } from 'util';
import User from "../models/User";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    req.user = await User.findById(req.userId);

    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err })
  }

};
