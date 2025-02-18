import mongoose from "mongoose";
import TaxRecordModal from "../models/taxModel.js";

async function taxCalculation(req, res) {
    let { annualIncome, investments80C = 0, investments80D = 0, hra = 0, lta = 0, otherIncome = 0, salariedOrPensioners = false } = req.body;

    // console.log(annualIncome, investments80C, investments80D, hra, lta, otherIncome, salariedOrPensioners);

    // salaried employees and pensioners are applicable to get the standard deduction
    if (salariedOrPensioners) {
        annualIncome -= 50000;
    }
    if(annualIncome+otherIncome<=700000){
      return  res.status(201).json({success:true,message:"No Income Tax"})
    }

    const totalDeduction = investments80C + investments80D + hra + lta;
    const taxableIncome = (annualIncome + otherIncome) - totalDeduction;

    // tax liability means the amount money that a person/company has to pay as a tax
    const taxliability = calculateTax(taxableIncome);

    // generating suggestions
    const suggestions = getTaxSavingSuggestions({ investments80C, investments80D, hra, lta });

    // creating modal instant/document
    const RecordModal = new TaxRecordModal({
        annualIncome,
        otherIncome,
        deduction: { investments80C, investments80D, hra, lta },
        taxableIncome,
        taxliability
    });
    
    await RecordModal.save();

    // Respond with the calculation results & tax-saving suggestions
    res.status(200).json({
        annualIncome,
        deduction: { investments80C, investments80D, hra, lta },
        taxableIncome,
        taxliability,
        suggestions
    });
}

async function getHistory(req,res){
    try{
        const record=await TaxRecordModal.find().sort({createdAt:-1}).limit(10);
        res.json(record);
    }
    catch(e){
        res.json({success:false,message:"couldn't fetch the tax history"})
    }
    }
    
export { taxCalculation,getHistory };



// ****************_Helper functions_****************

function calculateTax(taxableIncome) {
    const slabs = [
        { limit: 300000, rate: 0 },
        { limit: 700000, rate: 0.05 },
        { limit: 1000000, rate: 0.10 },
        { limit: 1200000, rate: 0.15 },
        { limit: 1500000, rate: 0.20 },
        { limit: Infinity, rate: 0.30 },
    ];

    let tax = 0;
    let previousLimit = 0;

    for (let slab of slabs) {
        if (taxableIncome > previousLimit) {  
            const taxableAmount = Math.min(taxableIncome, slab.limit) - previousLimit;
            tax += taxableAmount * slab.rate;
        } else {
            break;
        }
        previousLimit = slab.limit;
    }

    return tax;
}


function getTaxSavingSuggestions({ investments80C, investments80D, hra, lta }) {
    let suggestions = [];

    //80C limit is Max 150000 
    if (investments80C < 150000) {
        suggestions.push(`You can invest ₹${150000 - investments80C} more in 80C options like PPF, EPF, ELSS, or NSC.`);
    }

    //80D limit (Health Insurance: ₹25,000 for self and for family, ₹50,000 for senior citizens)
    if (investments80D < 25000) {
        suggestions.push(`You can claim an additional ₹${25000 - investments80D} under 80D by purchasing health insurance.`);
    }

    if (hra === 0) {
        suggestions.push(`If you are paying rent, claim HRA benefits to reduce taxable income.`);
    }

    // leave travel allowance
    if (lta === 0) {
        suggestions.push(`Use Leave Travel Allowance (LTA) for tax-free reimbursement of travel expenses.`)
    }

    return suggestions.length > 0 ? suggestions : ["No additional tax-saving options available."];
}


