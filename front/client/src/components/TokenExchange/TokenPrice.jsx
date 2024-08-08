import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {toast} from "react-hot-toast";
const TokenPrice = ({contractInstance}) => {
   const [tokenPrice,setTokenPrice]=useState(null)
    useEffect(()=>{
        const fetchTokenPrice = async()=>{
            try {
                const tokenPriceWei = await contractInstance.tokenPrice();
                const tokenPriceEth = ethers.formatEther(tokenPriceWei)
                const formattedEther = parseFloat(tokenPriceEth).toFixed(3)
                setTokenPrice(formattedEther)
            } catch (error) {
                 console.error(error.message)
                 toast.error("Token Price Fetch Failed")
            }
        }
        contractInstance && fetchTokenPrice()
    },[contractInstance])
    return ( <>Token Price: {tokenPrice} eth</> );
}
 
export default TokenPrice;