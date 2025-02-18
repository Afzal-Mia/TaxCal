import mongoose from "mongoose";

//creating schema to save the taxCalculations
const taxRecordSchema=new mongoose.Schema({
    annualIncome:{type:Number,required:true},
    otherIncome:Number,
    deductions:{
        investments80C:Number,
        investments80D:Number,
        hra:Number,
        lta:Number
    },
    taxableIncome:Number,
    taxliability:Number,
    createdAt:{type:Date,default:Date.now}
})
const TaxRecordModal=mongoose.model("TaxRecordModal",taxRecordSchema);

export default TaxRecordModal;
