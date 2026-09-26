require('dotenv').config();
const app = require('./src/app')
const PORT = process.env.PORT ;
const connectdb = require('./src/config/db');
const dns = require("dns");
dns.setServers(["1.1.1.1"]);

const startServer = async ()=>{
  await connectdb();

  app.listen(PORT, ()=>{
  console.log(`VELoop API is running on port ${PORT}`);
  
});
};

startServer();



