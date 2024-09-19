import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'

const userSchema =  new mongoose.Schema({
     first_name:{
       type:String,
       required:true,
     },

     last_name:{
        type:String,
        required:true,
      },

     email:{
        type:String,
        required:true,
        unique:true,
        validate: [validator.isEmail, "Invalid email address"]
      } ,

      password:{
        type:String,
        required:true,
      }
})


userSchema.statics.signup = async function(first_name, last_name, email, password){
  if(!first_name || !last_name || !email || !password) {
      throw new Error("All fields are required")
  }
  if( !validator.isEmail(email)) {
      throw new Error("Please provide a valid email")
  }

  const exist = await this.findOne({email})
  if(exist) {
      throw new Error("Email already exists")
  }

  if(!validator.isStrongPassword(password)) {
      throw new Error("Password must be at least 8 characters long,mix of numbers,letters and symbols")
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);


      const newUser = new this({
          first_name,
          last_name,
          email,
          password: hashedPassword
      })
  
  return newUser.save();

}


userSchema.statics.login = async function (email, password) {
  if(!email || !password){
      throw new Error('Please provide all the fields')
  }
  const user = await this.findOne({ email: email });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  if(!user){
      throw new Error('User with this email does not exist')
  }
  const isMatch = await bcrypt.compare(password, user.password)
 if(!isMatch)
  throw new Error('Incorrect password')
 return user
  
}

const User = mongoose.model('User', userSchema)
 
export default User