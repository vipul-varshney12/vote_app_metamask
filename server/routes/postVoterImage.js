const express = require('express');
const router = express.Router();

const VoterModel = require('../models/Voter')
const multerConfig = require('../config/multerConfig')
const {authentication} = require("../middleware/authentication")

router.post('/postVoterImage',authentication,multerConfig.uploadVoter,async(req,res)=>{
   
    try{
        const {accountAddress}=req;
        const imageName = req.file.filename;
        await VoterModel.create({
            accountAddress,
            imageName
        })
        res.status(201).json({message:"Image Upload Succesfull!"})

    }catch(error){
        res.status(500).json({message:"Image Upload Failed!"})
    }
})
module.exports=router;