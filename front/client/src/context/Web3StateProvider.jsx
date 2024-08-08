import { useState,useEffect } from "react";
import { getWeb3State } from "../utils/web3States";
import { handleAccountChange } from "../utils/handleAccountChange";
import { handleChainChange } from "../utils/handleChainChange";
import { Web3Context } from "./web3Context";
const Web3StateProvider = ({children}) => {

    const [web3State,setWeb3State]=useState({
        contractInstance:null,
        chainId:null,
        selectedAccount:null,
        electionCommissionStatus:null,
        provider:null,
        signer:null
    })
    const handleWallet= async()=>{
      try {
        const {contractInstance,chainId,selectedAccount,electionCommissionStatus,provider,signer}= await getWeb3State();
        setWeb3State({contractInstance,chainId,selectedAccount,electionCommissionStatus,provider,signer})
      } catch (error) {
        console.error("Wallet connection failed",error.message)
      }
      
    }
    useEffect(()=>{
        window.ethereum.on('accountsChanged',()=>handleAccountChange(handleWallet))
        window.ethereum.on('chainChanged',()=>handleChainChange(setWeb3State))
        
        return()=>{
            window.ethereum.removeListener('accountsChanged',()=>handleAccountChange(setWeb3State))
            window.ethereum.removeListener('accountsChanged',()=>handleAccountChange(setWeb3State))
        }
    },[])
    return ( 
    <div>
      <Web3Context.Provider value={{web3State,handleWallet}}>
        {children}
      </Web3Context.Provider>
      
    </div> 
    );
}
 
export default Web3StateProvider;