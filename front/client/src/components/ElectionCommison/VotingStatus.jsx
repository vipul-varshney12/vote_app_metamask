import { useEffect,useState } from "react";
import { useWeb3Context } from "../../context/useWeb3Context";
import {toast} from "react-hot-toast"
const VotingStatus = () => {
    const {web3State}=useWeb3Context();
    const {contractInstance}=web3State;
    const [status,setStatus]=useState("Not Started")
    useEffect(()=>{
        const showVotingStatus = async()=>{
            try {
                const status = await contractInstance.votingStatus();
                const statusInString = String(status);
                if(statusInString==="0"){
                    setStatus("Not started")
                }else if(statusInString==="1"){
                    setStatus("Started")
                }else{
                    setStatus("Ended")
                }     
            } catch (error) {
                toast.error("Error fetching the voting status")
                console.error(error.message)
            }
        }
        contractInstance && showVotingStatus();
    },[contractInstance])

    return ( 
    <>
      <p>Voting Status:{status}</p>
    </> );
}
 
export default VotingStatus;