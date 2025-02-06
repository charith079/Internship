import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {AppContext}  from '../AppContext/ContextProvider';
import UnitForm from '../components/UnitsForm';

const UnitsPage = () => {
  const { units, setUnits } = useContext(AppContext);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/units');
        setUnits(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching units:', error.message || error);
      }
    };
    fetchUnits();
  }, [setUnits]);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const filteredUnits = Array.isArray(units)
    ? units.filter((unit) =>
        unit.nameOfUnit && unit.nameOfUnit.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Units Page</h1>
      <UnitForm/>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="p-2 border rounded w-2/3"
          placeholder="Search by Unit Name"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Display filtered units */}
      <div className="mt-8">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border-b">S.No</th>
              <th className="px-4 py-2 border-b">Ledger Pg No</th>
              <th className="px-4 py-2 border-b">Name of Unit</th>
              <th className="px-4 py-2 border-b">Amount</th>
              <th className="px-4 py-2 border-b">Comd</th>
            </tr>
          </thead>
          <tbody>
            {filteredUnits.map((unit, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{unit.ledgerPageNumber}</td>
                <td className="px-4 py-2 border-b">{unit.nameOfUnit}</td>
                <td className="px-4 py-2 border-b">{unit.amount}</td>
                <td className="px-4 py-2 border-b">{unit.command}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnitsPage;
