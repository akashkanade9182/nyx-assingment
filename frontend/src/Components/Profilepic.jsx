import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button, Box,Avatar
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import "../Styles/Profilepic.css"
import {updateProfilepic} from "../Redux/AppReducer/action"



const uploadPic=(payload)=>{
     return axios.post("https://api.cloudinary.com/v1_1/instacloude1995/image/upload",payload)
}
const Profilepic = ({_id,image}) => {
     const { isOpen, onOpen, onClose } = useDisclosure()
     const [pic, setPic] = useState([]);
  const [profpic, setProfpic] = useState("")
  const [url, setUrl] = useState();
  const [load,setLoad]=useState(false)
  const isLoading = useSelector(store => store.AppReducer.isLoading)
  const dispatch = useDispatch()
  let picLink = image[0]



  const loadfile = (event) => {
     var output = document.getElementById("profileimage");
     output.src = URL.createObjectURL(event.target.files[0]);
     output.onload = function () {
       URL.revokeObjectURL(output.src); // free memory
     };
   };
 
   const handleUpload = () => {
     let data = new FormData()
     data.append("file", profpic)
     data.append("upload_preset", "insta-clone")
     data.append("cloud_name", "instacloude1995")
     setLoad(true)
     uploadPic(data).then((r)=>{
          setUrl(r.data.url)
          setLoad(false)
          alert("file is uploaded")
     }).catch((e)=>{
          setLoad(false)
          alert("error in file upload")
     })
     
   }
 
   const handleUpdate=()=>{
     let pic=image;
     pic[0]=url
  let data={
    image:pic
  }
  dispatch(updateProfilepic(_id,data,onClose))
   }



  return (
   <>
    <Avatar size='xl' cursor= "pointer" onClick={onOpen}  src={picLink} />
        <Modal isOpen={isOpen} size={'sm'} onClose={onClose}>
          <ModalOverlay />
          <ModalContent >
            <ModalHeader>Select Profle picture</ModalHeader>
            <ModalCloseButton />
            <ModalBody display={"flex"} flexDirection={["column", "column", "column", "column"]}>
              <Box display={"flex"}  flexDirection={"column"} justifyContent >
               { isLoading? <img  style={{ width:"150px",height:"150px",margin:"auto"}} src="https://i.stack.imgur.com/kOnzy.gif" alt="" />:<img
                  id='profileimage'
                  style={{ cursor: "pointer"}} onClick={onOpen}
                  src={profpic?URL.createObjectURL(profpic):picLink}
                  alt=""
                />}
              </Box>
              <div className="profile-modal-inputbox">
                <input
                  style={{ padding: "10px 10px" }}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    loadfile(event);
                    setProfpic(event.target.files[0])
                  }}
                />


              </div>

            </ModalBody>

            <ModalFooter>
             {
               load?<div class="custom-loader"></div>:<Button colorScheme='blue' mr={3} onClick={handleUpload}>
               upload
             </Button>
             } 
              <Button variant='ghost' onClick={handleUpdate}>Update</Button>
            </ModalFooter>
          </ModalContent>
        </Modal></>
  )
}

export default Profilepic