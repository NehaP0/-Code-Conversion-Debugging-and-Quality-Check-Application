import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import './App.css'

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');
  const [convertedCode, setConvertedCode] = useState('');
  const [debuggingResult, setDebuggingResult] = useState('');
  const [qualityEvaluation, setQualityEvaluation] = useState('');

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleConversionClick = async () => {
    setConvertedCode('');
    setDebuggingResult('');
    setQualityEvaluation('');

    try {
      const response = await fetch('https://vast-rose-calf-kit.cyclic.app/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();
      setConvertedCode(data.convertedCode);
    } catch (error) {
      console.error('Conversion request failed:', error);
    }
  };

  const handleDebuggingClick = async () => {
    setConvertedCode('');
    setDebuggingResult('');
    setQualityEvaluation('');

    try {
      const response = await fetch('https://vast-rose-calf-kit.cyclic.app/api/debug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setDebuggingResult(data.correctedCode);
    } catch (error) {
      console.error('Debugging request failed:', error);
    }
  };

  const handleQualityCheckClick = async () => {
    setConvertedCode('');
    setDebuggingResult('');
    setQualityEvaluation('');

    try {
      const response = await fetch('https://vast-rose-calf-kit.cyclic.app/api/quality-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setQualityEvaluation(data.evaluation);
    } catch (error) {
      console.error('Quality check request failed:', error);
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-screen">
        <div className="terminal-header">
          <h1>Code Conversion and Evaluation</h1>
          <div className="buttons-container">
            <button onClick={handleConversionClick}>Convert Code</button>
            <button onClick={handleDebuggingClick}>Debug Code</button>
            <button onClick={handleQualityCheckClick}>Check Quality</button>
          </div>
        </div>
        <div className="terminal-body">
          <div className="input-output-container">
            <div className="input-pane">
              <div className="editor-column">
                <label htmlFor="languageSelect">Select Language:</label>
                <select id="languageSelect" value={language} onChange={handleLanguageChange}>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                </select>

                <Editor
                  height="400px"
                  theme="vs-dark"
                  language="javascript"
                  value={code}
                  onChange={handleCodeChange}
                />
              </div>
            </div>

            <div className="output-pane">
              {convertedCode && (
                <div className="output-container">
                  <h2>Converted Code:</h2>
                  <pre className="output-text">{convertedCode}</pre>
                </div>
              )}

              {debuggingResult && (
                <div className="output-container">
                  <h2>Debugging Result:</h2>
                  <pre className="output-text">{debuggingResult}</pre>
                </div>
              )}

              {qualityEvaluation && (
                <div className="output-container">
                  <h2>Quality Evaluation:</h2>
                  <pre className="output-text">{qualityEvaluation}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
