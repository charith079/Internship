import React, { useEffect } from "react";
import Header from "../components/Header";

const ComparisionPage = () => {

  const funds = [
    { name: "Cash in Hand", assets: 30000000.45, liabilities: 15000000.55, income: 14000000.7, expenditure: 35000000.85 },
    { name: "Cash in Bank", assets: 2000.3, liabilities: 1000.4, income: 3000.6, expenditure: 2500.5 },
    { name: "FDRs", assets: 3000.45, liabilities: 1500.55, income: 4000.7, expenditure: 3500.85 },
    { name: "Sy Dr", assets: 4000.95, liabilities: 2000.65, income: 5000.8, expenditure: 4500.9 },
    { name: "Property", assets: 5000.25, liabilities: 2500.15, income: 6000.35, expenditure: 5500.05 },
    { name: "EME Journal", assets: 6000.85, liabilities: 3000.75, income: 7000.95, expenditure: 6500.85 },
  ];

  const handlePrint = () => {
    const printContents = document.getElementById("balanceSheet").innerHTML;
    const originalContents = document.body.innerHTML;
  
    document.body.innerHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            @media print {
              body::before {
                content: "EME Journal";
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-30deg);
                font-size: 80px;
                font-weight: bold;
                color: rgba(0, 0, 0, 0.05);
                z-index: -1;
                pointer-events: none;
                white-space: nowrap;
              }
            }
            table {
              width: 100%;
              border-collapse: collapse;
              border-spacing: 0;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `;
  
    window.print();
    document.body.innerHTML = originalContents; // Restore after printing
    window.location.reload(); // Ensure scripts reattach after print
  };
  
  const currentDate = new Date();
  const currentMonthYear = currentDate.toLocaleString("default", { month: "short", year: "2-digit" });
  const previousMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
  const previousMonthYear = previousMonthDate.toLocaleString("default", { month: "short", year: "2-digit" });

  return (
    <>
      <Header />
      <div className="p-6 min-h-screen bg-gradient-to-r from-teal-100 to-violet-100" style={{ fontFamily: "Times New Roman, serif" }}>
        <div className="mt-8 mb-8 flex justify-center">
          <div className="bg-white shadow-md rounded-lg p-6 w-auto">
            <div id="balanceSheet">
              <h1 className="text-center text-2xl font-bold mb-6">Balance Sheet Comparison</h1>
              <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-700" style={{ tableLayout: "auto" }}>
                  <thead className="bg-violet-400 text-black">
                    <tr>
                      <th className="border border-black max-w-[50px]">S No</th>
                      <th className="border border-black max-w-[150px]">Name of Fund</th>
                      <th className="border border-black p-0.5 w-[250px]">
                        Bal for the Month <br />({previousMonthYear})
                        <div className="grid grid-cols-2 divide-x divide-black mt-1">
                          <span className="text-center">Assets (Rs)</span>
                          <span className="text-center">Liabilities (Rs)</span>
                        </div>
                      </th>
                      <th className="border border-black p-0.5 max-w-[80px]">Income in Present Month (Rs)</th>
                      <th className="border border-black p-0.5 max-w-[80px]">Expdr in Present Month (Rs)</th>
                      <th className="border border-black p-0.5 w-[250px]">
                        Bal for the Month <br />({currentMonthYear})
                        <div className="grid grid-cols-2 divide-x divide-black mt-1">
                          <span className="text-center">Assets (Rs)</span>
                          <span className="text-center">Liabilities (Rs)</span>
                        </div>
                      </th>
                      <th className="border border-black p-0.5 max-w-[100px]">Incr (+)</th>
                      <th className="border border-black p-0.5 max-w-[100px]">Decr (-)</th>
                      <th className="border border-black p-0.5 max-w-[100px]">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {funds.map((fund, index) => (
                      <tr key={index} className="text-center">
                        <td className="border border-black p-0.5">{index + 1}</td>
                        <td className="border border-black p-0.5">{fund.name}</td>
                        <td className="border border-black p-0.5 w-[200px]">
                          <div className="grid grid-cols-2 divide-x divide-black">
                            <span className="text-center">{fund.assets.toFixed(2)}</span>
                            <span className="text-center">{fund.liabilities.toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="border border-black p-0.5 w-[80px]">{fund.income.toFixed(2)}</td>
                        <td className="border border-black p-0.5 w-[80px]">{fund.expenditure.toFixed(2)}</td>
                        <td className="border border-black p-0.5 w-[200px]">
                          <div className="grid grid-cols-2 divide-x divide-black">
                            <span className="text-center">{(fund.assets + fund.income - fund.expenditure).toFixed(2)}</span>
                            <span className="text-center">{fund.liabilities.toFixed(2)}</span>
                          </div>
                        </td>
                        <td className="border border-black p-0.5 w-[120px]">{(fund.income - fund.expenditure).toFixed(2)}</td>
                        <td className="border border-black p-0.5 w-[120px]">{(fund.assets - fund.liabilities).toFixed(2)}</td>
                        <td className="border border-black p-0.5">
                          <input type="text" placeholder="Enter remarks" className="border border-black px-0.5 py-0.5 w-full" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button onClick={handlePrint} className="bg-green-500 border border-black text-black px-4 py-2 rounded hover:bg-green-600 hover:scale-110 transition-transform duration-200">
            Print
          </button>
        </div>
      </div>
    </>
  );
};

export default ComparisionPage;