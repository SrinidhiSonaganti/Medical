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
  
  // Configure the generative AI
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

      // Configure the model - use gemini-1.5-flash
      const model = genAI.getGenerativeModel({ 
        model: "models/gemini-1.5-flash",
        // Safety settings
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH', 
            threshold: 'BLOCK_NONE'
          }
        ],
        // Generation config
        generationConfig: {
          temperature: 0.3,
          topP: 0.8,
          maxOutputTokens: 1024,
        }
      });

      // Generate content
      const result = await model.generateContent(prompt);
      const geminiResponse = await result.response.text();

      setResponse(geminiResponse);

    } catch (error) {
      console.error('Gemini API Error:', error);

      let errorMessage = 'An unexpected error occurred';

      // Detailed error handling
      if (error.message?.includes('API key not valid')) {
        errorMessage = 'Invalid API Key. Please check your configuration.';
      } else if (error.message?.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.message?.includes('models/gemini-pro is not found')) {
        errorMessage = 'Invalid model. Please use models/gemini-1.5-flash.';
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

  // Styles
  const styles = {
    container: {
      maxWidth: '960px',
      margin: '2rem auto',
      padding: '1.5rem',
      backgroundColor: '#f7fafc'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
      marginBottom: '2rem'
    },
    header: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      color: '#3498db',
      textAlign: 'center',
      marginBottom: '1.5rem',
      borderBottom: '2px solid #e2e8f0',
      paddingBottom: '0.75rem'
    },
    formGroup: {
      marginBottom: '1.25rem'
    },
    label: {
      display: 'block',
      fontWeight: '500',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      color: '#4a5568'
    },
    input: {
      width: '100%',
      padding: '0.625rem',
      border: '1px solid #e2e8f0',
      borderRadius: '4px',
      fontSize: '0.95rem',
      transition: 'border-color 0.2s ease',
      outline: 'none'
    },
    textarea: {
      width: '100%',
      padding: '0.625rem',
      border: '1px solid #e2e8f0',
      borderRadius: '4px',
      minHeight: '150px',
      fontSize: '0.95rem',
      resize: 'vertical',
      transition: 'border-color 0.2s ease',
      outline: 'none'
    },
    inputGridWrapper: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      marginBottom: '1.25rem'
    },
    button: {
      width: '100%',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'block',
      textAlign: 'center'
    },
    buttonDisabled: {
      backgroundColor: '#a0aec0',
      cursor: 'not-allowed'
    },
    tipText: {
      fontSize: '0.8rem',
      color: '#718096',
      marginTop: '0.5rem',
      textAlign: 'right'
    },
    loadingContainer: {
      textAlign: 'center',
      margin: '2rem 0'
    },
    spinner: {
      display: 'inline-block',
      width: '2rem',
      height: '2rem',
      border: '4px solid rgba(0, 0, 0, 0.1)',
      borderLeftColor: '#3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    loadingText: {
      marginTop: '0.75rem',
      fontSize: '0.9rem',
      color: '#4a5568'
    },
    responseContainer: {
      backgroundColor: '#f0f9ff',
      padding: '1.5rem',
      borderRadius: '6px',
      borderLeft: '4px solid #3498db',
      margin: '1.5rem 0'
    },
    responseHeading: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '1rem'
    },
    responseParagraph: {
      marginBottom: '0.75rem',
      lineHeight: '1.6',
      color: '#4a5568'
    },
    disclaimerContainer: {
      backgroundColor: '#fff8e5',
      border: '1px solid #fbd38d',
      borderRadius: '4px',
      padding: '1rem',
      marginTop: '1.5rem'
    },
    disclaimerHeading: {
      fontWeight: '600',
      color: '#c05621',
      marginBottom: '0.5rem'
    },
    disclaimerText: {
      fontSize: '0.85rem',
      color: '#7b341e'
    },
    errorContainer: {
      backgroundColor: '#fff5f5',
      border: '1px solid #fed7d7',
      borderRadius: '4px',
      padding: '1rem',
      marginBottom: '1.5rem',
      color: '#c53030'
    },
    errorTitle: {
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>AI Symptom Analyzer</h2>

        {/* Error Notification */}
        {error && (
          <div style={styles.errorContainer}>
            <p style={styles.errorTitle}>Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Patient Information Section */}
        <div style={styles.inputGridWrapper}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="name">Your Name (Optional)</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={patientData.name}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="age">Your Age (Optional)</label>
            <input
              id="age"
              type="text"
              name="age"
              placeholder="Enter your age"
              value={patientData.age}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
        </div>

        {/* Medical History Input */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="medicalHistory">Previous Medical History (Optional)</label>
          <textarea
            id="medicalHistory"
            name="medicalHistory"
            placeholder="Describe any previous medical conditions, surgeries, or ongoing treatments..."
            value={patientData.medicalHistory}
            onChange={handleInputChange}
            style={{...styles.textarea, minHeight: '100px'}}
          />
        </div>

        {/* Symptoms Description */}
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="symptoms">Describe Your Symptoms</label>
          <textarea
            id="symptoms"
            name="symptoms"
            placeholder="Please describe your symptoms in detail. Include when they started, severity, what makes them better or worse..."
            value={patientData.symptoms}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
            style={styles.textarea}
          />
          <p style={styles.tipText}>Tip: Press Shift+Enter to submit</p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmitSymptoms}
          disabled={loading || !patientData.symptoms.trim()}
          style={{
            ...styles.button,
            ...(loading || !patientData.symptoms.trim() ? styles.buttonDisabled : {}),
            ':hover': {
              backgroundColor: '#2980b9'
            }
          }}
          onMouseOver={(e) => {
            if (!loading && patientData.symptoms.trim()) {
              e.target.style.backgroundColor = '#2980b9';
            }
          }}
          onMouseOut={(e) => {
            if (!loading && patientData.symptoms.trim()) {
              e.target.style.backgroundColor = '#3498db';
            }
          }}
        >
          {loading ? 'Analyzing Symptoms...' : 'Analyze Symptoms'}
        </button>

        {/* Loading Indicator */}
        {loading && (
          <div style={styles.loadingContainer}>
            <div style={{
              ...styles.spinner,
              animation: 'spin 1s linear infinite'
            }}></div>
            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
            <p style={styles.loadingText}>Processing your symptoms...</p>
          </div>
        )}
      </div>

      {/* Response Display */}
      {response && !loading && (
        <div style={styles.card}>
          <h3 style={styles.responseHeading}>Symptom Analysis Results</h3>
          <div>
            {response.split('\n').map((paragraph, index) => (
              <p key={index} style={styles.responseParagraph}>{paragraph}</p>
            ))}
          </div>
          <div style={styles.disclaimerContainer}>
            <strong style={styles.disclaimerHeading}>Medical Disclaimer:</strong>
            <p style={styles.disclaimerText}>
              This analysis is for informational purposes only and does not constitute 
              professional medical advice. Always consult with a qualified healthcare 
              provider for accurate diagnosis and treatment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;