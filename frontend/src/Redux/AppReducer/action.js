import axios from "axios"
import * as types from "./actionType"




const getAllRecord=()=>(dispatch)=>{
   dispatch({type:types.GET_POST_REQUEST})
   return axios.get("https://nyx-bakcned1.onrender.com/records/getallrecords").then((r)=>{
    dispatch({type:types.GET_POST_SUCCESS,payload:r.data})
    console.log(r.data)
   }).catch((e)=>{
    dispatch({type:types.GET_POST_FAILURE})
   })
}

const updateRecord=(id,payload,onClose)=>(dispatch)=>{
  dispatch({type:types.PATCH_POST_REQUEST})
  return axios.patch(`https://nyx-bakcned1.onrender.com/records/update/${id}`,payload).then((r)=>{
    dispatch({type:types.PATCH_POST_SUCCESS,payload:r.data})
   onClose()
  }).catch((e)=>{
   console.log(e)
   alert("error in update")
   dispatch({type:types.PATCH_POST_FAILURE })
  })
}

const deleteRecord=(id)=>(dispatch)=>{
  dispatch({type:types.DELETE_POST_REQUEST})
  return axios.delete(`https://nyx-bakcned1.onrender.com/records/delete/${id}`).then((r)=>{
    dispatch({type:types.DELETE_POST_SUCCESS,payload:r.data})
   
   console.log("udpate data",r.data)
  }).catch((e)=>{
   console.log(e)
   dispatch({type:types.DELETE_POST_FAILURE})
  })
}


const updateProfilepic=(Id,payload,onClose)=>(dispatch)=>{
  dispatch({type:types.UPDATE_POST_REQUEST})
  return axios.patch(`https://nyx-bakcned1.onrender.com/records/updatepic/${Id}`,payload).then((r)=>{
    dispatch({type:types.UPDATE_POST_SUCCESS,payload:r.data})
    console.log(r.data)
    onClose()
    console.log("update successful")
   }).catch((e)=>{
    console.log(e)
    dispatch({type:types.UPDATE_POST_FAILURE})
   })


  }






 


  



export {getAllRecord,updateRecord,deleteRecord,updateProfilepic}