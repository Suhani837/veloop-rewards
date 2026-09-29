const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const generateToken = (userId)=>{
  return jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
};

const register = async(req,res)=>{
  try{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
      return res.status(400).json({
        success:false,
        message:"Name, email and password are required",
      });
    }
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });
    if(existingUser){
      return res.status(409).json({
        success:false,
        message:"User already exists",
      })
    }
    const hashedPass = await bcrypt.hash(password,10);
    const user = await User.create({
      name,
      email:email.toLowerCase(),
      password:hashedPass
    });

    const token = generateToken(user._id.toString());
    return res.status(201).json({
      data:{
        user:{
          id:user._id,
          name:user.name,
          email:user.email,
        },
        token,
      },
    });
  } catch(err){
    console.error("Register error",err);
    return res.status(500).json({
      success:false,
      message:"Server error",
    });
  }
};

const login = async (req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email:email.toLowerCase(),});

    if(!user){
      return res.status(401).json({
        success:false,
        message:"Invalid email or password",
      });
    }

    const passwordMatch = bcrypt.compare(password,user.password);

    if(!passwordMatch){
      return res.status(401).json({
        success:false,
        message:"Invalid email or password",
      });
    }

    const token = generateToken(user._id.toString());

    return res.status(200).json({
      success:true,
      message: "Login successful",
      data:{
        user:{
          id:user._id,
          name:user.name,
          email:user.email,

        },
        token,
      },
    });
  } catch(err){
    console.error("Login error",err);
    return res.status(500).json({
      success:false,
      message:"Server error",
    });
    
  }
}

const getMe = async(req,res)=>{
  try{
    const user = await User.findById(req.user.id).select("-password");
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found",
      });
    }

    return resstatus(200).json({
      success:true,
      data:{
        user,
      },
    });
  } catch(err){
    return res.status(500).json({
      success:false,
      message:"Server error",
    });
  }
};

module.exports = {
  register,login,getMe,
};