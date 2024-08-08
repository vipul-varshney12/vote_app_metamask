import { useRef,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3Context } from "../../context/useWeb3Context";
import { uploadFile } from "../../utils/voterImageUpload";
import {toast} from "react-hot-toast"
const VoterRegistration = () => {
  const {web3State} = useWeb3Context();
  const {contractInstance}=web3State; //const { contractInstance } = useContext(Web3Context);
  const [file,setFile]=useState("")
  const nameRef = useRef();
  const ageRef = useRef();
  const maleRef = useRef();
  const femaleRef = useRef();
  const otherRef = useRef();

  const token = localStorage.getItem("token")
  const navigateTo = useNavigate()
  useEffect(()=>{
    if(!token){
      navigateTo("/")
    }
  },[navigateTo,token])

  
  const handleVoterRegistration = async (e) => {
     try{
      e.preventDefault()
      const name = nameRef.current.value;
      const age = ageRef.current.value;
      let gender;
            if(maleRef.current.checked){
               gender=0
            }else if(femaleRef.current.checked){
               gender=1
            }else{
               gender=2
            }
      if(name==="" || gender==="" || age===""){
        throw new Error("Input fields cannot be empty!!!")
      }
      const tx = await contractInstance.voterRegister(name, age, gender);
      const receipt = await tx.wait(); 
      if(receipt.status===1){
         toast.success("Voter registration succesful")
         await uploadFile(file) 
      }      
      nameRef.current.value="";
      ageRef.current.value=""

    } catch (error) {
      if(error.message.includes("Voter Already Registered")){
         toast.error("Voter Already Registered")
      }else if(error.message.includes("You are not eligible")){
         toast.error("You are not eligible to vote")
      }else{
         toast.error("Voter Registration Failed")
      }
      console.error(error.message)
    }
  };
  
  return (
    <>
      <form onSubmit={handleVoterRegistration}>
        <label>Voter Name:</label>
        <input type="text" placeholder="Candidate Name" ref={nameRef} />

        <label>Voter Age:</label>
        <input type="text" placeholder="Candidate Age" ref={ageRef} />

        <label>Gender</label>
            <div>
                <input type="radio" id="male" name="gender" value="male" ref={maleRef} />
                <label htmlFor="male">Male</label>
            </div>
            <div>
                <input type="radio" id="female" name="gender" value="female" ref={femaleRef} />
                <label htmlFor="female">Female</label>
            </div>
            <div>
                <input type="radio" id="other" name="gender" value="other" ref={otherRef} />
                <label htmlFor="other">Other</label>
            </div>
        <br />
        <button type="submit">Voter Register</button>
      </form>
      <br></br>
      <input type="file" onChange={(e)=>setFile(e.target.files[0])}></input>
    </>
  );
};

export default VoterRegistration;
