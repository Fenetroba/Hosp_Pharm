import express from "express";
import Finance from "../models/Financial.js";


export const CreateRelatedFinance=async(req,res)=>{
     const {DrugName,Birr}=req.body;
     const createdBy=req.user.userIds

   try {
     if(!DrugName || !Birr){
          return res.status(400).json({success:false, message:"the All Filds are Required"})
     }
     const NewFinance=new Finance({DrugName,Birr,createdBy});
     await NewFinance.save();
     return res.status(201).json({success:true, message:"Its recorded"})

   } catch (error) {
     console.log("the error created in Finance",error)
     return res.status(500).json({success:false, message:"the error created in Finance"})
     
   }

}

export const getDailyFinance = async (req, res) => {
  const { date } = req.params;
  const userId = req.user.userIds;

  try {
    // Get start and end of the day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    // Get all transactions for the day
    const transactions = await Finance.find({
      createdBy: userId,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).sort({ date: 1 });

    // Calculate statistics
    const stats = {
      totalSales: transactions.reduce((sum, t) => sum + t.Birr, 0),
      totalTransactions: transactions.length,
      drugsSold: transactions.length,
      profit: transactions.reduce((sum, t) => sum + t.Birr, 0) // You might want to adjust this based on your profit calculation
    };

    return res.status(200).json({
      success: true,
      stats,
      transactions
    });
  } catch (error) {
    console.log("Error fetching daily finance:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Error fetching daily finance data" 
    });
  }
};