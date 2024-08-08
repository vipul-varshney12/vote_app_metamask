import { ethers } from "ethers";
import { useRef } from "react";
import {toast} from "react-hot-toast";
const SellToken = ({contractInstance,erc20ContractInstance}) => {
    const sellTokenAmountRef = useRef()
    const approveTokenAmountRef = useRef()
    const sellToken = async(e)=>{
      try {
        e.preventDefault()
        const tokenValueEth = sellTokenAmountRef.current.value;
        const tokenValueWei = ethers.parseEther(tokenValueEth,18);
        const tx = await contractInstance.sellGLDToken(tokenValueWei)
        const reciept = await tx.wait()
        toast.success("Transaction Successful")
      } catch (error) {
         console.error(error.message)
         toast.error("Transaction Failed")
      }
      
    }
    const approveToken = async(e)=>{
        try {
          e.preventDefault()
          const tokenValueEth = approveTokenAmountRef.current.value;
          const tokenValueWei = ethers.parseEther(tokenValueEth,18);
          const tokenMarketPlace = "0x3e492dd46004fba4f8f8a69fa25154a2bcaf787f"
          const tx = await erc20ContractInstance.approve(tokenMarketPlace,tokenValueWei)
          const reciept = await tx.wait()
          toast.success("Transaction Successful")     
        } catch (error) {
          console.error(error.message)
          toast.error("Contract Instance Not Ready")
        }
     }
    return ( <>
    <form onSubmit={sellToken}>
      <label>Token Amount To Sell:</label>
      <input type="text" ref={sellTokenAmountRef} placeholder="Number of tokens to sell"></input>
      <button type="submit">Sell Token</button>
    </form>
    <form onSubmit={approveToken}>
      <label>Token Amount To Approve(In Eth):</label>
      <input type="text" ref={approveTokenAmountRef} placeholder="Number of tokens to approve"></input>
      <button type="submit">Approve Token</button>
    </form>
    </>);
}
 
export default SellToken;