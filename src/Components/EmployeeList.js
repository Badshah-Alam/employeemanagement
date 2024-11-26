import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeList = ({ employees, setEmployees }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employee List</h2>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/add")}
        >
          Add Employee
        </button>
      </div>
      <ul className="space-y-4">
        {employees.map((emp) => (
          <li
            key={emp.id}
            className="p-4 border border-gray-300 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{emp.name}</p>
              <p className="text-sm text-gray-600">{emp.position}</p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-blue-500 hover:bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => navigate(`/details/${emp.id}`)}
              >
                View
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(emp.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
