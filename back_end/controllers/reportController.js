import Prescription from "../models/Prescription.js";
import Finance from "../models/Financial.js";
import User from "../models/User.js";

export const generateInventoryReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const prescriptions = await Prescription.find(query);
    const medications = prescriptions.reduce((acc, prescription) => {
      prescription.medications.forEach(med => {
        const existing = acc.find(m => m.DrugName === med.DrugName);
        if (existing) {
          existing.count++;
        } else {
          acc.push({ DrugName: med.DrugName, count: 1 });
        }
      });
      return acc;
    }, []);

    return res.status(200).json({
      success: true,
      report: {
        type: 'inventory',
        date: new Date(),
        data: medications,
        totalMedications: medications.length
      }
    });
  } catch (error) {
    console.error("Error generating inventory report:", error);
    return res.status(500).json({ success: false, message: "Error generating inventory report" });
  }
};

export const generateSalesReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const sales = await Finance.find(query).populate('createdBy', 'name role');
    
    // Calculate total sales and group by drug
    const drugSales = sales.reduce((acc, sale) => {
      const existing = acc.find(d => d.DrugName === sale.DrugName);
      if (existing) {
        existing.totalAmount += sale.Birr;
        existing.count++;
      } else {
        acc.push({
          DrugName: sale.DrugName,
          totalAmount: sale.Birr,
          count: 1
        });
      }
      return acc;
    }, []);

    // Group sales by pharmacist
    const pharmacistSales = sales.reduce((acc, sale) => {
      const pharmacistName = sale.createdBy?.name || 'Unknown';
      const existing = acc.find(p => p.name === pharmacistName);
      if (existing) {
        existing.totalAmount += sale.Birr;
        existing.transactions++;
        existing.drugsSold.push({
          DrugName: sale.DrugName,
          amount: sale.Birr
        });
      } else {
        acc.push({
          name: pharmacistName,
          totalAmount: sale.Birr,
          transactions: 1,
          drugsSold: [{
            DrugName: sale.DrugName,
            amount: sale.Birr
          }]
        });
      }
      return acc;
    }, []);

    const totalSales = sales.reduce((sum, sale) => sum + sale.Birr, 0);

    return res.status(200).json({
      success: true,
      report: {
        type: 'sales',
        date: new Date(),
        data: {
          totalSales,
          totalTransactions: sales.length,
          drugSales,
          pharmacistSales
        }
      }
    });
  } catch (error) {
    console.error("Error generating sales report:", error);
    return res.status(500).json({ success: false, message: "Error generating sales report" });
  }
};

export const generatePatientReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const prescriptions = await Prescription.find(query);
    const patientStats = prescriptions.reduce((acc, prescription) => {
      const existing = acc.find(p => p.patientName === prescription.patientName);
      if (existing) {
        existing.prescriptionCount++;
        existing.medicationCount += prescription.medications.length;
      } else {
        acc.push({
          patientName: prescription.patientName,
          prescriptionCount: 1,
          medicationCount: prescription.medications.length
        });
      }
      return acc;
    }, []);

    return res.status(200).json({
      success: true,
      report: {
        type: 'patient',
        date: new Date(),
        data: patientStats,
        totalPatients: patientStats.length,
        totalPrescriptions: prescriptions.length
      }
    });
  } catch (error) {
    console.error("Error generating patient report:", error);
    return res.status(500).json({ success: false, message: "Error generating patient report" });
  }
}; 