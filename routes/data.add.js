const express=require("express")
const dataRouter=express.Router()
const {dataModel}=require("../user.model.js/data.model")

dataRouter.post("/adddata", async (req, res) => {
    try {
        const data=new dataModel(req.body);
        await data.save();
        console.log(req.body)
        res.status(200).send({ "msg": "A new Note has been added" })

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})

dataRouter.patch("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true }; // To return the modified document rather than the original
        const updatedData = await dataModel.findByIdAndUpdate(id, updates, options);
        
        if (!updatedData) {
            return res.status(404).send({ "msg": "Data not found" });
        }

        res.status(200).send({ "msg": "Data has been updated", "data": updatedData });

    } catch (err) {
        res.status(400).send({ "msg": err.message });
    }
});
dataRouter.get("/get", async(req,res)=>{
    let query=req.query;
    try {
        const data= await dataModel.find(query)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

dataRouter.get("/alldata", async(req,res)=>{
    const name=req.query.name;
    if(name){
        let data=await dataModel.find ({"name":{$regex:name,$options:'i'}});
        res.send(data);
    }else{
        let data= await dataModel.find();
        res.send(data)
    }
})







module.exports={dataRouter}