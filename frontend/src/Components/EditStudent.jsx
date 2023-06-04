import {DeleteIcon,EditIcon} from "@chakra-ui/icons"
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
import "../Styles/EditStudent.css"
import { getAllPost, updateRecord } from '../Redux/AppReducer/action'

const EditStudent = ({_id,name,email,age,mobile,branch,addYear,image}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const [amount, setAmount] = useState(0)


  const [n,setN]=useState(name)
  const [a,setA]=useState(age)
  const [b,setB]=useState(branch)
  const [aY,setAY]=useState(addYear);
  const [m,setM]=useState(mobile);
  const[e,setE]=useState(email);
  const isLoading=useSelector(store => store.AppReducer.isLoading)
  const dispatch = useDispatch();
  const toast = useToast()

const handleEdit=()=>{
  let data={name:n,
    email:e,
    age:a,
    branch:b,
    addYear:aY,
    mobile:m}
  dispatch(updateRecord(_id,data,onClose))
}



  return (
    <>
    <button onClick={()=>onOpen()}> <EditIcon/></button>
     <Modal isOpen={isOpen} size={["sm", "sm", "md", "md"]} onClose={onClose}>
           <ModalOverlay />
           <ModalContent >
             <ModalHeader>Fill Details</ModalHeader>
             <ModalCloseButton />
             <ModalBody display={"flex"} flexDirection={["column", "column", "column", "column"]}>
               <Box display={"flex"} p="15px 15px" w={["auto", "auto", "auto", "auto"]} className="scrollBox" border="1px solid black" h="450px" flexDirection={"column"}   >
               <Box  w="100%">
            

        <Input border="1px solid grey" mt="20px" value={n} placeholder=' enter name' onChange={(e) => setN(e.target.value)} />
        <Input border="1px solid grey" mt="20px" value={e} placeholder=' enter email' onChange={(e) => setE(e.target.value)} />
        <Input border="1px solid grey" mt="20px" value={a} placeholder=' enter age' onChange={(e) => setA(e.target.value)} />
        <Select border="1px solid grey"  mt="20px" value={b} placeholder="select branch" onChange={(e) => setB(e.target.value)}>
          <option value=""></option>
          <option value="Mechanical">Mechanical</option>
          <option value="Cs">Cs</option>
          <option value="Civil">Civil</option>
          <option value="Electrical">Electrical</option>
          <option value="Electronic">Electronic</option>

        </Select>
        <Input border="1px solid grey" mt="20px" value={aY} placeholder=' enter addmission year' onChange={(e) => setAY(e.target.value)} />
        <Input border="1px solid grey" mt="20px" value={m} placeholder=' enter mobile number' onChange={(e) => setM(e.target.value)} />
        <Button onClick={handleEdit} borderRadius={"10px"} mt="20px" bgColor="#339ce3" color="white" className="edit-btn">Edit</Button>

          
              

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

export default EditStudent