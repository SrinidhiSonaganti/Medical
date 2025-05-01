import React, { useState } from "react";

const SymptomForm = ({ onResult }) => {
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/symptomCheck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms }),
    });

    const data = await res.json();
    onResult(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Describe your symptoms..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        required
      />
      <button type="submit">Check</button>
    </form>
  );
};

export default SymptomForm;
