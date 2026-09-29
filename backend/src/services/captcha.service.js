const crypto = require("crypto");
const CptchaChallenge = require("../models/CaptchaChallenge");
const CaptchaChallenge = require("../models/CaptchaChallenge");

const generateRandomString = (length = 6)=>{
  const characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789";
  let result = "";
  for(let i=0;i<length;i++){
    result+=characters.charAt(Math.floor(Math.random()*characters.length));

  }
  return result;

};

const shuffleArray = (array)=>{
  return [...array].sort(()=> Math.random()-0.5);
};

const generateCaptchaChallenge = async (userId)=>{
  const captchaText = generateRandomString(6);
  const similarWrongOption1 = generateRandomString(6);
  const similarWrongOption2 = generateRandomString(6);

  let differentOption = generateRandomString(6);

  while(
    differentOption === captchaText || differentOption === similarWrongOption1 || differentOption === similarWrongOption2
  ){
    differentOption = generateRandomString(6);
  }
  const options = shuffleArray([
    captchaText,
    similarWrongOption1,
    similarWrongOption2,
    differentOption,
  ]);

  const challenge = await CaptchaChallenge.create({
    challengeId: crypto.randomUUID(),
    userId,
    captchaText,
    options,
    correctOption: captchaText,
    status:"active",
    expiresAt: new Date(Date.now()+2*60*1000),
  });
  return challenge;
}

module.exports = {
  generateCaptchaChallenge,
}