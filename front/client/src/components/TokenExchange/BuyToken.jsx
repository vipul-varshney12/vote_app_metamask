import { ethers } from "ethers";
import { useRef } from "react";
import {toast} from "react-hot-toast";
const BuyToken = ({contractInstance}) => {
    const tokenAmountRef = useRef()
    const buyToken = async(e)=>{
      try {
        e.preventDefault()
        const numberOfTokens = tokenAmountRef.current.value;
        const numberOfTokens18Decimals = ethers.parseUnits(numberOfTokens,18);
        const tokenPriceWei = await contractInstance.tokenPrice();
        const totalPriceOfTokens = tokenPriceWei*BigInt(numberOfTokens)
        const tx = await contractInstance.buyGLDToken(numberOfTokens18Decimals,{value:totalPriceOfTokens})
        const reciept = await tx.wait()
        toast.success("Transaction Successful")  
      } catch (error) {
          console.error(error.message)
          toast.error("Contract Instance Not Ready")
      }
    }
    return ( <>
    <form onSubmit={buyToken}>
      <label>Token Amount To Buy:</label>
      <input type="text" ref={tokenAmountRef} placeholder="Number of tokens to buy"></input>
      <button type="submit">Buy Token</button>
    </form>
    </>);
}
 
export default BuyToken;