import React, { useState } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import SignIn from "./Components/SignIn";
import EmployeeForm from "./Components/EmployeerFrom";
import EmployeeList from "./Components/EmployeeList";
import EmployeeDetails from "./Components/EmployeeDetails";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("auth")
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [employees, setEmployees] = useState([]);

  const handleSignIn = (username) => {
    localStorage.setItem("auth", "true");
    localStorage.setItem("username", username);
    setIsAuthenticated(true);
    setUsername(username);
  };

  const handleSignOut = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? (
        <Navigate to="/employees" />
      ) : (
        <SignIn onSignIn={handleSignIn} />
      ),
    },
    {
      path: "/employees",
      element: isAuthenticated ? (
        <EmployeeList employees={employees} setEmployees={setEmployees} />
      ) : (
        <Navigate to="/" />
      ),
    },
    {
      path: "/add",
      element: isAuthenticated ? (
        <EmployeeForm setEmployees={setEmployees} />
      ) : (
        <Navigate to="/" />
      ),
    },
    {
      path: "/details/:id",
      element: isAuthenticated ? (
        <EmployeeDetails employees={employees} />
      ) : (
        <Navigate to="/" />
      ),
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-blue-600 p-4 text-white">
        <h1 className=" text-xl font-bold">Employee Management </h1>
        <h1 className="text-xl font-bold">
          Welcome {username || "to Employee Management"}
        </h1>
        {isAuthenticated && (
          <button
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )}
      </div>
      <div className="container mx-auto p-6">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
