import { useWeb3Context } from "../../context/useWeb3Context";
import { useEffect, useRef, useState } from "react";
import {toast} from "react-hot-toast"
import "./VoterProfile.css";

const VoterProfile = () => {
  const [voterProfile, setVoterProfile] = useState([]);
  const [voterProfileId, setVoterProfileId] = useState("Not Registered");
  const voterIdRef = useRef();
  const castVoterIdRef = useRef();
  const candidateIdRef = useRef();
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  

  useEffect(()=>{
    const fetchVoterProfile = async()=>{
      try {
        const voterProfileId = await contractInstance.getVoterId();
        if(String(voterProfileId)!=="0"){
          const voterProfile = await contractInstance.getVoterProfile(voterProfileId);
          setVoterProfile(voterProfile); 
          setVoterProfileId(voterProfileId);
        }   
    } catch (error) {
        toast.error("Error fetching the voter profile id!")
        console.error("Error fetching the voter profile id", error.message)
     }
    }
    contractInstance && fetchVoterProfile()
  },[contractInstance])
  // const fetchVoterProfile = async (e) => {
  //   try {
  //       e.preventDefault();
  //       const voterId = voterIdRef.current.value;
  //       console.log(voterId)
  //       const voterProfile = await contractInstance.getVoterProfile(voterId);
  //       console.log(voterProfile)
  //       setVoterProfile(voterProfile);   
  //   } catch (error) {
  //       toast.error("Error fetching the voter profile!Make sure to input the right voter Id!")
  //       console.error("Error fetching the voter profile", error.message)
  //   }
  // };

  const castVote = async(e) =>{
    try {
       e.preventDefault()
       const voterId = castVoterIdRef.current.value;
       const candidateId = candidateIdRef.current.value;
       console.log(voterId,candidateId)
       const tx = await contractInstance.vote(voterId,candidateId);
       const receipt = tx.wait()
       toast.success("Vote succesfull!!!")
    } catch (error) {
      if(error.message.includes("Not enough tokens")){
        toast.error("You do not have enough token balance!")
      }else{
        console.error(error.message)
      }
    }
  }

  return (
    <> 
      <p>VoterProfileId:{String(voterProfileId)}</p>
      {voterProfile.length !== 0 && (
        <table className="voter-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Voter Address</th>
              <th>Voter Image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{voterProfile[0]}</td>
              <td>{String(voterProfile[1])}</td>
              <td>{
                  String(voterProfile[3])==="0"?("Male"):
                  (String(voterProfile[2])==="1"?"Female":"Others")
                 }
              </td>
              <td>{String(voterProfile[5])}</td>
              <td className="voter-list-table-data">
                <img
                  width={"70px"}
                  height={"70px"}
                  src={`http://localhost:3000/images/VoterImages/${String(
                    voterProfile[5]
                  )}.png`}
                  alt="Voter Image"
                  className="voter-image"
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* <form onSubmit={fetchVoterProfile}>
        <label>Voter Id:</label>
        <input
          type="text"
          placeholder="voter Id"
          ref={voterIdRef}
          className="form-input"
        />
        <button type="submit" className="form-button">Get Profile</button>
      </form> */}
      <form onSubmit={castVote}>
        <label>
          Voter Id:
        </label>
        <input type="text" ref={castVoterIdRef}></input>
        <label>
          Candidate Id:
        </label>
        <input type="text" ref={candidateIdRef}></input>
        <button type="submit" className="form-button">Cast Vote</button>
      </form>
    </>
    
  );
};

export default VoterProfile;
