// Imports: Necessary files and hooks for state and side effects.
import "./App.css";
import { useState, useEffect, useCallback } from "react";

// Functional component definition.
function App() {
  // State variables.
  const [principle, setPrinciple] = useState(0);
  const [interest, setInterest] = useState(0);
  const [years, setYears] = useState(0);
  const [emi, setEmi] = useState(0);

  // Handles input changes.
  const handleChange = (e) => {
    const id = e.target.id;
    const value = parseInt(e.target.value);

    // Updates state based on input id.
    if (id === "principle") {
      setPrinciple(value);
    } else if (id === "interest") {
      setInterest(value);
    } else {
      setYears(value);
    }
  };

  // Calculates EMI.
  const calculatorEMI = useCallback(() => {
    let r = interest;
    if (principle && r && years) {
      r = r / 12 / 100; // per month
      const calpow = Math.pow(1 + r, years * 12);
      const amount = (principle * (r * calpow)) / (calpow - 1);
      setEmi(Math.round(amount));
    }
  }, [principle, interest, years]);

  // Runs EMI calculation when dependencies change.
  useEffect(() => {
    calculatorEMI();
  }, [calculatorEMI]);

  // Returns component structure.
  return (
    <div className="emi-calc">
      <h1>Mortgage Calculator</h1>
      <div className="input">
        <p>Principle:</p>
        <input onChange={handleChange} type="number" id="principle" />

        <p>Interest:</p>
        <input onChange={handleChange} type="number" id="interest" />

        <p>Years:</p>
        <input onChange={handleChange} type="number" id="years" />

        <div className="output">Your EMI is {emi}</div>
      </div>
    </div>
  );
}

// Exports App component.
export default App;
