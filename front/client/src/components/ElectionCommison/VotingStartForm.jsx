import { useWeb3Context } from "../../context/useWeb3Context";
import { useRef } from "react";
import {toast} from "react-hot-toast"
const VotingStartForm = () => {
    const {web3State}=useWeb3Context();
    const {contractInstance}=web3State;
    const startTimeRef = useRef();
    const endTimeRef=useRef()

    const timeInSeconds = (time)=>{
      const date = new Date(time)
      return Math.floor(date.getTime()/1000)
    }
    const handleVotingTime = async(e)=>{
      e.preventDefault();
      const startTime = startTimeRef.current.value;
      const endTime = endTimeRef.current.value;
      
      const startTimeSec = timeInSeconds(startTime)
      const endTimeSec = timeInSeconds(endTime)
      try {
        const tx = await contractInstance.voteTime(startTimeSec,endTimeSec)
        const receipt = tx.wait()
        toast.success("Voting Started")
      } catch (error) {
        toast.error("Error start the vote")
        console.error(error.message)
      }
 
    }
    return (
    <>
      <div>
           <form className="election-form" onSubmit={handleVotingTime}>
            <label htmlFor="start">Start Time</label>
            <input type="datetime-local" id="start" ref={startTimeRef}required />

            <label htmlFor="end">End Time</label>
            <input type="datetime-local" id="end" ref={endTimeRef} required />

            <button className="regBtn" type="submit">
              Voting Start
            </button>
          </form>
        </div>
    </>);
}
 
export default VotingStartForm;