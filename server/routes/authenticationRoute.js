const { ethers } = require('ethers');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')


router.post("/authentication",(req,res,next)=>{
  const {accountAddress} = req.query;
  const {signature}=req.body;
  const electionCommission = "0xa2c8345b30B4c26e118F307269dE96913DbdB4bC"
  if(!signature || !accountAddress){
    return res.status(500).json({message:"Authentication Failed!"})
  }
  const authenticationMessage ="You accept the terms and conditions of voting dapp"
  const recoveredAddress = ethers.utils.verifyMessage(authenticationMessage,signature)
  if(recoveredAddress.toLowerCase()===accountAddress.toLowerCase()){
    const token = jwt.sign({accountAddress},'secretkey')
    const electionCommissionStatus = recoveredAddress.toLowerCase()===electionCommission.toLocaleLowerCase()?true:false
    return res.status(200).json({message:"Authentication Successful",token:token,electionCommissionStatus:electionCommissionStatus})
  }
  return res.status(500).json({message:"Authentication Failed!"})
})
module.exports=router;