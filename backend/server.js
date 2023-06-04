const express=require("express")
const cors=require("cors");

const connection=require("./Config/db");
const RecordModel=require("./Models/Record.model")
const RecordRoute=require("./Routes/Record.route")

const app=express()
app.use(express.json());
app.use(cors({
     origin:"*"
}))


app.use("/records",RecordRoute);

app.listen(8000,async()=>{
     try{
          await connection;
          console.log("server is running on port 8000")

     }
     catch{
          console.log("error in server running")
     }
})

