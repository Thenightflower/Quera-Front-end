import React, { useState } from "react";
import Input from "./Input";
import allCities from "./cities.json";

function App() {
  const [hint, setHint] = useState("");

  function handleChange(e) {
    const value = e.target.value;

    if (value === "") {
      setHint("");
      return;
    }

    const foundCity = allCities.find((city) => city.startsWith(value));

    if (foundCity) {
      setHint(foundCity);
    } else {
      setHint("");
    }
  }

  return <Input handleChange={handleChange} hint={hint} />;
}

export default App;
