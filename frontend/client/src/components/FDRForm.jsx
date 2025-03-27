import React,{useState} from "react";
import AddFDR from "./AddFDR";
import UpdateFDR from "./UpdateFDR";
import DeleteFDR from "./DeleteFDR";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

function FDRForm() {
  const [newFdr, setNewFdr] = useState({
    fdrNo: "",
    dateOfDeposit: "",
    amount: "",
    maturityValue: "",
    maturityDate: "",
    duration: "",
    intRate: "",
    interestAmount: "",
    bank: "",
    remarks: "",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFdr({
      ...newFdr,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!newFdr.fdrNo) {
      setError("FDR Number is required");
      return false;
    }
    if (!newFdr.dateOfDeposit) {
      setError("Date of Deposit is required");
      return false;
    }
    if (!newFdr.amount) {
      setError("Amount is required");
      return false;
    }
    setError(null);
    return true;
  };

  const handleRequestUpdate = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;

      const approvalRequest = {
        requestFrom: username,
        requestOn: 'FDR',
        requestType: 'update',
        details: newFdr,
        status: 'pending'
      };

      const response = await axios.post('http://localhost:5000/api/approvals', approvalRequest);
      
      if (response.status === 201) {
        alert('Update request sent for approval');
        setNewFdr({
          fdrNo: "",
          dateOfDeposit: "",
          amount: "",
          maturityValue: "",
          maturityDate: "",
          duration: "",
          intRate: "",
          interestAmount: "",
          bank: "",
          remarks: "",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'Error sending update request');
    }
  };

  const handleRequestDelete = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const decodedToken = jwtDecode(token);
      const username = decodedToken.username;

      const approvalRequest = {
        requestFrom: username,
        requestOn: 'FDR',
        requestType: 'delete',
        details: newFdr,
        status: 'pending'
      };

      const response = await axios.post('http://localhost:5000/api/approvals', approvalRequest);
      
      if (response.status === 201) {
        alert('Delete request sent for approval');
        setNewFdr({
          fdrNo: "",
          dateOfDeposit: "",
          amount: "",
          maturityValue: "",
          maturityDate: "",
          duration: "",
          intRate: "",
          interestAmount: "",
          bank: "",
          remarks: "",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'Error sending delete request');
    }
  };

  return (
    <>
      <h2 className="mt-3 text-2xl font-serif text-black mb-4">Manage FDR</h2>
      <form className="space-y-4">
        {[
          { label: "FDR No", name: "fdrNo", type: "text" },
          { label: "Date of Deposit", name: "dateOfDeposit", type: "date" },
          { label: "Amount", name: "amount", type: "number" },
          { label: "Maturity Value", name: "maturityValue", type: "number" },
          { label: "Maturity Date", name: "maturityDate", type: "date" },
          { label: "Duration", name: "duration", type: "text" },
          { label: "Int Rate %", name: "intRate", type: "number" },
          { label: "Interest Amount", name: "interestAmount", type: "number" },
          { label: "Bank", name: "bank", type: "text" },
          { label: "Remarks", name: "remarks", type: "text" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 font-medium mb-1">
              {field.label}:
            </label>
            <input
              type={field.type}
              name={field.name}
              value={newFdr[field.name]}
              onChange={handleInputChange}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        ))}

        <div className="flex space-x-4">
          <AddFDR newFdr={newFdr}/>
          <UpdateFDR newFdr={newFdr}/>
          <DeleteFDR newFdr={newFdr}/>
          <button
            onClick={handleRequestUpdate}
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Request Update
          </button>
          <button
            onClick={handleRequestDelete}
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Request Delete
          </button>
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}
      </form>
    </>
  );
}

export default FDRForm;
