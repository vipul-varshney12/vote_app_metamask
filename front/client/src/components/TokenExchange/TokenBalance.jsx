import {ethers}  from "ethers";
import { useEffect,useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import {toast} from "react-hot-toast";
const TokenBalance = ({erc20ContractInstance}) => {
    const {web3State}=useWeb3Context()
    const {selectedAccount}=web3State
    const [userTokenBalance,setUserTokenBalance]=useState("0")
    useEffect(()=>{
        const fetchTokenBalance = async()=>{
            try {
                const tokenBalanceWei = await erc20ContractInstance.balanceOf(selectedAccount)
                const tokenBalanceEth = ethers.formatEther(tokenBalanceWei)
                const formattedEther = parseFloat(tokenBalanceEth).toFixed(3)
                setUserTokenBalance(formattedEther)      
            } catch (error) {
                console.error(error.message)
                toast.error("Failed to fetch the balance")
            }
        } 
        erc20ContractInstance && fetchTokenBalance()
    },[erc20ContractInstance,selectedAccount])
    return (<>Token Balance:{userTokenBalance}</>);
}
 
export default TokenBalance;