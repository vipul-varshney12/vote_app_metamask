import { useWeb3Context } from "../../context/useWeb3Context";
import {toast} from "react-hot-toast"
const AnnounceResult = () => {
    const {web3State}=useWeb3Context();
    const {contractInstance}=web3State;

    const announceResult = async()=>{
        try {
            const tx = await contractInstance.result();
            const reciept = await tx.wait()
            toast.success("Result Announced")
        } catch (error) {
            toast.error("Error start the vote")
            console.error(error.message)
        }
   
    }
    return ( <button onClick={announceResult}>Announce Result</button> );
}
 
export default AnnounceResult;