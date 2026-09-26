const mongoose=require("mongoose");
const connectdb = async ()=>{
  try{
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${connection.connect.host}`);
    
  } catch(err){
    console.error(`MongoDB connection failed: ${err.message}`);
    process.exit(1);
    
  }
};
module.exports=connectdb;