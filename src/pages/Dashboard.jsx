import React, { useState } from "react";
import SymptomForm from "../components/SymptomForm";

const Dashboard = () => {
  const [result, setResult] = useState(null);

  return (
    <div>
      <h2>Symptom Checker</h2>
      <SymptomForm onResult={setResult} />
      {result && (
        <div className="result">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
