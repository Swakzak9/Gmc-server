import User from '../Models/userModels.js'
import jwt from 'jsonwebtoken'

const getToken = ({_id}) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '7d'})

}

// Signup controller
 export const signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const user = await User.signup(first_name, last_name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = getToken(user)
    res.status(200).json({user, token});
   
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
 
};
