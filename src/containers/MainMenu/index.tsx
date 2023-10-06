import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';

function MainMenu() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);

    fetch('https://ill-tan-elk-vest.cyclic.app')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
