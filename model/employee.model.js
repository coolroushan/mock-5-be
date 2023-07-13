const mongoose=require('mongoose')

const employeeSchema=mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    departemnet: String,
    salary: Number,
    userID: String
    
},{
    versionKey:false
})

const EmployeeModel=mongoose.model("employee", employeeSchema)

module.exports={
    EmployeeModel
}