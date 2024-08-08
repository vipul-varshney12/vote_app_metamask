require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
const connectDB = require('./db/connect')
const candidatePostImageRoutes = require('./routes/postCandidateImage')
const voterPostImageRoutes = require('./routes/postVoterImage')
const authenticationRoutes = require("./routes/authenticationRoute")

const path = require('path')

connectDB(process.env.MONGO_URL).then(()=>console.log("Connected to DB"))

app.use(cors())
app.use(express.json())

app.use('/images',express.static(path.join(__dirname,'votingSystem')))

app.use('/api',authenticationRoutes)
app.use('/api',candidatePostImageRoutes)
app.use('/api',voterPostImageRoutes)

app.listen(3000,()=>{
    console.log("Server is running at port 3000")
})

