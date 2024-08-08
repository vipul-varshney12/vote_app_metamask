const express = require('express');
const router = express.Router();
const {authentication} = require("../middleware/authentication")
const CandidateModel = require('../models/Candidate')
const multerConfig = require('../config/multerConfig')
router.post('/postCandidateImage',authentication,multerConfig.uploadCandidate,async(req,res)=>{
    try{
        const {accountAddress}=req;
        const imageName = req.file.filename;
        await CandidateModel.create({
            accountAddress,
            imageName
        })
        res.status(201).json({message:"Image Upload Succesfull!"})
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Image Upload Failed!"})
    }
})
module.exports=router;