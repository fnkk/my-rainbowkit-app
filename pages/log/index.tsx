import { useEffect, useState } from 'react';
import axios from 'axios';

const Logs = () => {
  const [logs, setLogs] = useState<{ page: string; timestamp: string }[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/api/log');
        setLogs(response.data);
      } catch (error) {
        console.error('Failed to fetch logs', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h1>Page View Logs</h1>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            {log.timestamp}: {log.page}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;