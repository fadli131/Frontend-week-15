import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';

function MainMenu() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3002/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={fetchData} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Fetch Data'}
      </Button>
      {error && <div>Error: {error}</div>}
      {data && (
        <div>
          <h2>Fetched Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default MainMenu;
