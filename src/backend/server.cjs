const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors({
   origin:'http://localhost:5173',
   methods: ["GET", "POST", "OPTIONS"],
   allowedHeaders: ["Content-Type", "Authorization"]
}))
app.post("/countries", (req, res) => {
  res.sendFile(__dirname + "/countriesV3.json");
});
app.listen(3001,()=>{
    console.log('server online')
})