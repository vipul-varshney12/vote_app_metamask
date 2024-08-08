import BuyToken from "../../components/TokenExchange/BuyToken";
import SellToken from "../../components/TokenExchange/SellToken";
import TokenBalance from "../../components/TokenExchange/TokenBalance";
import TokenPrice from "../../components/TokenExchange/TokenPrice";
import { useWeb3Context } from "../../context/useWeb3Context";
import { useEffect,useState } from "react";
import tokenExchangeAbi from "../../constants/tokenExchangeAbi.json"
import erc20abi from "../../constants/erc20abi.json"
import { ethers } from "ethers";

//founder - 0x4653CeA34af4B3cF4B27C912A5BBEE015b9E7Fb0
const TokenExchange = () => {
    const [tokenExchangeContractInstance,setTokenExchangeContractInstance]=useState(null)
    const [erc20ContractInstance,setErc20ContractInstance]=useState(null)
    const {web3State}=useWeb3Context()
    const {signer,provider}=web3State;
    useEffect(()=>{
        const erc20TokenInit = ()=>{
            const contractAddress = "0x9652f745e87C122E3263a2B0316D6EfE6865a49E"
            const erc20ContractInstance = new ethers.Contract(contractAddress,erc20abi,provider)
            setErc20ContractInstance(erc20ContractInstance)
        }
        provider && erc20TokenInit()
    },[provider])
    
    useEffect(()=>{
        const tokenExchangeInit= ()=>{
          const tokenExchangeContractAddress = "0x3e492dd46004fba4f8f8a69fa25154a2bcaf787f";
          const tokenExchangeContractInstance = new ethers.Contract(tokenExchangeContractAddress,tokenExchangeAbi,signer)
          setTokenExchangeContractInstance(tokenExchangeContractInstance)
        }
        signer && tokenExchangeInit()
    },[signer])

    return (
    <>
     <TokenBalance erc20ContractInstance={erc20ContractInstance}/>
     <br/>
     <TokenPrice contractInstance ={tokenExchangeContractInstance}/>
     <br/>
     <BuyToken contractInstance ={tokenExchangeContractInstance}/>
     <br/>
     <SellToken erc20ContractInstance={erc20ContractInstance} contractInstance ={tokenExchangeContractInstance}/>
     
    </>);
}
 
export default TokenExchange;