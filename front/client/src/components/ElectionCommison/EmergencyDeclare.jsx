import { useWeb3Context } from "../../context/useWeb3Context";
import {toast} from "react-hot-toast"
const EmergencyDeclare = () => {
    const {web3State}=useWeb3Context();
    const {contractInstance}=web3State;

    const emergencyDeclared = async()=>{
        try {
            const tx = await contractInstance.emergency();
            const receipt = await tx.wait()
            toast.success("Emergency Declared")
        } catch (error) {
            toast.error("Error fetching the voting status")
            console.error(error.message)
        }

    }
    return ( <button onClick={emergencyDeclared}>Emergency</button> );
}
 
export default EmergencyDeclare;