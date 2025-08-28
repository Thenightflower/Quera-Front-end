import React, { useState } from "react";

import './assets/style.css';

import Input from "./components/common/input";
import useInput from "./customHooks/useInput";

function App() {
  const email = useInput("");
  const password = useInput("")

  const [errors, setErrors] = useState({ email: false, password: false });

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailValid = /\S+@\S+\.\S+/.test(email.value);
    let passwordValid = password.value.length >= 8;

    setErrors({
      email: !emailValid,
      password: !passwordValid,
    });
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 min-h-screen">
      <div className="bg-white shadow-md p-8 rounded w-96">
        <h2 className="mb-4 font-bold text-2xl">Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Email" type="text" {...email}
            className="mb-4 p-2 border border-gray-300 focus:border-blue-500 rounded focus:outline-none w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Please enter a valid email address.</p>
          )}
          <Input
            placeholder="Password" type="password" {...password}
            className="mb-4 p-2 border border-gray-300 focus:border-blue-500 rounded focus:outline-none w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">Password must be at least 8 characters long.</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
