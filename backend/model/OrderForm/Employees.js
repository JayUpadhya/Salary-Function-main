const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');


const EmployeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    dateofjoining: {
        type: String,
        required: true
    },
    // image:{
    //     type: String,
    //     required: true
    // },
    dateofbirth: {
        type: String,
        required: true
    },
    nic:{
        type:String,
        require:true
    },
    age:{
        type:String,
        require:true
    },
    gender:{

        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    confirmPassword:{
        type:String,
        require:true
    }
    
})

module.exports = mongoose.model("Employee", EmployeeSchema);