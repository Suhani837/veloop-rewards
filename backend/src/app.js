const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
const captchaRoutes = require("./routes/captcha.routes");
app.use(express.json());

app.get("/api/health",(req,res)=>{
  res.status(200).json({
    success:true,
    message:"VELoop API is running"
  })
})

app.use("/api/auth",authRoutes);
app.use('/api/captcha',captchaRoutes);

module.exports = app;