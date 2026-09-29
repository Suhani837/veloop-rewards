const mongoose = require("mongoose");
const captchaChallengeSchema = new mongoose.Schema({
  challengeId:{
    type:String,
    required:true,
    unique:true,
    index:true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    index:true
  },
  captchaText:{
    type:String,
    required:true,
  },
  options:{
    type:[String],
    required:true,
    validate:{
      validator:(value)=>value.length === 4,
      message:"CAPTCHA must have exactly 4 options",
    },
  },
  correctOption:{
    type:String,
    required:true,
  },
  status:{
    type:String,
    enum:["active","completed","expired"],
    default:"active",
  },
  expiresAt:{
    type:Date,
    required:true,
    index:true,
  },
  
},{
  timestamps:true,
});

module.exports = mongoose.model("CaptchaChallenge",captchaChallengeSchema);