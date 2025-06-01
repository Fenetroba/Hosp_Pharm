import Prescription from "../models/Prescription.js";

 export const  CreatePrescription =async(req,res)=>{
 const {patientName,address,age,sex,date ,patientNo,medications,notes,doctorName}=req.body;
 const createdBy=req.user.userIds

 try {
     if(!patientName || !address || !age || !sex || !date || !doctorName || !patientNo){
        console.log("fall")
          return res.status(400).json({succse:false,message:"the all field are required "})
     }
     const newPrescription = new Prescription({
          patientName,
          address,
          age,
          sex,
          date,
          doctorName,
          notes,
          patientNo,
          createdBy,
          medications
      });
      
      
      // Save the prescription to the database
      await newPrescription.save();
      return res.status(201).json({ success: true, message: "Prescription created successfully.", prescription: newPrescription });
 } catch (error) {
     console.error(error); // Log the error for debugging
     return res.status(500).json({ success: false, message: "An error occurred while creating the prescription." });
     
 }

}
export const GetAllPrescriptions = async (req, res) => {
     try {
         // Fetch all prescriptions from the database
         const prescriptions = await Prescription.find();
 
         // Check if there are no prescriptions
         if (prescriptions.length === 0) {
             return res.status(404).json({ success: false, message: "No prescriptions found." });
         }
 
         return res.status(200).json({ success: true, prescriptions });
 
     } catch (error) {
         console.error(error); // Log the error for debugging
         return res.status(500).json({ success: false, message: "An error occurred while retrieving prescriptions." });
     }
 };
 export const fetch_byPatient_name = async (req, res) => {
   try {
     const { patientName } = req.params; // Get the name from the route parameters

     if (!patientName) {
       return res.status(400).json({ message: "Patient name is required" });
     }

     const prescriptions = await Prescription.find({ patientName: new RegExp(patientName, 'i') });

     if (prescriptions.length === 0) {
       return res.status(404).json({ message: "No prescriptions found" });
     }

     res.status(200).json(prescriptions);
   } catch (error) {
     console.error("Error fetching prescriptions:", error);
     res.status(500).json({ message: "Server error" });
   }
};
export const UpdatePrescription = async(req,res)=>{
         const {id}=req.params;
         const {status}=req.body;
         try {
            const prescription = await Prescription.findByIdAndUpdate(
               id,
               { status },
               { runValidators: false, new: true }
            );
            if(!prescription){
               return res.status(404).json({success:false,message:"prescription not found"});
            }
            return res.status(200).json({success:true,message:"prescription updated successfully",prescription});
         } catch (error) {
            console.error(error);
            return res.status(500).json({success:false,message:"internal server error"});
         }
}
export const DeletePrescription = async(req,res)=>{
      const {id}=req.params;
      try {
         const prescription = await Prescription.findByIdAndDelete(id);
         if(!prescription){
            return res.status(404).json({success:false,message:"prescription not found"});
         }
         return res.status(200).json({success:true,message:"prescription deleted successfully"});
      } catch (error) {
         console.error(error);
         return res.status(500).json({success:false,message:"internal server error"});
      }

}
// export const fetch_byPatient_name=async(req,res)=>{

// }
