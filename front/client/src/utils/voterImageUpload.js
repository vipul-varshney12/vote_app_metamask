import axios from "axios"
import {toast} from "react-hot-toast"

export const uploadFile = async(file)=>{
    try {
      const formData = new FormData()
      formData.append("file",file)
      const token = localStorage.getItem("token")
      const config ={
          headers:{
              'x-access-token':token
          } 
      }
      const res = await axios.post(`http://localhost:3000/api/postVoterImage`,formData,config)
      if(res.data.message==="Image Upload Succesfull!"){
        toast.success("Image uploaded successfully")
      }
    }
    catch(error){
       toast.error("Image Uplaod Failed!!!")
    }
  }