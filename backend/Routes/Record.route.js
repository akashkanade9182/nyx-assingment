const express = require("express")

const RecordModel=require("../Models/Record.model");


const RecordRoute=express.Router()

RecordRoute.post("/newstudent", async (req, res) => {
console.log(req.body)
     if (!req.body.name || !req.body.email || !req.body.age || !req.body.branch || !req.body.addYear || !req.body.mobile ||!req.body.image) {
          res.status(422).json({ error: "Please add all the fields" })
     }
     const { name,email, age, branch, addYear,mobile,image } = req.body;


     try {
          const user = new RecordModel({ name,email,age,branch,addYear,mobile,image:[image] })
                    await user.save();
                    res.status(200).send("Record Added Succefully") 

     }
     catch (err) {
          console.log(err)
          res.status(400).send("error in Record  Adding")
     }

})

RecordRoute.get("/getallrecords",async(req,res)=>{
     try{
          let list=await RecordModel.find()
         return res.status(200).send(list.reverse()) 
     }
     catch(err){
          console.log(err)
         return res.status(400).send("error in getting records") 
     }
})

RecordRoute.patch("/update/:id", async (req, res) => {
     const Id=req.params.id
     try {
        let data= await RecordModel.findByIdAndUpdate({_id:Id},req.body)
        let list=await RecordModel.find()

        return  res.status(200).send(list.reverse()) 
     }
     catch (err) {
          console.log(err)
         return res.status(400).send("error in Record udpate")
     }

})

RecordRoute.patch("/updatepic/:id", async (req, res) => {
     const Id=req.params.id;
     
     try {
        let data= await RecordModel.findByIdAndUpdate({_id:Id},req.body)
        let list=await RecordModel.find()

        return  res.status(200).send(list.reverse()) 
     }
     catch (err) {
          console.log(err)
         return res.status(400).send("error in Record udpate")
     }

})

RecordRoute.delete("/delete/:id", async (req, res) => {
     const Id=req.params.id
     try {
        let data= await RecordModel.findByIdAndRemove({_id:Id})
        let list=await RecordModel.find()

        return  res.status(200).send(list.reverse()) 
     }
     catch (err) {
          console.log(err)
         return res.status(400).send("error in Record deleting")
     }

})

module.exports=RecordRoute