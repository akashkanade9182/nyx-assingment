import {useState,useEffect} from "react"
import {Box,Avatar,Heading,SimpleGrid} from "@chakra-ui/react"
import {useSelector,useDispatch} from "react-redux"
import {DeleteIcon} from "@chakra-ui/icons"
import "../Styles/Home.css"
import Load from "../Components/Load"
import AddStudent from "../Components/AddStudent"
import { getAllRecord,deleteRecord } from "../Redux/AppReducer/action"
import EditStudent from "../Components/EditStudent"
import Profilepic from "../Components/Profilepic"
const Home=()=>{
     const data=useSelector(store=>store.AppReducer.data);
     const isLoading=useSelector(store=>store.AppReducer.isLoading);
     const dispatch=useDispatch()

   


useEffect(()=>{
dispatch(getAllRecord())
},[])

const handleDelete=(id)=>{
dispatch(deleteRecord(id))
}

     return (
          <Box w="100%" >
            <Box w="100%" bgColor="#339ce3">
            <Heading color="white" textAlign={"center"}>STUDENT RECORDS</Heading>

            </Box>
               <div className="listbox">
        <div className="listhead">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="36" height="36" viewBox="0 0 24 24" stroke-width="2" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l16 0" />
              <path d="M4 18l16 0" />
            </svg> <span style={{ marginLeft: "10px", fontSize: "25px", fontWeight: "bold" }}>Student list</span>
          </div>
          <div className='btn-box'>
               <AddStudent/>
       
      
          </div>

        </div>
        <Box w="100%" h="auto" mt="20px" borderTop="1px solid black">
          <Box w="100%" bgColor="#d2d9d4" borderBottom={"1px solid black"} display="flex" justifyContent={"space-around"} alignItmes="center">
          <Box w="12%" fontSize={["12px", "18px", "20px", "25px"]} >picture</Box>
            <Box w="12%" fontSize={["12px", "18px", "20px", "25px"]} >name</Box>
            <Box w="12%" fontSize={["12px", "18px", "20px", "25px"]} >branch</Box>
            <Box w="12%" fontSize={["12px", "18px", "20px", "25px"]} >Addmission year</Box>
            <Box w="12%" fontSize={["12px", "18px", "20px", "25px"]}>Age</Box>
            <Box w="12%" fontSize={["12px", "18px", "20px", "25px"]} >Email</Box>
            <Box w="12%" fontSize={["12px", "18px", "20px", "25px"]} >Mobile No.</Box>
            <Box w="12%" fontSize={["12px", "18px", "20px", "25px"]} ></Box>

          </Box>
          {isLoading?<Load/>: data.length === 0 ? <h4 style={{ fontSize: "25px", marginTop: "20px" }}>... No Student</h4> : data.map((ele, index) => (
              <SimpleGrid bgColor={index % 2 !== 0 ? "#d2d9d4" : "white"} w="100%" minChildWidth="200px" display="flex" justifyContent={"space-around"} alignItems="center">
                <Box w="12%" p="10px 0" fontSize={["12px", "18px", "20px", "20px"]}>
                <Profilepic {...ele}/>
                </Box>
                <Box w="12%" fontSize={["12px", "18px", "20px", "20px"]}>{ele.name}</Box>
                <Box w="12%" fontSize={["12px", "18px", "20px", "20px"]} >{ele.branch}</Box>
                <Box w="12%" fontSize={["12px", "18px", "20px", "20px"]} > { ele.addYear}</Box>
                <Box w="12%" fontSize={["12px", "18px", "20px", "20px"]}>{ele.age}</Box>
                <Box w="12%" fontSize={["12px", "18px", "20px", "20px"]} > { ele.email}</Box>
                <Box w="12%" fontSize={["12px", "18px", "20px", "20px"]}>{ele.mobile}</Box>
                <Box w="12%" display="flex" justifyContent={"space-around"} alignItems={"center"}>
                  <EditStudent {...ele}/>
                  <button onClick={()=>handleDelete(ele._id)}>
                  <DeleteIcon/>
                  </button>
                </Box>

              </SimpleGrid>
            ))
          }
        </Box>

      </div>



          </Box>
     )
}

export default Home