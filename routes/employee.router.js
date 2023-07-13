const express=require('express')
const { auth } = require('../middleware/auth.middleware')
const { EmployeeModel } = require('../model/employee.model')


const employeeRouter=express.Router()

employeeRouter.use(auth)

employeeRouter.post("/add",async(req,res)=>{
    try {
        const employee=new EmployeeModel(req.body)
        await employee.save()
        res.status(200).json({msg:"Employee has been added", employee: req.body})
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

employeeRouter.get("/",async(req,res)=>{
try {
    const employee = await EmployeeModel.find()
    res.status(200).json({employee})
    
} catch (error) {
    res.status(400).json({error:error.message})
}
})

employeeRouter.patch("/edit/:employeeID",async(req,res)=>{
    const {employeeID}=req.params
    const userDocID=req.body.userID
    try {
        const employee=await EmployeeModel.findOne({_id:employeeID})
        const userEmployeeID=employee.userID
        if(userDocID===userEmployeeID){
            await EmployeeModel.findByIdAndUpdate({_id:employeeID},req.body)
            res.status(200).json({msg: "employee has been updated"})
        }else{
            res.status(200).json({msg: "Not Authorized"})
        }
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

employeeRouter.delete("/delete/:employeeID",async(req,res)=>{
    const {employeeID}=req.params
    const userDocID=req.body.userID
    try {
        const employee=await EmployeeModel.findOne({_id:employeeID})
        const userEmployeeID=employee.userID
        if(userDocID===userEmployeeID){
            await EmployeeModel.findByIdAndDelete({_id:employeeID},req.body)
            res.status(200).json({msg: "employee has been Delete"})
        }else{
            res.status(200).json({msg: "Not Authorized"})
        }
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

employeeRouter.get("/page/:pagenum", async(req,res)=>{
    const Page_Size=5
    const {pagenum}=req.params
    try {
        const employee=await EmployeeModel.find({}).skip((pagenum-1)*Page_Size).limit(Page_Size)
        res.status(200).json({employee})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})



module.exports={
    employeeRouter
}