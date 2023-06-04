import React, { useEffect, useState } from 'react'
import {
  Modal,Select,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button, Box, Avatar, Input
} from '@chakra-ui/react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux"
import { useToast } from '@chakra-ui/react'
import "../Styles/AddStudent.css"
import { getAllRecord } from '../Redux/AppReducer/action'

const postCloude = (payload) => {
     return axios.post("https://api.cloudinary.com/v1_1/instacloude1995/image/upload", payload)
   }
   
   const postMongo = (payload) => {
     return axios.post("http://localhost:8000/records/newstudent",payload)
     
   }
   


const AddStudent = () => {
     const { isOpen, onOpen, onClose } = useDisclosure()
     // const [amount, setAmount] = useState(0)
     const isLoading=useSelector(store => store.AppReducer.isLoading)
     const dispatch = useDispatch();
     const toast = useToast()
     const [image, setImage] = useState("")
     const [name,setName]=useState("")
     const [age,setAge]=useState("")
     const [branch,setBranch]=useState("")
     const [addYear,setAddYear]=useState("");
     const [mobile,setMobile]=useState("");
     const[email,setEmail]=useState("");
     const [url, setUrl] = useState("");
     const[load,setLoad]=useState(false)
   
     const handleClick = () => {
       onOpen()
     }
   
  const loadfile = (event) => {
     var output = document.getElementById("output");
     output.src = URL.createObjectURL(event.target.files[0]);
     output.onload = function () {
       URL.revokeObjectURL(output.src); // free memory
     };
   };
   //imgae posting to cloud
   const postDetails = () => {
     let data = new FormData()
     data.append("file", image)
     data.append("upload_preset", "insta-clone")
     data.append("cloud_name", "instacloude1995")
     setLoad(true)
     postCloude(data).then((r) => {
       setUrl(r.data.url)
       setLoad(false)
       console.log(r.data.url)
     }).catch((e) => {
       console.log(e)
       setLoad(false)
     })
 
  console.log(name,email,age,mobile,branch,addYear)
  
 
   }
     useEffect(() => {
          if (url) {
               let data={name,email,addYear,age,branch,mobile,image:url}
               
       setLoad(true)
           postMongo(data).then((r)=>{
            toast({
              position: 'top-center',
              render: () => (
                <div style={{backgroundColor:" #272150",borderRadius:"9px" ,display:"flex",justifyContent:"space-around",alignItems:"center",width:"400px",padding:"10px 10px" ,height:"50px",color:"white"}}>
               new Post added successfully
                </div>
              ),
            })
            setLoad(false)
           onClose()
           dispatch(getAllRecord())
            console.log("mongoupload success",r.data)
           }).catch((e)=>{
               setLoad(false)
            toast({
              position: 'top-center',
              render: () => (
                <div style={{backgroundColor:" red" ,color:"white"}}>
                 file upload failed
                </div>
              ),
            })
            console.log("mongo upload failer",e)
           })
          }
          else{
               console.log("cloud upload fail")
          }
      
      
        }, [url])
   
     return (
       <>
      
         <button className="deposit-btn" onClick={handleClick}   >Add New Student</button>
   
       
   
         <Modal isOpen={isOpen} size={["sm", "sm", "md", "2xl"]} onClose={onClose}>
           <ModalOverlay />
           <ModalContent >
             <ModalHeader>Fill Details</ModalHeader>
             <ModalCloseButton />
             <ModalBody display={"flex"} flexDirection={["column", "column", "column", "column"]}>
               <Box display={"flex"} p="15px 15px" w={["auto", "auto", "auto", "auto"]} className="scrollBox" border="1px solid black" h="400px" flexDirection={"column"}   >
               <Box display="flex" w="100%">
                    <Box w="50%" display="flex" flexDirection={"column"} alignItems={"center"}>
                    <img
          id="output"
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
          alt="error"
        />
      <input
          style={{ padding: "10px 10px" }}
          type="file"
          id="image-input"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0])
          }}
        />
       {
        load?<div class="custom-loader"></div>: <button className="deposit-btn" style={{margin:"auto"}} onClick={postDetails}>Add Student</button>
       }
                    </Box>
                    
        <Box w="50%">
        <Input border="1px solid grey" mt="20px" value={name} placeholder=' enter name' onChange={(e) => setName(e.target.value)} />
        <Input border="1px solid grey" mt="20px" value={email} placeholder=' enter email' onChange={(e) => setEmail(e.target.value)} />
        <Input border="1px solid grey" mt="20px" value={age} placeholder=' enter age' onChange={(e) => setAge(e.target.value)} />
        <Select border="1px solid grey"  mt="20px" placeholder="select branch" onChange={(e) => setBranch(e.target.value)}>
          <option value="Mechanical">Mechanical</option>
          <option value="Cs">Cs</option>
          <option value="Civil">Civil</option>
          <option value="Electrical">Electrical</option>
          <option value="Electronic">Electronic</option>

        </Select>
        <Input border="1px solid grey" mt="20px" value={addYear} placeholder=' enter addmission year' onChange={(e) => setAddYear(e.target.value)} />
        <Input border="1px solid grey" mt="20px" value={mobile} placeholder=' enter mobile number' onChange={(e) => setMobile(e.target.value)} />


          
          </Box>          

               </Box>
     
        
   
     
    
               </Box>
   
   
             </ModalBody>
   
             <ModalFooter>
   
             </ModalFooter>
           </ModalContent>
         </Modal>
       </>
     )
}

export default AddStudent