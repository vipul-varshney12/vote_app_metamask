import AnnounceResult from "../../components/ElectionCommison/AnnounceResult";
import DisplayWinner from "../../components/ElectionCommison/DisplayWinner";
import VotingStartForm from "../../components/ElectionCommison/VotingStartForm";
import VotingStatus from "../../components/ElectionCommison/VotingStatus";
import EmergencyDeclare from "../../components/ElectionCommison/EmergencyDeclare"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ElectionCommision = () => {
    const token = localStorage.getItem("token")
    const navigateTo = useNavigate()
    useEffect(()=>{
      if(!token){
        navigateTo("/")
      }
    },[navigateTo,token])
    return ( <>
     <VotingStatus/>
     <br></br>
     <DisplayWinner/>
     <br></br>
     <VotingStartForm/> 
     <br></br>
     <AnnounceResult/>
     <br></br>
     <EmergencyDeclare/>
    </>);
}
 
export default ElectionCommision;