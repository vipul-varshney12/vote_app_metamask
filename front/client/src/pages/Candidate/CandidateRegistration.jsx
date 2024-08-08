// import { Web3Context } from "../../context/web3Context";
// import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3Context } from "../../context/useWeb3Context";
import { uploadFile } from "../../utils/candidateImageUpload";
import {toast} from "react-hot-toast"
import "./CandidateRegistration.css"
const CandidateRegistration = () => {
    //const {contractInstance} = useContext(Web3Context)
    const token = localStorage.getItem("token")
    const navigateTo = useNavigate()
    useEffect(()=>{
      if(!token){
        navigateTo("/")
      }
    },[navigateTo,token])
    const {web3State} = useWeb3Context();
    const {contractInstance}=web3State;
    const [file,setFile]=useState("")
    const nameRef = useRef();
    const maleRef = useRef();
    const femaleRef = useRef();
    const otherRef = useRef();
    const ageRef = useRef();
    const partyRef = useRef();

    const handleCandidateRegistration = async(e)=>{
        try {
            e.preventDefault()
            const name = nameRef.current.value;
            const age = ageRef.current.value;
            const party = partyRef.current.value;
            let gender;
            
            if(maleRef.current.checked){
               gender=0
            }else if(femaleRef.current.checked){
               gender=1
            }else{
               gender=2
            }
            console.log(gender)
            if(name==="" || gender==="" || age==="" || party===""){
                throw new Error("Input fields cannot be empty!!!")
            }
            const tx = await contractInstance.candidateRegister(name, party,age,gender);
            const receipt = await tx.wait();
            if(receipt.status===1){
               toast.success("Candidate Registration Successful")
               await uploadFile(file)
            }
            nameRef.current.value="";
            ageRef.current.value="";
            partyRef.current.value=""     
        } catch (error) {
            toast.error("Candidate Registration Failed!!!")
            console.error(error.message)
        }
    }

    return ( <div>
        <form onSubmit={handleCandidateRegistration}>
            <label>Candidate Name:</label>
            <input type="text" placeholder="Candidate Name" ref={nameRef}></input>
            <label>Candidate Age:</label>
            <input type="text" placeholder="Candidate Age" ref={ageRef}></input>
            <label>Candidate Party:</label>
            <input type="text" placeholder="Candidate Party" ref={partyRef}></input>
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
             <br></br>
            <button type="submit">Register</button>
        </form>
        <br></br>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])}></input>
    </div>);
}
 
export default CandidateRegistration;


    // const uploadFile = async()=>{
    //     try {
    //         const formData = new FormData()
    //         formData.append("file",file)
    //         const config ={
    //             headers:{
    //                 'x-access-token':token
    //             } 
    //         }
    //         await axios.post(`http://localhost:3000/api/postCandidateImage`,formData,config)
    //     } catch (error) {
    //         toast.error("Image Uplaod Failed!!!")
    //     }
       
    // }
