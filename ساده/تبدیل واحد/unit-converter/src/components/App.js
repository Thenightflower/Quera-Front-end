import React, { useState } from "react";
import Select from "./Select";
import Input from "./Input";
import { units } from "../units";

function App() {
  const [amount, setAmount] = useState(""); 
  const [fromFactor, setFromFactor] = useState(units[0].factor); 
  const [toFactor, setToFactor] = useState(units[0].factor); 
  const [result, setResult] = useState(0);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromChange = (e) => {
    setFromFactor(parseFloat(e.target.value));
  };

  const handleToChange = (e) => {
    setToFactor(parseFloat(e.target.value));
  };

  const handleConvert = () => {
    const normalized = amount === "" ? 0 : parseFloat(amount.toString().replace(",", "."));
    const numAmount = Number.isNaN(normalized) ? 0 : normalized;

    const converted = (numAmount * fromFactor) / toFactor;
    setResult(converted);
  };

  return (
    <>
      <div className="converter-form">
        {/* Input with label "Amount" here */}
        <Input label="Amount" onChange={handleAmountChange} />

        <div className="row">
          {/* Selects with labels "From" and "To" here */}
          <Select label="From" items={units} onChange={handleFromChange} />
          <Select label="To" items={units} onChange={handleToChange} />

          <button type="button" onClick={handleConvert}>
            Convert
          </button>
        </div>
      </div>

      <div id="result">
        Result is: <span data-testid="result">{result}</span>
      </div>
    </>
  );
}

export default App;
