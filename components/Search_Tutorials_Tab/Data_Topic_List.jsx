import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get('https://se346-skillexchangebe.onrender.com/api/v1/topic/pagination?page=1&limit=6')
        .then(result => {
          if (Object.keys(result.data).length === 0) {
            throw new Error('Result is empty');
          } else {
            setData(result.data);
          }
        })
        .catch(error => {
          console.error('Error: ', error);
          alert('An error occurred. Please try again later.');
        });
    };

    fetchData();
  }, []);

  return data;
}

export default Data;