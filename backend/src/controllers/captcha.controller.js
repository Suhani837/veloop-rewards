const {generateCaptchaChallenge,} = require("../services/captcha.service");

const createCaptcha = async (req,res)=>{
  try{
    const challenge = await generateCaptchaChallenge(req.user.id);

    return res.status(201).json({
      success:true,
      message:"CAPTCHA created successsfully",
      data:{
        challengeId:challenge.id,
        captchaText: challenge.captchaText,
        options: challenge.options,
        expiresAt: challenge.expiresAt,
      },
    });
  } catch(err){
    console.error("Create CAPTCHA error:", err);
    return res.status(500).json({
      success:false,
      message:"Server error",
    });
    
  }

}

module.exports = {createCaptcha};