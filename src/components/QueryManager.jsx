import React, { useState } from 'react';
import { executeQuery } from '../api/Qrymng'; // Adjust the import path as needed

function QueryExecutor() {
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResults, setQueryResults] = useState([]);
  const [queryError, setQueryError] = useState('');

  const handleQueryChange = (event) => {
    setSqlQuery(event.target.value);
  };

  const handleExecute = async () => {
    console.log('handleExecute function called!'); // <--- ADD THIS LINE
    setQueryError('');
    setQueryResults([]);
  
    try {
      const payload = { query: sqlQuery };
      console.log('Sending payload:', payload);
      const response = await executeQuery(payload);
      setQueryResults(response.data.results);
    } catch (error) {
      console.error('Error executing query:', error);
      setQueryError(error.response?.data?.error || 'Failed to execute query.');
      setQueryResults([]);
    }
  };
  return (
    <div>
      <h2>Execute SQL Query</h2>
      <textarea
        rows="5"
        cols="50"
        value={sqlQuery}
        onChange={handleQueryChange}
        placeholder="Enter your SQL query (e.g., SELECT * FROM Employee)"
      />
      <button onClick={handleExecute}>Execute</button>

      {queryError && <p style={{ color: 'red' }}>Error: {queryError}</p>}

      {queryResults && queryResults.length > 0 && (
        <div>
          <h3>Query Results:</h3>
          <table>
            <thead>
              {Object.keys(queryResults[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </thead>
            <tbody>
              {queryResults.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {queryResults && queryResults.length === 0 && !queryError && <p>No results to display.</p>}
    </div>
  );
}

export default QueryExecutor;