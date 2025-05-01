import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function PatientDashboard() {
  // State Management
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    medicalHistory: '',
    symptoms: ''
  });
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize Generative AI
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Comprehensive Symptom Analysis Function
  const handleSubmitSymptoms = async () => {
    // Input Validation
    if (!patientData.symptoms.trim()) {
      setError('Please describe your symptoms');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Construct Detailed Prompt
      const prompt = `Comprehensive Medical Symptom Analysis:

Patient Profile:
- Name: ${patientData.name || 'Anonymous'}
- Age: ${patientData.age || 'Not Specified'}
- Medical History: ${patientData.medicalHistory || 'No prior history'}

Reported Symptoms: ${patientData.symptoms}

Provide a detailed analysis:
1. Potential symptom interpretation
2. Possible underlying medical conditions
3. Recommended immediate actions
4. Urgency of medical consultation
5. General health recommendations`;

      // Use Gemini Pro model
      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        // Add safety settings
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH', 
            threshold: 'BLOCK_NONE'
          }
        ]
      });

      // Generate content
      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response.text();

      setResponse(geminiResponse);

    } catch (error) {
      console.error('Gemini API Error:', error);

      let errorMessage = 'An unexpected error occurred';

      // Detailed error handling
      if (error.message.includes('API key not valid')) {
        errorMessage = 'Invalid API Key. Please check your configuration.';
      } else if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        errorMessage = error.message || 'Failed to process symptoms';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Keyboard Event Handler
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      handleSubmitSymptoms();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          AI Symptom Analyzer
        </h2>

        {/* Error Notification */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Patient Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name (Optional)"
            value={patientData.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="age"
            placeholder="Your Age (Optional)"
            value={patientData.age}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Medical History Input */}
        <textarea
          name="medicalHistory"
          placeholder="Previous Medical History (Optional)"
          value={patientData.medicalHistory}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />

        {/* Symptoms Description */}
        <div className="mb-6">
          <textarea
            name="symptoms"
            placeholder="Describe your symptoms in detail..."
            value={patientData.symptoms}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
            className="w-full p-4 border-2 rounded-lg min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mt-2">
            Tip: Press Shift+Enter to submit
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitSymptoms}
          disabled={loading}
          className={`w-full py-3 rounded-lg transition-all duration-300 ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Analyzing Symptoms...' : 'Analyze Symptoms'}
        </button>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center mt-6">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="mt-2 text-gray-600">Processing your symptoms...</p>
          </div>
        )}

        {/* Response Display */}
        {response && !loading && (
          <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-800">
              Symptom Analysis Results
            </h3>
            <div className="prose max-w-none text-gray-700">
              {response.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-3">{paragraph}</p>
              ))}
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
              <strong className="text-yellow-800">Medical Disclaimer:</strong>
              <p className="text-yellow-700 text-sm">
                This analysis is for informational purposes only and does not constitute 
                professional medical advice. Always consult with a qualified healthcare 
                provider for accurate diagnosis and treatment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;